<template>
  <video v-if="episodeSelected.url.length > 0" controls autoplay>
    <source :src="episodeSelected.url" />
  </video>
</template>

<script>
export default {
  name: "VideoExample",
  props: {
    episodeSelected: { url: "" },
  },
};
</script>

<style lang="scss" scoped>
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
