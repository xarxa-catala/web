<template>
  <div id="xc-home">
    <div id="info-banner">
      <div id="info-banner__content">
        <h3 id="info-banner__content__title">One Piece torna al canal SX3!</h3>
        <p id="info-banner__content__body"><a style="color: inherit;" href="https://twitter.com/CatalaOnePiece/status/1671238786544553986/photo/1">Com vam anunciar</a>, despengem els episodis de One Piece per tal de donar
          audiència al canal SX3 i procurar que comprin i doblin més episodis en català.<br/>Clica <a href=""><b id="info-banner__clicable">aquí</b></a> per veure One Piece al web del SX3.</p>
      </div>
    </div>
    <img src="../assets/logo.png" />
    <h4 id="xc-welcome-msg">Benvinguts a One Piece Català</h4>
    <div id="xc-cards-container">

      <ImageCard
        imgUrl="op-card.webp"
        title="Anime Online"
        linkUrl="https://www.ccma.cat/tv3/sx3/one-piece/"
      >
        Clica aquí per veure online tots els episodis que hi ha doblats al català.
      </ImageCard>
      <!-- <ImageCard
        imgUrl="android-logo.webp"
        title="Aplicació Android"
        linkUrl="https://t.me/onepiececatala/101821"
      > 
        Descarrega't l'app de Xarxa Català i visualitza el contingut de
        forma nativa al teu dispositiu Android.
      </ImageCard> -->

      <ImageCard imgUrl="telegram_logo.webp" title="Grup de Telegram" linkUrl="https://t.me/onepiececatala/">
        Si voleu parlar amb altres seguidors de One Piece i amb els
        administradors del Projecte, uniu-vos al nostre grup de Telegram!
      </ImageCard>

      <ImageCard imgUrl="xc-logo.webp" title="Xarxa Catala" linkUrl="https://xarxacatala.cat">
        Clica per descobrir tots els nostres projectes i més informació sobre
        Xarxa Català.
      </ImageCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageCard from '../components/ImageCard.vue';
</script>


<style scoped lang="scss">
#xc-home {
  width: 100%;
  height: 100%;

  #xc-welcome-msg {
    font-weight: 700;
    margin-top: 24px;
    margin-bottom: 36px;
  }

  #xc-cards-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }

  #xc-cards-container>* {
    margin: 10px;
  }
}

#info-banner {
  width: calc(100% - 64px);
  padding: 24px;
  margin-left: 32px;
  margin-right: 32px;
  margin-bottom: 24px;
  border-radius: 8px;
  background-color: #FDF1EC;
  border-style: solid;
  border-width: 2px;
  border-color: #EA5C1F;
  display: flex;
  flex-direction: column;
  align-items: center;

  #info-banner__content {
    max-width: 800px;
  }

  #info-banner__clicable {
    color: #EA5C1F;
  }
}

$carousel-height: 400px;

.xc-carousel-inner {
  width: 100%;
  max-height: $carousel-height !important;

  img {
    max-height: $carousel-height !important;
    object-fit: cover;
    object-position: 50% 50%;
    /* try 20px 10px */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
}
</style>