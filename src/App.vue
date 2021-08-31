<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light" id="main-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">One Piece Català</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" @click="navigateTo('/')">
            <a class="nav-link"
              :class="{ active: isCurrentPage('/') }" aria-current="page">Anime Online</a>
          </li>
          <li class="nav-item" @click="navigateTo('/about')">
            <a
              class="nav-link"
              :class="{ active: isCurrentPage('/about') }"
              >Qui som?</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link">Descàrregues</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view class="router" />
</template>

<script>
export default {
  data() {
    return {
      currentPage: "/",
    };
  },
  watch: {
    $route(to, from) {
      console.log(`navigating from ${from.fullPath} to ${to.fullPath}`);
      this.currentPage = to.fullPath;
    },
  },

  methods: {
    navigateTo(destination) {
      console.log(`Navigating to ${destination}`);
      this.$router.push(destination);
    },
    isCurrentPage(page) {
      var isCurrentPage = this.currentPage === page;
      console.log(`Is current page ${page}? ${isCurrentPage}`);

      return isCurrentPage;
    },
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo {
  height: 100px;
  width: 100px;
}

.nav-item {
  cursor: pointer;
}

.router {
  margin-top: 50px;
}

#main-navbar {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
</style>
