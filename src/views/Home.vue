<template>
  <div id="xc-home">
    <img src="../assets/logo.png" />
    <h4 id="xc-welcome-msg">Benvinguts a One Piece Català</h4>
    <div id="xc-cards-container">

      <ImageCard
        imgUrl="src/assets/op-card.webp"
        title="Anime Online"
        linkUrl="show-online"
      >
        Clica aquí per veure online tots els episodis que hi ha doblats al català.
      </ImageCard>
      <ImageCard
        imgUrl="src/assets/android-logo.webp"
        title="Aplicació Android"
        linkUrl="https://t.me/onepiececatala/101821"
      >
        Descarrega't l'app de Xarxa Català i visualitza el contingut de
        forma nativa al teu dispositiu Android.
      </ImageCard>

      <ImageCard
        imgUrl="src/assets/telegram-logo.webp"
        title="Grup de Telegram"
        linkUrl="https://t.me/onepiececatala/"
      >
        Si voleu parlar amb altres seguidors de One Piece i amb els
        administradors del Projecte, uniu-vos al nostre grup de Telegram!
      </ImageCard>

      <ImageCard
        imgUrl="src/assets/xc-logo.webp"
        title="Xarxa Catala"
        linkUrl="https://xarxacatala.cat"
      >
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
  #xc-cards-container > * {
    margin: 10px;
  }
}

$carousel-height: 400px;

.xc-carousel-inner {
  width: 100%;
  max-height: $carousel-height !important;
  img {
    max-height: $carousel-height !important;
    object-fit: cover;
    object-position: 50% 50%; /* try 20px 10px */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  }
}
</style>