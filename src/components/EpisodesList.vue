<template>
  <div v-if="loading" class="progress-line"></div>
  <ul>
    <li
      :class="{ active: isEpisodeSelected(item) }"
      v-for="item in items"
      :key="item.id"
      v-on:click="onEpisodeSelected(item)"
    >
      {{ item.nom }}
    </li>
  </ul>
</template>

<script>
import axios from "axios";

export default {
  name: "EpisodesList",
  props: {
    season: Object,
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
        `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/playlists/${this.season.id}/videos/`
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
ul {
  padding-left: 0px;
  padding-top: 0px;
  margin: 0px;
  overflow: hidden;
  overflow-y: scroll;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

li {
  box-sizing: content-box;
  width: fit-content;
  height: 24px;
  padding: 4px 8px;
  background-color: #151515;
  border-radius: 0.25rem;
  cursor: pointer;
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
