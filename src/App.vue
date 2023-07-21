<script>
import { RouterLink, RouterView } from "vue-router";

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
      console.log(this.AnuncioApiLove);
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

    <RouterView />

    <div class="anuncio" @click="HandleModalLoveApi">
      <img :src="icon" alt="" />
    </div>

    <loveApi v-on:closeModal="HandleModalLoveApi" v-if="AnuncioApiLove"></loveApi>
  </main>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
}

nav {
  width: 100vw;
  height: 50px;

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

/* nav > *.router-link-exact-active {
  color: red;
  font-weight: 700;
}

nav span a.router-link-exact-active:hover {
  background-color: transparent;
  color: red ;
} */

.anuncio {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;

  cursor: pointer;

  animation: go-back 0.5s infinite alternate;
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
