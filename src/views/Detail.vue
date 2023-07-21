<script>
import climaBox from "../components/climaBox.vue";
import loadingModel from "../components/loadingModal.vue"

export default {
    components: {
        climaBox,
        loadingModel,
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
            climaError: '',
            imgError: '',
            tempAtual: ''
        };
    },
    methods: {
        getImages(url) {
            this.loading = true
            if (this.imageUrl != '') return

            // Obtem foto do Google usando a API de pesquisa de imagens
            const googleSearchApiKey = "AIzaSyBLq5cUwYO31kXPjCxhaELx_tNXv_TI-ec"; // Chave de API do Google JSON  com pesquisas de até 10 000 requisições por dia se for somente web é ilimitado
            const customSearchEngineId = "163bf32740a0e4962"; // ID de pesquisa personalizado
            const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?key=${googleSearchApiKey}&cx=${customSearchEngineId}&q=cidade%20de%20${url}&searchType=image`;

            fetch(googleSearchUrl)
                .then((res) => res.json())
                .then((data) => {
                    for (let x = 0; x < 10; x++) {
                        this.imageUrl.push(data.items[x].link)
                    }
                    this.loading = false

                }).catch(err => {
                    this.imgError = "Algo deu errado, tente novamente mais tarde.... :("
                    console.log("error: ", err)
                    this.loading = false
                })

        },
        getClima(a) {
            let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${a}?unitGroup=metric&key=ZNGGPXU6288M2AFT47884B8LQ&contentType=json`
            fetch(url)
                .then(e => e.json())
                .then(data => {
                    for (let x = 0; x < 10; x++) {
                        this.clima.push({
                            "index": x,
                            "data": data.days[x].datetime.split("-").reverse().join("-"),
                            "tempmin": data.days[x].tempmin + ("°"),
                            "tempmax": data.days[x].tempmax + ("°"),
                            "tempmedia": data.days[x].temp + ("°"),
                            "nascerdosol": data.days[x].sunrise,
                            "pordosol": data.days[x].sunset,
                            "humidade": data.days[x].humidity + "%",
                            "condição": data.days[x].conditions,
                            "descrição": data.days[x].description,
                            "precipitação": data.days[x].precip + "mm",
                            "icon": data.days[x].icon.replaceAll("-", ""),

                        })
                    }

                    for (let x = 0; x < 4; x++) {
                        this.climaCarosel.push({
                            "index": x,
                            "data": data.days[x].datetime.split("-").reverse().join("."),
                            "tempmin": data.days[x].tempmin + ("°"),
                            "tempmax": data.days[x].tempmax + ("°"),
                            "tempmedia": data.days[x].temp + ("°"),
                            "nascerdosol": data.days[x].sunrise,
                            "pordosol": data.days[x].sunset,
                            "humidade": data.days[x].humidity + "%",
                            "condição": data.days[x].conditions,
                            "descrição": data.days[x].description,
                            "precipitação": data.days[x].precip + "mm",
                            "icon": data.days[x].icon.replaceAll("-", ""),
                        })
                    }
                    this.tempAtual = data.currentConditions.temp  + ("°")
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                    this.climaError = "Algo deu errado, tente novamente mais tarde.... :("
                    console.log("erro: ", err)
                })

        },
        indexMenos() {
            if (this.index == 0) return
            this.index--
            this.climaCarosel = this.clima.slice(this.index, this.index + 4)
        },
        indexMais() {
            if (this.index == 6) return
            this.index++
            this.climaCarosel = this.clima.slice(this.index, this.index + 4)
        },
        showImg() {
            this.getImages(this.search);
            this.imgContent = !this.imgContent

        }
    },
    mounted() {
        this.getClima(this.search);
    },
};
</script>

<template>
    <main class="content">
        <p class="cidade">{{ search }} - {{ tempAtual }}</p>

        <p class="error" v-if="climaError">{{ climaError }}</p>

        <div class="climaBox">
            <div @click="indexMenos" class="arrow">
                <div class="centerArrow">&lt</div>
            </div>
            <div v-for="x of climaCarosel">
                <climaBox :clima="x"/>
            </div>
            <div @click="indexMais" class="arrow">
                <div class="centerArrow">></div>
            </div>
        </div>

        <p class="fotos" @click="showImg">Veja algumas fotos do local!</p>
        <div class="caroselImg" v-show="imgContent">
            <p class="cloneBtn" @click="imgContent = false">X</p>
            <p class="error" v-show="imgError">{{ imgError }}</p>
            <div v-for="x of imageUrl">
                <img :src="x" alt="" />
            </div>
        </div>

        <loadingModel v-if="loading"></loadingModel>
    </main>
</template>

<style scoped>
.content {
    display: flex;
    height: 80vh;
    flex-direction: column;
    align-items: center;
}

.cidade {
    font-weight: 700;
    font-size: 2rem;
    color: rgb(51, 51, 51);
    
    padding-top: 20px;
    padding-bottom: 20px;
}

.fotos {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
    border-radius: 10px;
    color: white;
    font-weight: 700;

    cursor: pointer;
}

/* IMAGENS */
.caroselImg {
    position: fixed;
    overflow: auto;

    top: 0;
    left: 0;

    z-index: 150;
    width: 100%;
    height: 100%;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.8);

}

.caroselImg img {
    height: 350px;
    border-radius: 5px;
    width: auto;
    margin: 10px;

}


/* CLIMA */
.climaBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;

    width: 90vw;

    cursor: pointer;
}

.cloneBtn {
    color: white;
    background-color: rgb(255, 255, 255, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    margin: 20px;
    top: 0;
    right: 0;

    width: 50px;
    height: 50px;
    border-radius: 50px;
    font-weight: 700;

    transition: 0.4s;
    
}


.cloneBtn:hover {
    opacity: 0.7;
}

.arrow {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 10px;
    width: 50px;
}

.centerArrow {
    box-shadow: 8px 8px 24px #c5c5c5, -8px -8px 24px #fbfbfb;
    background: rgb(255, 255, 255, 0.2);

    border-radius: 10px;
    padding: 10px;

    font-weight: 700;
    font-size: 30px;
    transition: 0.2s;

    user-select: none;
}

.centerArrow:hover {
    background-color: rgb(245, 245, 245);
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
    width: 350px;
    height: 100px;
}
</style>
