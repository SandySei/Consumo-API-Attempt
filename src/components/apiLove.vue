<script>

import lottie1 from "@/lottie/love-dog.json";
import lottie2 from "@/lottie/love-sheep.json";

import loading from "./loadingModal.vue"

export default {
    components: {
        loading
    },
    data() {
        return {
            lottie1,
            lottie2,

            nome1: "",
            nome2: "",
            resApi: "",

            loading: false,
        };
    },
    methods: {
        async calculateLoveApi() {
            this.loading = true

            const url = `https://love-calculator.p.rapidapi.com/getPercentage?sname=${this.nome1}&fname=${this.nome2}`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "311ed1e4a9msh8fb52b3af94b7cep178b83jsnaaaec4ea33b7",
                    "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
                },
            };

            const response = await fetch(url, options);
            const result = await response.json();
            this.resApi = result;

            this.loading = false
        },
        closeModal() {
            this.$emit('closeModal')
            return
        }
    },
};

</script>


<template>
    <div class="modalApiLove">
        <div class="modal">
            <div class="inputUser">
                <p><b>Calculadora do Amor!</b></p>
                <div @click="closeModal" class="btnClose">X</div>
                <input type="text" placeholder="Digite seu Nome" v-model="nome1" />
                <input type="text" placeholder="Digite o Nome do seu Amor!" v-model="nome2" />
                <button @click="calculateLoveApi">Calcular</button>

                <div class="res" v-show="resApi != ''">
                    <p>{{ resApi.percentage }}%</p>
                    <p>{{ resApi.result }}</p>
                </div>
            </div>

            <lottie-player class="lt1" :src="lottie1" speed="1" style="width: 400px; height: auto" loop
                autoplay></lottie-player>
            <lottie-player class="lt2" :src="lottie2" speed="1" style="width: 400px; height: auto" loop
                autoplay></lottie-player>
        </div>

        <loading v-if="loading"></loading>
    </div>
</template>

<style scoped>
.modalApiLove {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    z-index: 250;
}

.inputUser {
    flex-direction: column;
    justify-content: space-around;

    width: 400px;
    padding: 50px;
    background-color: white;
    border-radius: 10px;

    background-color: lightcoral;
}

.btnClose {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
}

input {
    padding: 10px;
    border: none;
    width: 300px;
    margin-top: 10px;
    margin-bottom: 10px;

    background-color: rgb(255, 198, 198);
}

button {
    margin-top: 10px;
    background-color: red;
    color: white;
    font-weight: 700;
    padding: 20px;
    border-radius: 10px;
    border: none;
    width: 100px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

.lt1 {
    position: absolute;
    bottom: 0;
    right: 0;
}

.lt2 {
    position: absolute;
    bottom: 0;
    left: 0;
}

.res{
    margin-top: 20px;
    padding: 10px;
    font-weight: 700;
    color: white;
    border-radius: 10px;
    background-color: rgb(202, 0, 175);
}
</style>