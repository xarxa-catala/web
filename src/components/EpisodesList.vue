<template>
  <div class="card">
    <div class="xc-card-body">
      <h4 class="xc-card-title">Episodis</h4>
      <div v-if="loading" class="progress-line"></div>

      <ul>
        <li :class="{ active: isEpisodeSelected(episode) }" v-for="episode in episodes" :key="episode.id"
          v-on:click="onEpisodeSelected(episode)">
          {{ episode.nom }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

import axios from "axios";
import { Episode } from "../models/Episode";
import { onMounted, ref } from "vue";

const props = defineProps<{ seasonId: number }>()
const events = defineEmits<{ (e: 'onEpisodeSelected', episodeid: Episode): void }>()
const loading = ref(true)
const episodes = ref<Episode[]>([])
const episodeSelectedId = ref(-1)

onMounted(() => {
  loadEpisodes()
})

function loadEpisodes() {
  axios
    .get(
      `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/playlists/${props.seasonId}/videos/`
    )
    .then((response) => {
      loading.value = false;
      episodes.value = response.data;
    });
}

function onEpisodeSelected(episode: Episode) {
  episodeSelectedId.value = episode.id;
  events("onEpisodeSelected", episode)
}

function isEpisodeSelected(episode: Episode) {
  return episode.id === episodeSelectedId.value;
}

</script>
<style lang="scss" scoped>
.card {
  width: 300px;
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
  height: 56px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  text-align: start;
  cursor: pointer;
  padding: 16px;
}


.xc-card-title {
  padding: 8px;
}

.xc-card-body {
  width: 100%;
  height: 720px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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

.active {
  background-color: rgb(13, 110, 253);
  color: white;
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