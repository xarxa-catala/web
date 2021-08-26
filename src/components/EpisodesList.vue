<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h4 class="card-title">Episodis</h4>

      <ul>
        <li
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
//import * as Vue from 'vue' // in Vue 3
import axios from "axios";
//import VueAxios from 'vue-axios'

export default {
  name: "EpisodesList",
  props: {
    seasonId: Number,
  },
  data() {
    return {
      items: null,
    };
  },
  mounted() {
    console.log("Mounting EpisodesList with seasonId " + this.seasonId);

    axios
      .get(
        `https://gestio.multimedia.xarxacatala.cat/api/v1/shows/4/seasons/${this.seasonId}/episodes/`
      )
      .then((response) => {
        this.items = response.data;
        console.log(response.data);
      });
  },
  methods: {
    onEpisodeSelected(item) {
      console.log(item.nom);
      this.$emit("onEpisodeSelected", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.card-body {
  width: 300px;
  height: 720px;
  display: flex;
  flex-direction: column;
}

ul {
  padding-left: 20px;
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
  cursor: pointer;
}

.card-header {
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>