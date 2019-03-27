<template>
<div class="edit">
  <div class="photo-container">
    <ImgDisplay :url="'http://35.201.135.120/photo_album/'+photo.file_location.url" v-if="photo.file_location" />
  </div>
  <div class="main-container">
    <PhotoForm :title="photo.title"
               :description="photo.description"
               v-if="photo.title"
               @photo-form-submit="patchUpdate" />
  </div>
</div>
</template>

<script>
import ImgDisplay from "@/components/ImgDisplay";
import PhotoForm from "@/components/PhotoForm";
import axios from "axios";

export default {
  components: {
    ImgDisplay: ImgDisplay,
    PhotoForm: PhotoForm
  },
  data() {
    return {
      photo: {}
    };
  },
  created() {
    let that = this;
    let id = this.$route.params.id;
    let url = "http://35.201.135.120/photo_album/api/v1/photos/" + id;
    let token = JSON.parse(localStorage.getItem("photo-album-user")).authToken;
    let params = { auth_token: token };

    axios
      .get(url, {params})
      .then(function(res) {
        that.photo = res.data;
      })
      .catch(function(err) {
        console.error(err.response.data);
      });
  },
  methods: {
    patchUpdate(payload) {
      let that = this;
      let id = this.$route.params.id;
      let url = "http://35.201.135.120/photo_album/api/v1/photos/" + id;
      let token = JSON.parse(localStorage.getItem("photo-album-user")).authToken;

      let params = new FormData();
      params.append("auth_token", token);
      params.append("title", payload.title);
      params.append("date", payload.date);
      params.append("description", payload.description);
      params.append("file_location", payload.file_location);

      axios
        .patch(url, params, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(res) {
          that.$router.push("/photos/" + res.data.result.id);
        })
        .catch(function(err) {
          console.error(err.response.data);
        })
    }
  }
}
</script>

<style scoped>
.edit {
  display: flex;
  justify-content: center;
}
.photo-container {
  padding-top: 100px;
  margin-right: 50px;
}
.main-container {
  padding-top: 100px;
}
</style>