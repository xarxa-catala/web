<template>
  <div>
    <video controls id="video-player">
      <source
        :src=episodeSelected.url
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";

export default {
  name: "VideoPlayer",
  props: {
    episodeSelected: {url: "https://multimedia.xarxacatala.cat/one-piece/saga-1/op_cat-001.mp4"}
  },
  mount() {
    console.log("Episode URL is " + this.episodeSelected.url)
  },
};
</script>

<style lang="scss" scoped>
  #video-player {
    background-color: black;
    width: 1280px;
    height: 720px;
  }
</style>