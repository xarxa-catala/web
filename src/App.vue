<template>
  <div id="nav">
    <img id="logo" alt="One Piece Català logo" src="./assets/web_icon.jpg">
    <div class="spacer"/>
    <button type="button" class="btn btn-outline-primary">Inici</button>
    <button type="button" class="btn btn-outline-primary">Sobre nosaltres</button>
  </div>
  <router-view class="router"/>
</template>

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
</style>
