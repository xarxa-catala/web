<template>
  <div class="card">
    <div class="xc-card-body">
      <h4 class="xc-card-title">Temporades</h4>

      <ul>
        <li v-for="season in seasons" :class="{ active: selectedSeasonId == season.id }" :key="season.id"
          v-on:click="onSeasonSelected(season)">
          {{ season.nom }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { Season } from "../models/Season";

const events = defineEmits<{ (e: 'onSeasonSelected', season: Season): void }>()

const seasons = ref<Season[]>([])
const selectedSeasonId = ref(-1)

onMounted(() => {
  axios
    .get(
      "https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/playlists/"
    )
    .then((response) => {
      const playlists: Season[] = response.data;
      const sortedPlaylists = playlists.sort((a, b) => a.nom.localeCompare(b.nom));
      seasons.value = sortedPlaylists;
    });
})

function onSeasonSelected(season: Season) {
  selectedSeasonId.value = season.id;
  events("onSeasonSelected", season);
}

</script>

<style lang="scss" scoped>
.card {
  width: 300px;
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

@media (max-width: 640px) {
  .card {
    width: 200px;
  }
}


ul {
  padding: 0px;
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

.active {
  background-color: rgb(13, 110, 253);
  color: white;
}
</style>