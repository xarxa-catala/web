<template>
  <header>
    <div class="logo" :onclick="goToMainPage"></div>
    <a class="xc-logo" href="https://xarxacatala.cat/" target="_blank"></a>
    <div class="social">
      <a href="https://t.me/onepiececatala">
        <i class="xc-social-icon bi bi-telegram"></i>
      </a>
      <a href="https://twitter.com/CatalaOnePiece">
        <i class="xc-social-icon bi bi-twitter"></i>
      </a>
      <a href="https://www.instagram.com/catonepiece/">
        <i class="xc-social-icon bi bi-instagram"></i>
      </a>
      <a href="https://www.facebook.com/onepiececatala">
        <i class="bi bi-facebook"></i>
      </a>
    </div>
  </header>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  name: "Navbar",
  props: {},
  data() {
    return {
      currentPage: "/",
    };
  },
  methods: {
    goToMainPage() {
      this.$router.push('/')
    },
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
header {
  width: 100%;
  height: 150px;
  background-color: #bcdffc;
  display: grid;
  grid-template-columns: 100px 100px 1fr auto;
  grid-template-rows: 150px;
  padding: 0 16px;

  & > .logo {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;

    background-image: url("../assets/logo.png");
  }

  & > .xc-logo {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 1;

    background-image: url("../assets/xc-logo.webp");
  }

  & > .logo,
  & > .xc-logo {
    background-size: 80px 80px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  & > .social {
    grid-column-start: 4;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 1;

    display: flex;
    align-items: center;
    justify-content: space-around;

    & > a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #000000;
        text-decoration: none;
        cursor: pointer;
      }

      & > i {
        font-size: 2rem;
        margin-left: 8px;
        margin-right: 8px;
        color: #2c3e50;
      }
    }
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;

    & > .social {
      display: none;
    }
  }
}
</style>
