<template>
  <main>
    <section id="header" class="container">
      <div class="d-flex justify-content-around align-items-center">
        <img class="jolly-roger" :src="randomJollyRogerLeft" />
        <h1>Benvinguts a One Piece Català</h1>
        <img class="jolly-roger" :src="randomJollyRogerRight" />
      </div>
    </section>

    <hr class="mb-0" />

    <section id="cards">
      <div class="row m-0">
        <div class="col-12 col-lg-6 p-0">
          <ImageCard
            imgUrl="crew.webp"
            title="Anime Online"
            linkUrl="show-online"
            backgroundColor="#ee6666"
          >
            Clica aquí per veure online tots els episodis que hi ha doblats al
            català.
          </ImageCard>
        </div>
        <div class="col-12 col-lg-6 p-0">
          <ImageCard
            icon="android2"
            title="Aplicació Android"
            linkUrl="https://t.me/onepiececatala/101821"
            backgroundColor="#9bf5c3"
          >
            Descarrega't l'app de Xarxa Català i visualitza el contingut de
            forma nativa al teu dispositiu Android.
          </ImageCard>
        </div>
        <div class="col-12 col-lg-6 p-0">
          <ImageCard
            icon="telegram"
            title="Grup de Telegram"
            linkUrl="https://t.me/onepiececatala/"
            backgroundColor="#35abde"
          >
            Parlar amb altres seguidors de One Piece i amb els
            administradors del Projecte. Uniu-vos al nostre grup de Telegram!
          </ImageCard>
        </div>
        <div class="col-12 col-lg-6 p-0">
          <ImageCard
            imgUrl="xc-logo.webp"
            title="Xarxa Catala"
            linkUrl="https://xarxacatala.cat"
            backgroundColor="#f9e1a4"
          >
            Descobreix tots els nostres projectes i més informació sobre Xarxa Català.
          </ImageCard>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ImageCard from "@/components/ImageCard.vue";

export default {
  name: "Home",
  components: {
    ImageCard,
  },
  data() {
    return {
      randomImageInterval: null,
      randomJollyRogerLeft: null,
      randomJollyRogerRight: null,
      jollyRogers: [
        "/jolly_rogers/luffy.webp",
        "/jolly_rogers/zoro.webp",
        "/jolly_rogers/nami.webp",
        "/jolly_rogers/usop.webp",
        "/jolly_rogers/sanji.webp",
        "/jolly_rogers/chopper.webp",
        "/jolly_rogers/robin.webp",
        "/jolly_rogers/franky.webp",
        "/jolly_rogers/brook.webp",
        "/jolly_rogers/jimbe.webp",
      ],
    };
  },
  mounted() {
    this.randomImageInterval = setInterval(() => {
      this.randomJollyRogerLeft = this.randomizeImage();
      this.randomJollyRogerRight = this.randomizeImage();
    }, 2000);
    this.randomJollyRogerLeft = this.randomizeImage();
    this.randomJollyRogerRight = this.randomizeImage();
  },
  unmounted() {
    clearInterval(this.randomImageInterval);
  },
  methods: {
    randomizeImage() {
      const randomNumber = this.getRandomNumber();
      return this.jollyRogers[randomNumber];
    },
    getRandomNumber() {
      return parseInt(Math.random() * 10);
    },
  },
};
</script>

<style scoped lang="scss">
main {
  background-color: #bcdffc;
}

.jolly-roger {
  width: 128px;
  @media (max-width: 992px) {
    width: 64px;
  }
}
</style>
