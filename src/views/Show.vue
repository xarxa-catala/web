<template>
  <div id="video" class="row m-0 bg-black">
    <div class="col p-0">
      <div class="video-container">
        <div class="video-wrapper">
          <VideoPlayer
            :episodeSelected="episodeSelected"
            :key="episodeSelected.id"
            v-if="isEpisodeSelected"
          />
        </div>
      </div>
    </div>
  </div>
  <div style="background-color: #333; color: white">
    <div class="container pt-3">
      <div class="row">
        <div class="col-12">
          <h5 class="mb-4">{{ getTitle() }}</h5>
        </div>
        <div class="col-12" v-if="!isSeasonSelectedMovie">
          <EpisodesList
            :season="selectedSeason"
            :key="selectedSeason.id"
            @onEpisodeSelected="onEpisodeSelected"
          />
        </div>
        <hr v-if="!isSeasonSelectedMovie" class="mt-4 mb-3" />
        <hr v-if="isSeasonSelectedMovie" class="mb-3" />
        <div class="col-12">
          <Seasons :seasons="seasons" @onSeasonSelected="onSeasonSelected" />
        </div>
        <hr class="mt-4 mb-3" />
        <div class="col-12">
          <h3 class="mb-4">Pel·licules</h3>
        </div>
        <div class="col-12">
          <Seasons :seasons="movies" :areMovies="true" @onSeasonSelected="onSeasonSelected" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      seasons: [],
      movies: [],
      selectedSeason: { id: 3, nom: "001 - Arc de Romance Dawn" },
      episodeSelected: { id: -1 },
      isEpisodeSelected: false,
      isSeasonSelectedMovie: false
    };
  },
  mounted() {
    this.getSeasons();
    this.getMovies();
  },
  methods: {
    getTitle() {
      return this.isSeasonSelectedMovie ? this.episodeSelected.nom : this.selectedSeason.nom;
    },
    getSeasons() {
      const url =
        "https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/playlists/";

      axios.get(url).then((response) => {
        this.seasons = response.data.sort((a, b) => a.nom.localeCompare(b.nom));
      });
    },
    getMovies() {
      const url =
        "https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/playlists/2/videos/";

      axios.get(url).then((response) => {
        this.movies = response.data;
      });
    },
    onSeasonSelected(season, isMovie) {
      this.isSeasonSelectedMovie = isMovie;
      if (isMovie) {
        this.onEpisodeSelected(season)
      } else {
        this.selectedSeason = season;
        window.scrollTo(0, 0);
      }
    },
    onEpisodeSelected(episode) {
      window.scrollTo(0, 0);
      this.episodeSelected = episode;
      this.isEpisodeSelected = true;
    },
  },
};
</script>

<style scoped lang="scss">
.video-container {
  width: min(720px, 100%);
  margin: 0 auto;

  & > .video-wrapper {
    padding-top: 56.25%;
    background-image: url("../assets/player_placeholder.jpg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
}
</style>
