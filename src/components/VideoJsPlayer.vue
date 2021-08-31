<template>
        <video ref="videoPlayer" class="video-js vjs-theme-city"></video>
</template>

<script>
import "video.js/dist/video-js.css";
import '@videojs/themes/dist/city/index.css';

import videojs from 'video.js';

export default {
    name: "VideoJsPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>