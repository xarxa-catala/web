<template>
  <div id="xc-app">
    <div class="wrapper">
      <nav
        class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary"
        id="main-navbar"
      >
        <div class="container-fluid">
          <a class="navbar-brand nav-item" @click="navigateTo('/')"
            >One Piece Català</a
          >
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
              <li class="nav-item" @click="navigateTo('/show-online')">
                <a
                  class="nav-link"
                  :class="{ active: isCurrentPage('/show-online') }"
                  aria-current="page"
                  >Anime Online</a
                >
              </li>
              <li class="nav-item" @click="navigateTo('/about')">
                <a class="nav-link" :class="{ active: isCurrentPage('/about') }"
                  >Qui som?</a
                >
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manga
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><a class="dropdown-item" target="_blank" href="https://mega.nz/folder/Od4X0YTB#hSQjtzlpz392MsXYE8AnIg">Capítols</a></li>
                  <li><a class="dropdown-item" target="_blank" href="https://mega.nz/folder/HNYnALBJ#Rt-t-4n_5PAntz79kbpOnA">Volums</a></li>
                  <li><a class="dropdown-item" target="_blank" href="https://lectortmo.com/library/manga/126/one-piece-catala">TuMangaOnline</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <router-view class="router" />
      <div class="push"></div>
    </div>
    <footer class="footer">
      <div class="xc-separator" />
      <div id="xc-footer-content">
        <a href="https://xarxacatala.cat">
          <div id="xc-footer-title">Xarxa Català</div>
        </a>
        <div class="spacer" />
        <a href="https://t.me/onepiececatala"
          ><i class="xc-social-icon bi bi-telegram"></i
        ></a>
        <a href="https://twitter.com/CatalaOnePiece"
          ><i class="xc-social-icon bi bi-twitter"></i
        ></a>
        <a href="https://www.instagram.com/catonepiece/"
          ><i class="xc-social-icon bi bi-instagram"></i
        ></a>
        <a href="https://www.facebook.com/onepiececatala"
          ><i class="xc-social-icon bi bi-facebook"></i
        ></a>
      </div>
    </footer>
  </div>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

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
$footer-height: 75px;

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#xc-app {
  height: 100%;
  width: 100%;
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

.wrapper {
  min-height: 100%;

  /* Equal to height of footer */
  /* But also accounting for potential margin-bottom of last child */
  margin-bottom: -$footer-height;
}
.footer,
.push {
  height: $footer-height;
}

#xc-footer-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .spacer {
    flex-grow: 4;
  }
  .xc-social-icon {
    font-size: 2rem;
    margin-left: 8px;
    margin-right: 8px;
  }

  #xc-footer-title {
    font-size: 1.2rem;
    padding-left: 16px;
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: #000000;
    text-decoration: none;
    cursor: pointer;
  }
}

.xc-separator {
  width: 100%;
  height: 2px;
  background-color: lightgray;
}
</style>
