<template>
  <ul class="seasons">
    <template v-for="season in seasons" :key="season.id">
      <li
        class="season"
        v-if="season.id != 2"
        v-on:click="onSeasonSelected(season)"
      >
        <div class="season-title">
          <h5 class="m-0">{{ transformTitle(season.nom) }}</h5>
        </div>
        <div class="season-image" v-bind:style="{ backgroundImage: 'url(' + getCover(season.id) + ')' }">
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import seasonsToVolumes from '../assets/maps/seasons_to_volumes.json';
import moviesToCovers from '../assets/maps/movies_to_covers.json';

export default {
  name: "Seasons",
  props: {
    seasons: [],
    areMovies: Boolean,
  },
  data() {
    return {
      items: null,
      selectedSeasonId: -1,
    };
  },
  methods: {
    onSeasonSelected(season) {
      this.selectedSeasonId = season.id;
      this.$emit("onSeasonSelected", season, this.areMovies);
    },
    getCover(id) {
      return this.areMovies ? this.getMovieCover(id) : this.getSeasonVolume(id);
    },
    getSeasonVolume(seasonId) {
      return seasonsToVolumes[seasonId];
    },
    getMovieCover(movieId) {
      return moviesToCovers[movieId];
    },
    transformTitle(title) {
      return this.areMovies ? title : title.substr(6);
    },
  },
};
</script>

<style lang="scss" scoped>
.seasons {
  padding: 0px;
  margin: 0px;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
}

.season {
  width: 256px;
  margin-bottom: 16px;
  padding: 0 8px;
  text-align: center;
  cursor: pointer;

  &-title {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-image {
    display: flex;
    align-items: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding-top: 158%;
  }

  @media (max-width: 992px) {
    width: 128px;
    flex-grow: 1;

    &-title {
      height: 92px;
    }
  }
}
</style>
