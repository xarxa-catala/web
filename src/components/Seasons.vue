<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h4 class="card-title">Temporades</h4>

      <ul>
        <li
          class="list-group-item"
          :class="{ active: isSeasonSelected(item) }"
          v-for="item in items"
          :key="item.id"
          v-on:click="onSeasonSelected(item)"
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
  name: "Seasons",
  data() {
    return {
      items: null,
      selectedSeasonId: -1,
    };
  },
  mounted() {
    axios
      .get("https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/seasons/")
      .then((response) => {
        this.items = response.data;
        console.log(response.data);
      });
  },
  methods: {
    onSeasonSelected(season) {
      console.log(season.nom);
      this.selectedSeasonId = season.id;
      this.$emit("onSeasonSelected", season);
    },
    isSeasonSelected(season) {
      return season.id === this.selectedSeasonId;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-body {
  width: 300px;
  height: 720px;
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  height: 64px;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.card-header {
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>