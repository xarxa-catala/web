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
    episodeSelected: {url: ""}
  },
  mount() {
    console.log("Episode URL is " + this.episodeSelected.url)
  },
};
</script>

<style lang="scss" scoped>
#main-video-player {
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>