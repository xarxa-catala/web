<template>
  <div class="xc-card card" style="width: 18rem">
    <a :href="linkUrl">
      <img :src="getAssetSrc(imgUrl)" class="xc-card-img card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          <slot />
        </p>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">import { modules } from '../modules';

const props = defineProps<{ imgUrl: string, title: string, linkUrl: string }>()
function getImgUrl(): string {
  return new URL(props.imgUrl, import.meta.url).href;
}

function getAssetSrc(name: string) {
  const path = `/src/assets/${name}`;
  const mod = modules[path] as { default: string };
  return mod.default;
};
</script>
<style lang="scss" scoped>
.xc-card:hover {
  box-shadow: 0 0 5px 5px rgb(0 0 0 / 0.2);

  text-decoration: none;
  cursor: pointer;
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
