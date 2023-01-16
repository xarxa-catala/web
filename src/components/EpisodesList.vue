<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Episodis</h4>
      <div v-if="loading" class="progress-line"></div>

      <ul>
        <li
          class="list-group-item"
          :class="{ active: isEpisodeSelected(item) }"
          v-for="item in items"
          :key="item.id"
          v-on:click="onEpisodeSelected(item)"
        >
          {{ item.nom }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "EpisodesList",
  props: {
    seasonId: Number,
  },
  data() {
    return {
      loading: true,
      items: null,
      episodeSelectedId: -1,
    };
  },
  mounted() {

    axios
      .get(
        `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/playlists/${this.seasonId}/videos/`
      )
      .then((response) => {
        this.loading = false;
        this.items = response.data;
      });
  },
  methods: {
    onEpisodeSelected(episode) {
      this.episodeSelectedId = episode.id;
      this.$emit("onEpisodeSelected", episode);
    },

    isEpisodeSelected(episode) {
      return episode.id === this.episodeSelectedId;
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  width: 300px;
}
.card-body {
  width: 100%;
  height: 720px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

@media (max-width: 640px) {
  .card {
    width: 200px;
  }
}

ul {
  padding-left: 0px;
  padding-top: 0px;
  margin: 0px;
  overflow: hidden;
  overflow-y: scroll;
  list-style-type: none;
  flex-grow: 2;
}

li {
  height: 64px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  text-align: start;
  cursor: pointer;
}

.card-header {
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-line,
.progress-line:before {
  height: 3px;
  width: 100%;
  margin: 0;
}
.progress-line {
  background-color: #b3d4fc;
  display: -webkit-flex;
  display: flex;
}
.progress-line:before {
  background-color: #3f51b5;
  content: "";
  -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@-webkit-keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}
@keyframes running-progress {
  0% {
    margin-left: 0px;
    margin-right: 100%;
  }
  50% {
    margin-left: 25%;
    margin-right: 0%;
  }
  100% {
    margin-left: 100%;
    margin-right: 0;
  }
}
</style>