<template>
<div class="show">
  <div class="photo-container">
    <ImgDisplay :url="url" v-if="url!=='' && url !== null" />
  </div>
  <div class="main-container">
    <h3 class="main-title">{{title}}</h3>
    <p class="main-date">{{date}}</p>
    <p class="main-description">{{description}}</p>
  </div>
</div>
</template>

<script>
import ImgDisplay from "@/components/ImgDisplay";
import axios from "axios";

export default {
  data() {
    return {
      title: "title",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, cupiditate.",
      url: "",
      date: "2019-01-01"
    };
  },
  components: {
    ImgDisplay: ImgDisplay
  },
  created() {
    let that = this;
    let id = this.$route.params.id;
    console.log(id);
    let url = "http://35.201.135.120/photo_album/api/v1/photos/" + id;
    let sessionData = JSON.parse(localStorage.getItem("photo-album-user"));
    let params;

    if (sessionData) {
      params = { auth_token: sessionData.authToken };
    }

    // axios.get的第二個參數不是data而是request config
    axios
      .get(url, {params})
      .then(function(res) {
        that.title = res.data.title;
        that.description = res.data.description;
        that.date = res.data.date;
        that.url = "http://35.201.135.120/photo_album" + res.data.file_location.url;
      })
      .catch(function(err) {
        console.error(err.response.data);
        that.$router.push("/login");
      });
  }
}
</script>

<style scoped>
.show {
  display: flex;
  justify-content: center;
  align-items: center;
}
.photo-container {
  padding-top: 100px;
  padding-right: 50px;
}
.main-container {
  width: 500px;
  padding-top: 100px;
  margin-bottom: auto;
}
.main-title {
  font-size: 43px;
  margin-top: 0;
  margin-bottom: 0;
}
.main-date {
  font-size: 24px;
}
.main-description {
  font-size: 20px;
}
</style>