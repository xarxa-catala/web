<template>
  <div>
    <!-- <VideoJsPlayer id="main-video-player" :options="videoOptions" /> -->
    <video id="main-video-player" controls autoplay>
        <source class="video-js" :src="videoOptions.src" :type="videoOptions.type" />
        Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Episode } from "../models/Episode";
import { VideoOptions } from "../models/VideoOptions";

const props = defineProps<{ episodeSelected: Episode }>()

const videoOptions =  ref<VideoOptions>({
  src: props.episodeSelected.url,
  type: "video/mp4",
});
</script>

<style lang="scss" scoped>
#main-video-player {
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>