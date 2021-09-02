<template>
  <div id="xc-show">
    <h2 v-if="isEpisodeSelected">{{ episodeSelected.nom }}</h2>
    <h2 v-else>Selecciona una temporada i un episodi</h2>
    <div class="home">
      <VideoPlayer
        :episodeSelected="episodeSelected"
        :key="episodeSelected.id"
        id="xc-video"
      />
      <div id="seasons-episodes">
        <Seasons @onSeasonSelected="onSeasonSelected" />
        <EpisodesList
          :seasonId="selectedSeasonId"
          :key="selectedSeasonId"
          @onEpisodeSelected="onEpisodeSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VideoPlayer from "@/components/VideoPlayer.vue";
import Seasons from "@/components/Seasons.vue";
import EpisodesList from "@/components/EpisodesList.vue";

export default {
  name: "Show",
  components: {
    VideoPlayer,
    Seasons,
    EpisodesList,
  },
  data() {
    return {
      selectedSeasonId: 3,
      episodeSelected: { id: -1 },
      isEpisodeSelected: false,
    };
  },
  methods: {
    onSeasonSelected(season) {
      console.log("HOME Selected season " + season.nom);
      this.selectedSeasonId = season.id;
    },

    onEpisodeSelected(episode) {
      console.log("HOME Selected episode " + episode.nom);
      this.episodeSelected = episode;
      this.isEpisodeSelected = true;
    },
  },
};
</script>


<style scoped lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  #xc-video {
      width: 1280px;
      height: 720px;
    }
}

#xc-show {
  margin-bottom: 20px;
}

#seasons-episodes {
  display: flex;
}
</style>