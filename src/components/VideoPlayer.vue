<template>
  <div>
    <video-js-player id="main-video-player" :options="videoOptions" />
  </div>
</template>

<script>
import VideoJsPlayer from "@/components/VideoJsPlayer.vue";

export default {
  name: "VideoExample",
  components: {
    VideoJsPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: this.episodeSelected.url,
            type: "video/mp4",
          },
        ],
      },
    };
  },
  props: {
    episodeSelected: {url: "https://multimedia.xarxacatala.cat/one-piece/saga-1/op_cat-001.mp4"}
  },
  mount() {
    console.log("Episode URL is " + this.episodeSelected.url)
  },
};
</script>

<style lang="scss" scoped>
#main-video-player {
  background-color: black;
  width: 1280px;
  height: 720px;
}
</style>