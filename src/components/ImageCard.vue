<template>
  <a
    class="xc-card"
    :href="linkUrl"
    :style="'background-color: ' + backgroundColor + ';'"
  >
    <div class="xc-card-img">
      <img v-if="!!imgUrl" :src="getImage()" alt="..." />
      <i v-if="!!icon" :class="getIcon()"></i>
    </div>
    <h2 class="xc-card-title m-0">{{ title }}</h2>
    <p class="xc-card-text m-0">
      <slot />
    </p>
  </a>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  name: "ImageCard",
  props: {
    imgUrl: String,
    icon: String,
    title: String,
    linkUrl: String,
    backgroundColor: String,
  },
  methods: {
    getImage() {
      return require(`../assets/${this.imgUrl}`);
    },
    getIcon() {
      return `bi bi-${this.icon}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.xc-card {
  width: 100%;
  height: 350px;
  text-decoration: none;
  cursor: pointer;

  display: grid;
  grid-template-rows: 175px 175px;
  grid-template-columns: 350px 1fr;

  &:hover {
    & > .xc-card-img {
      transform: scale(1.1);
    }
  }

  & > .xc-card-img {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 3;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      max-width: 250px;
    }

    & i.bi {
      font-size: 10rem;
    }
  }

  & > .xc-card-title {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;
    align-self: end;
    padding: 0 32px;
  }

  & > .xc-card-text {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 2;
    padding: 0 32px;
  }

  @media (max-width: 992px) {
    width: 100%;
    height: 400px;
    grid-template-rows: 250px 50px 100px;
    grid-template-columns: 1fr;

    & > .xc-card-img {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row-start: 1;
      grid-row-end: 1;

      & > img {
        max-width: 160px;
      }
    }

    & > .xc-card-title {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row-start: 2;
      grid-row-end: 2;
    }

    & > .xc-card-text {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row-start: 3;
      grid-row-end: 3;
    }
  }
}

a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
  text-decoration: none;
}
</style>
