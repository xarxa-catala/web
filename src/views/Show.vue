<template>
  <div id="xc-show">
    <h2 v-if="episodeSelected !== undefined">{{ episodeSelected.nom }}</h2>
    <h2 v-else>Selecciona una temporada i un episodi</h2>
    <div class="home">
      <div id="xc-video-container">
        <img id="xc-video-placeholder" v-if="episodeSelected === undefined" src="../assets/player_placeholder.jpg" />
        <VideoPlayer :episodeSelected="episodeSelected" :key="episodeSelected.id" id="xc-video"
          v-if="episodeSelected !== undefined" />
      </div>
      <div id="seasons-episodes">
        <Seasons @onSeasonSelected="onSeasonSelected" />
        <EpisodesList :seasonId="selectedSeasonId" :key="selectedSeasonId" @onEpisodeSelected="onEpisodeSelected" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ is an alias to /src
import { ref, computed } from "vue";
import { Episode } from "../models/Episode";
import { Season } from "../models/Season";
import EpisodesList from "../components/EpisodesList.vue";
import Seasons from "../components/Seasons.vue";
import VideoPlayer from "../components/VideoPlayer.vue";

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
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  #xc-video-container {
    width: 1280px;
    height: 720px;

    #xc-video-placeholder,
    #xc-video {
      width: 100%;
      height: 100%;
    }

    #xc-video-placeholder {
      object-fit: cover;
    }
  }
}

#xc-show {
  margin-bottom: 20px;
}

#seasons-episodes {
  display: flex;
}
</style>