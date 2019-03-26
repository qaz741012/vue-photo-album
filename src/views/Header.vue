<template>
<div class="header">
  <h1 @click="handleTitleClick">{{title}}</h1>
  <p class="new-photo-btn btn" @click="handleNewPhotoClick">New Photo</p>
  <div class="user-unlogin-container" v-if="!isLogin">
    <p class="signup-btn btn" @click="handleSignup">Sign up</p>
    <p class="login-btn btn" @click="handleLogin">Login</p>
  </div>
  <div class="user-login-container" v-else>
    <p class="user-email">{{userEmail}}</p>
    <p class="login-btn btn" @click="handleLogout">Log out</p>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Photo Album",
      isLogin: false,
      userEmail: "example@gmail.com"
    };
  },
  methods: {
    handleTitleClick() {
      this.$router.push("/");
    },
    handleNewPhotoClick() {
      this.$router.push("/photos/new");
    },
    handleSignup() {
      this.$router.push("/signup");
    },
    handleLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      console.log("logout");
      let sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
      if (sessionData == null) { return; }

      let token = sessionData.authToken;
      let url = "http://35.201.135.120/photo_album/api/v1/logout";
      // access logout api
      axios
        .post(url, { auth_token: token })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.error(err.response.data.errors);
        });

      // emit auth-state event to $bus
      this.$bus.$emit("auth-state", { action: "logout" });

      // clean up local storage
      localStorage.removeItem("photo-album-user");

      //redirect to index
      this.$router.push("/");
    },
    handleAuthState(payload) {
      let action = payload.action;
      if (action === "login") {
        this.isLogin = true;
        this.userEmail = JSON.parse(localStorage.getItem("photo-album-user")).email;
      } else if (action === "logout") {
        this.isLogin = false;
        this.userEmail = "";
      }
    }
  },
  created() {
    let that = this;
    // subscribe auth-state event from bus
    // 按下登入後，元件建立前會監聽事件，並決定是否顯示登入狀態(一次性)
    this.$bus.$on("auth-state", this.handleAuthState);

    //check auth state from local storage
    // 重新整理後，已經沒有auth-state的監聽事件進來，只能依靠localstorage來判斷
    // 目前是否為登入狀態(永久性)
    let sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
    if (sessionData) {
      this.handleAuthState({ action: "login" });
    } else {
      this.handleAuthState({ action: "logout" });
    }
  },
  beforeDestroy() {
    this.$bus.$off("auth-state", this.handleAuthState);
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  width: 100%;
  background-color: #e7e7e7;
  border-bottom: 2px solid #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header h1 {
  font-size: 26px;
  padding-left: 25px;
  margin: 0;
  color: #404040;
}
.header h1:hover {
  cursor: pointer;
  color: #000;
}
.user-email {
  font-size: 18px;
  margin-right: 30px;
}
.new-photo-btn {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
  margin-left: 30px;
  margin-right: auto;
}
.user-unlogin-container {
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.user-login-container p {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
}
.user-login-container {
  height: 100%;
  width: auto;
  margin-right: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.user-unlogin-container p {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
}
.btn:hover {
  cursor: pointer;
  color: #000;
}
@media (max-width: 772px) {
  .header h1 {
    display: none;
  }
}
</style>