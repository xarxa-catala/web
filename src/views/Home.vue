<template>
  <div id="xc-home">

    <img src="../assets/logo.png"/>
    <div id="xc-cards-container">
      <ImageCard
        imgUrl="https://onepiece.xarxacatala.cat/wp/wp-content/uploads/2017/05/a1e3a5ae-e2c9-49b9-8c85-74279b222a0b.gif"
        title="Aplicació Android"
        linkUrl="https://t.me/onepiececatala/101821"
      >
        Descarrega't l'app de One Piece Català i visualitza el contingut de
        forma nativa al teu dispositiu Android.
      </ImageCard>

      <ImageCard
        imgUrl="https://www.movilzona.es/app/uploads-eloutput.com/2015/03/telegram-logo.jpg?x=720"
        title="Grup de Telegram"
        linkUrl="https://t.me/onepiececatala/"
      >
        Si voleu parlar amb altres seguidors de One Piece i amb els
        administradors del Projecte, uniu-vos al nostre grup de Telegram!
      </ImageCard>

      <ImageCard
        imgUrl="https://onepiece.xarxacatala.cat/wp/wp-content/uploads/2020/06/LogoT-XC.png"
        title="Xarxa Catala"
        linkUrl="https://xarxacatala.cat"
      >
        Clica per descobrir tots els nostres projectes i més informació sobre Xarxa Català.
      </ImageCard>
    </div>
  </div>
</template>

<script>
import ImageCard from "@/components/ImageCard.vue";

export default {
  name: "Home",
  components: {
    ImageCard,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>


<style scoped lang="scss">

#xc-home {
  width: 100%;
  height: 100%;

  #xc-cards-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
  }
  #xc-cards-container > *{
    margin: 10px;
  }
}

$carousel-height: 400px;

.xc-carousel-inner {
  width:100%; 
  max-height: $carousel-height !important;
  img {
    max-height: $carousel-height !important;
    object-fit: cover;
    object-position: 50% 50%; /* try 20px 10px */ 
    background-image: 
    linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
  }

}
</style>