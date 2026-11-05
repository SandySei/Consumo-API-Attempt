<script>
import search from "../components/search.vue";

export default {
  components: {
    search,
  },
  data() {
    return {
      cidades: [],
      filteredCidades: [],
      filtro: "",
      mostarbox: false,
    };
  },
  methods: {
    getIbgeData() {
      fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
        .then((e) => e.json())
        .then((e) => {
          for (let x in e) {
            this.cidades.push({
              nome: e[x].nome,
              estado: e[x].microrregiao.mesorregiao.UF.nome,
              UF: e[x].microrregiao.mesorregiao.UF.sigla,
            });
          }
        })
        .catch((err) => {
          console.error("error: ", err);
        });
    },
    handleFilter() {
      if (this.filtro.length <= 2) {
        this.filteredCidades = [];
        this.mostarbox = false;
        return;
      }

      this.mostarbox = true;
      this.filteredCidades = this.cidades.filter((e) => {
        return e.nome.toLowerCase().includes(this.filtro.toLowerCase());
      });
    },
    handleClickDetail(e) {
      this.$router.push(`/detalhe/${e.target.id}`);
    },
  },
  mounted() {
    this.getIbgeData();
  },
};
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <div id="imagens">
        <img id="logo" src="../logos/AttemptICONazul.png" />
        <img id="text" src="../logos/AttemptTEXTO(2).png" />
      </div>

      <input type="text" v-model="filtro" @keyup="handleFilter" placeholder="Busque por uma cidade do Brasil..." />

      <br />

      <div class="boxFilter" v-show="mostarbox">
        <div v-for="x of filteredCidades" :key="x.nome + x.UF">
          <search @click="handleClickDetail" :filteredCidades="x" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: linear-gradient(360deg,
      #002d72 0%,
      #0055d9 100%);

  width: 100%;
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  padding: 40px 20px;
}

#imagens {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  height: clamp(80px, 22vh, 200px);

  margin-bottom: 60px;
}

img#logo,
img#text {
  width: auto;
  height: 100%;
  min-width: 0;
  object-fit: contain;
}

img#text {
  max-width: 70%;
}

input {
  width: 100%;
  max-width: 600px;
  border: none;
  padding: 20px;
  background-color: rgb(238, 238, 238);

  border-radius: 5px;
}

input:focus {
  box-shadow: 0 0 0 1px rgba(214, 214, 214, 0.562);
  outline: 0;
}

.boxFilter {
  width: 100%;
  max-width: 600px;
  max-height: 40vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  cursor: pointer;
}

@media (max-width: 600px) {
  #imagens {
    height: 70px;
    margin-bottom: 30px;
  }
}

/* NAV BAR PERSONALIZADA */

.boxFilter::-webkit-scrollbar {
  width: 4px;
}

.boxFilter::-webkit-scrollbar-track {
  background: #88888800;
  border-radius: 6px;
}

.boxFilter::-webkit-scrollbar-thumb {
  background: #ffffff;
  border-radius: 6px;
}
</style>
