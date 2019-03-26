<template>
<div class="container">
  <div class="item-list" v-for="photo in photos">
    <ItemListElement :isLogin="isLogin"
                     :id="photo.id"
                     :title="photo.title"
                     :description="photo.description"
                     :url="'http://35.201.135.120/photo_album'+photo.file_location.url" />
  </div>
</div>
</template>

<script>
import ItemListElement from "@/components/ItemListElement"
import axios from "axios";

export default {
  data() {
    return {
      isLogin: false,
      photos: []
    };
  },
  components: {
    ItemListElement: ItemListElement
  },
  methods: {
    handleAuthState(payload) {
      let action = payload.action;
      if (action === "login") {
        this.isLogin = true;
      } else if (action === "logout") {
        this. isLogin = false;
      }
    }
  },
  created() {
    this.$bus.$on("auth-state", this.handleAuthState);

    let sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
    if (sessionData) {
      this.handleAuthState({ action: "login" });
    } else {
      this.handleAuthState({ action: "logout" });
    }

    // photos api
    let url = "http://35.201.135.120/photo_album/api/v1/photos";
    let that = this;
    axios
      .get(url, {})
      .then(function(res) {
        that.photos = res.data.data;
      })
      .catch(function(err) {
        console.error(err.response.data);
      });
  },
  beforeDestroy() {
    this.$bus.$off("auth-state", this.handleAuthState);
  }
}
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
}
.item-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin-bottom: 60px;
}
@media (max-width: 993px) {
  .photo-container-wrapper {
    width: 33.333%;
  }
}
@media (max-width: 769px) {
  .photo-container-wrapper {
    width: 50%;
  }
}
@media (max-width: 577px) {
  .photo-container-wrapper {
    width: 100%;
  }
}
</style>