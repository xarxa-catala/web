<template>
  <div id="xc-show">
    <img id="down" src="../assets/op_cat_down.jpg" />
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import { ref, computed } from "vue";
import { Episode } from "../models/Episode";
import { Season } from "../models/Season";

const selectedSeasonId = ref(3)
const episodeSelected = ref<Episode>()


function onSeasonSelected(season: Season) {
  selectedSeasonId.value = season.id;
}

function onEpisodeSelected(episode: Episode) {
  console.log("Episode selected")
  episodeSelected.value = episode;
}
</script>


<style scoped lang="scss">
#down {
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin-bottom: 40px;
}
</style>