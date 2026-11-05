<script>
import climaBox from "../components/climaBox.vue";
import loadingModel from "../components/loadingModal.vue"
import galeriaFotos from "../components/galeriaFotos.vue"

export default {
    components: {
        climaBox,
        loadingModel,
        galeriaFotos,
    },
    data() {
        return {
            search: this.$route.params.name,
            loading: true,
            imgContent: false,
            imageUrl: [],
            clima: [],
            climaCarosel: [],
            index: 0,
            direcao: 'proximo',
            climaError: '',
            imgError: '',
            carregandoFotos: false,
            tempAtual: ''
        };
    },
    methods: {
        getImages(url) {
            if (this.imageUrl.length || this.carregandoFotos) return
            this.carregandoFotos = true
            this.imgError = ''

            // Obtem foto do Google usando a API de pesquisa de imagens
            const googleSearchApiKey = "AIzaSyBLq5cUwYO31kXPjCxhaELx_tNXv_TI-ec"; // Chave de API do Google JSON  com pesquisas de até 10 000 requisições por dia se for somente web é ilimitado
            const customSearchEngineId = "163bf32740a0e4962"; // ID de pesquisa personalizado
            const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${googleSearchApiKey}&cx=${customSearchEngineId}&q=cidade%20de%20${encodeURIComponent(url)}&searchType=image`;

            fetch(googleSearchUrl)
                .then((res) => res.json())
                .then((data) => {
                    const itens = data.items || []
                    if (!itens.length) throw new Error(data.error?.message || "Nenhuma imagem encontrada")
                    this.imageUrl = itens.slice(0, 10).map((item) => item.link)
                }).catch(err => {
                    this.imgError = "Algo deu errado, tente novamente mais tarde.... :("
                    console.error("error: ", err)
                }).finally(() => {
                    this.carregandoFotos = false
                })

        },
        getClima(a) {
            let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${a}?unitGroup=metric&lang=pt&key=ZNGGPXU6288M2AFT47884B8LQ&contentType=json`
            fetch(url)
                .then(e => e.json())
                .then(data => {
                    this.clima = data.days.slice(0, 10).map((dia) => ({
                        "data": dia.datetime.split("-").reverse().join("."),
                        "tempmin": dia.tempmin + "°",
                        "tempmax": dia.tempmax + "°",
                        "tempmedia": dia.temp + "°",
                        "nascerdosol": dia.sunrise,
                        "pordosol": dia.sunset,
                        "humidade": dia.humidity + "%",
                        "condição": dia.conditions,
                        "descrição": dia.description,
                        "precipitação": dia.precip + "mm",
                        "icon": dia.icon.replaceAll("-", ""),
                    }))
                    this.climaCarosel = this.clima.slice(0, 4)
                    this.tempAtual = data.currentConditions.temp + "°"
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.climaError = "Algo deu errado, tente novamente mais tarde.... :("
                    console.error("erro: ", err)
                })

        },
        indexMenos() {
            if (this.index == 0) return
            this.direcao = 'anterior'
            this.index--
            this.climaCarosel = this.clima.slice(this.index, this.index + 4)
        },
        indexMais() {
            if (this.index == 6) return
            this.direcao = 'proximo'
            this.index++
            this.climaCarosel = this.clima.slice(this.index, this.index + 4)
        },
        showImg() {
            this.getImages(this.search);
            this.imgContent = true

        }
    },
    mounted() {
        this.getClima(this.search);
    },
};
</script>

<template>
    <main class="content">
        <header class="cabecalho">
            <p class="cidade">
                <span class="material-symbols-outlined">location_on</span>
                {{ search }}
            </p>
            <p class="agora" v-if="tempAtual">
                <span class="tempAtual">{{ tempAtual }}</span>
                <span class="legenda">agora</span>
            </p>
        </header>

        <p class="error" v-if="climaError">{{ climaError }}</p>

        <div class="climaBox">
            <div @click="indexMenos" class="arrow" :class="{ desativado: index == 0 }">
                <div class="centerArrow">
                    <span class="material-symbols-outlined">chevron_left</span>
                </div>
            </div>
            <div class="trilho">
                <transition :name="'slide-' + direcao" mode="out-in">
                    <div class="cards" :key="index">
                        <div v-for="x of climaCarosel" :key="x.data">
                            <climaBox :clima="x"/>
                        </div>
                    </div>
                </transition>
            </div>
            <div @click="indexMais" class="arrow" :class="{ desativado: index == 6 }">
                <div class="centerArrow">
                    <span class="material-symbols-outlined">chevron_right</span>
                </div>
            </div>
        </div>

        <p class="fotos" @click="showImg">
            <span class="material-symbols-outlined">photo_library</span>
            Veja algumas fotos do local!
        </p>
        <galeriaFotos
            v-if="imgContent"
            :fotos="imageUrl"
            :cidade="search"
            :carregando="carregandoFotos"
            :erro="imgError"
            @fechar="imgContent = false"
        />

        <loadingModel v-if="loading"></loadingModel>
    </main>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;

    width: 100%;
    max-width: 1200px;
    min-height: 100%;
    margin: 0 auto;
    padding: 20px 10px 60px;
}

.cabecalho {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    padding: 30px 0 25px;
    text-align: center;
}

.cidade {
    display: flex;
    align-items: center;
    gap: 6px;

    font-weight: 800;
    font-size: clamp(1.4rem, 5vw, 2.2rem);
    color: #002d72;
}

.cidade .material-symbols-outlined {
    font-size: 1.1em;
    color: #0055d9;
}

.agora {
    display: flex;
    align-items: baseline;
    gap: 8px;
    color: #333;
}

.tempAtual {
    font-size: 1.4rem;
    font-weight: 700;
    color: #0055d9;
}

.legenda {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.6;
}

.fotos {
    display: flex;
    align-items: center;
    gap: 8px;

    margin-top: 30px;
    padding: 14px 26px;
    border-radius: 999px;

    background: linear-gradient(90deg, #0055d9, #002d72);
    color: white;
    font-weight: 700;

    box-shadow: 0 8px 20px rgba(0, 85, 217, 0.3);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.fotos:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 26px rgba(0, 85, 217, 0.4);
}

/* CLIMA */
.climaBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    cursor: pointer;
}

.trilho {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    /* espaço para a sombra e o "pulo" do hover não serem cortados */
    padding: 14px 6px 24px;
    margin: -14px -6px -24px;
}

/* ANIMAÇÃO DO CARROSSEL */
.slide-proximo-enter-active,
.slide-proximo-leave-active,
.slide-anterior-enter-active,
.slide-anterior-leave-active {
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.slide-proximo-enter-from,
.slide-anterior-leave-to {
    opacity: 0;
    transform: translateX(60px);
}

.slide-proximo-leave-to,
.slide-anterior-enter-from {
    opacity: 0;
    transform: translateX(-60px);
}

@media (prefers-reduced-motion: reduce) {
    .slide-proximo-enter-active,
    .slide-proximo-leave-active,
    .slide-anterior-enter-active,
    .slide-anterior-leave-active {
        transition: opacity 0.2s;
    }

    .slide-proximo-enter-from,
    .slide-proximo-leave-to,
    .slide-anterior-enter-from,
    .slide-anterior-leave-to {
        transform: none;
    }
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.cards > div {
    flex: 1 1 220px;
    max-width: 260px;
}

.arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 10px;
    width: 50px;
    flex-shrink: 0;
}

.centerArrow {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 46px;
    height: 46px;
    border-radius: 50%;

    background: white;
    color: #0055d9;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transition: 0.2s;

    user-select: none;
}

.centerArrow .material-symbols-outlined {
    font-size: 30px;
}

.centerArrow:hover {
    background-color: #0055d9;
    color: white;
    transform: scale(1.08);
}

.centerArrow:active {
    transform: scale(0.92);
}

.arrow.desativado {
    opacity: 0.35;
    pointer-events: none;
}

.error{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-color: lightcoral;
    color: white;
    
    font-weight: 700;
    border-radius: 10px;
    width: 100%;
    max-width: 350px;
    min-height: 100px;
    padding: 10px;
}

@media (max-width: 600px) {
    .arrow {
        margin: 4px;
        width: 36px;
    }

    .centerArrow {
        width: 34px;
        height: 34px;
    }

    .centerArrow .material-symbols-outlined {
        font-size: 22px;
    }

    .cards > div {
        flex-basis: 100%;
        max-width: 100%;
    }
}
</style>
