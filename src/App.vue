<template>
  <Navbar />
  <router-view class="router" />
  <Footer />
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      currentPage: "/",
    };
  },
  watch: {
    $route(to) {
      this.currentPage = to.fullPath;
    },
  },

  methods: {
    navigateTo(destination) {
      this.$router.push(destination);
    },
    isCurrentPage(page) {
      return this.currentPage === page;
    },
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  width: 100vw;
  min-height: calc(100vh - 150px);
}
</style>
