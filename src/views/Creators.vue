<script></script>

<template>
  <div class="container">
    <p class="title">Desenvolvedores</p>

    <section>
      <div class="Eduardo">
        <section class="hover">
          <div class="photo">
            <img src="../imagens/edu.jpeg" alt="">
          </div>
          <h3>Eduardo Scarante</h3>
          <div>
            <a href="https://github.com/EduardoScarante" target="_blank">
              <img src="../imagens/Git.png " />
            </a>
            <a href="https://eduardoscarante.github.io/vuePesonalSite/" target="_blank">
              <img src="../imagens/website.png" />
            </a>
          </div>
        </section>
      </div>

      <div class="Sandy">

        <section class="hover">
          <div class="photo">
            <img src="../imagens/sandy.jpeg" alt="">
          </div>
          <h3>Sandy Seixas</h3>
          <div>
            <a href="https://github.com/SandySei" target="_blank">
              <img src="../imagens/Git.png " /></a>
            <a href="https://sandysei.github.io/site-vue/" target="_blank">
              <img src="../imagens/website.png" />
            </a>
          </div>
        </section>
      </div>
    </section>

    <section class="apis">

      <p class="title">APIs Utilizadas</p>

      <div class="text">
        <img src="../imagens/location.png" />
        <div class="desc">
          <p>API para Localização das Ciades do Brasil</p>
          <a
            href="https://servicodados.ibge.gov.br/api/docs/localidades">https://servicodados.ibge.gov.br/api/docs/localidades</a>
        </div>
      </div>

      <div class="text">
        <img src="../imagens/hot.png" />
        <div class="desc">
          <p>API para o Clima e Temperatura:</p>
          <a href="https://www.visualcrossing.com/weather-api">https://www.visualcrossing.com/weather-api</a>
        </div>
      </div>

      <div class="text">
        <img src="../imagens/search.png" />
        <div class="desc">
          <p>API para Pesquisa de Imagens no Google:</p>
          <a
            href="https://developers.google.com/custom-search/v1/overview?hl=pt-br">https://developers.google.com/custom-search/v1/overview?hl=pt-br</a>
        </div>
      </div>

      <div class="text">
        <img src="../imagens/love-message.png" />
        <div class="desc">
          <p>API "Calculadora" do Amor:</p>
          <a href="https://rapidapi.com/ajith/api/love-calculator">https://rapidapi.com/ajith/api/love-calculator</a>
        </div>
      </div>
    </section>
    <br><br>
    <br><br>
  </div>
</template>

<style scoped>
.container {
  overflow: auto;
  height: 100%;
}

section {
  display: flex;
  padding-top: 50px;
  justify-content: center;
}

.title {
  text-align: center;
  padding: 20px;
  font-size: xx-large;
  font-weight: 500;
}

.Eduardo {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;

  width: 20vw;
}

.Sandy {
  display: flex;
  flex-direction: row;
  align-items: end;

  width: 20vw;
}

.photo img {
  height: auto;

  width: 250px;
  border-radius: 250px;

  border: 2px solid rgb(0, 0, 0, 0.5);
  padding: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.hover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a>img {
  width: 40px;
  transition: 0.2s;
  margin-top: 20px;

  margin: 10px;

}

a>img:hover {
  opacity: 0.8;
}

h3 {
  font-size: 30px;
  font-weight: 400;
}



/* APIS */

.apis {
  flex-direction: column;
  margin: auto;
  width: 50%;
}

.text {
  display: flex;
  flex-direction: row;
  margin: 10px;
  padding: 10px;

  border-bottom: 1px solid rgb(0, 0, 0, 0.15);
}

.text>img {
  width: 40px;
}

.desc {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
