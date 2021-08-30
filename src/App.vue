<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" id="main-navbar">
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
              :class="{ active: isCurrentPage('/') }" aria-current="page" href="#">Inici</a>
          </li>
          <li class="nav-item" @click="navigateTo('/about')">
            <a
              class="nav-link"
              :class="{ active: isCurrentPage('/about') }"
              href="#"
              >Qui som?</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Descàrregues</a>
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

#nav {
  height: 50px;
  display: flex;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

#logo {
  height: 100px;
  width: 100px;
}

.spacer {
  flex-grow: 10;
}

.router {
  margin-top: 100px;
}

#main-navbar {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
</style>
