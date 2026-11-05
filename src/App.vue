<script>
import icon from "./imagens/love-message.png";

import loveApi from "./components/apiLove.vue";

export default {
  components: {
    loveApi,
  },
  data() {
    return {
      icon,
      AnuncioApiLove: false,
    };
  },
  methods: {
    HandleModalLoveApi() {
      this.AnuncioApiLove = !this.AnuncioApiLove;
    },
  },
};
</script>

<template>
  <main class="main">
    <nav>
      <RouterLink to="/">
        <span class="material-symbols-outlined"> home </span>
      </RouterLink>
      <RouterLink to="/info">
        <span class="material-symbols-outlined"> info </span>
      </RouterLink>
      <RouterLink to="/creators">
        <span class="material-symbols-outlined"> logo_dev </span>
      </RouterLink>
    </nav>

    <div class="page">
      <RouterView />
    </div>

    <div class="anuncio" @click="HandleModalLoveApi">
      <img :src="icon" alt="" />
    </div>

    <loveApi v-on:closeModal="HandleModalLoveApi" v-if="AnuncioApiLove"></loveApi>
  </main>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  height: 100dvh;

  display: flex;
  flex-direction: column;
}

.page {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

nav {
  width: 100%;
  height: 50px;
  flex-shrink: 0;

  padding: 0px;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 3px 0px #0055d9;

  z-index: 1000;

}

nav span {
  margin: 20px;
  color: black;
  text-decoration: none;
}

img {
  height: 60px;
  transform: rotateY(180deg);
}

.anuncio {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;

  cursor: pointer;

  animation: go-back 0.5s infinite alternate;
}

@media (max-width: 600px) {
  img {
    height: 45px;
  }

  .anuncio {
    padding: 10px;
  }
}

@keyframes go-back {
  from {
    transform: translateY(20px);
  }

  to {
    transform: translateY(0);
  }
}
</style>
