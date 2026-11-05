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
            resApi: null,
            erro: "",

            loading: false,
        };
    },
    methods: {
        async calculateLoveApi() {
            const nome1 = this.nome1.trim();
            const nome2 = this.nome2.trim();

            this.resApi = null;
            this.erro = "";

            if (!nome1 || !nome2) {
                this.erro = "Preencha os dois nomes!";
                return;
            }

            this.loading = true;

            try {
                const url = `https://love-calculator.p.rapidapi.com/getPercentage?sname=${encodeURIComponent(nome1)}&fname=${encodeURIComponent(nome2)}`;
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

                if (!response.ok || result.percentage === undefined) {
                    throw new Error(result.message || "Resposta inválida da API");
                }

                this.resApi = {
                    percentage: result.percentage,
                    result: this.mensagem(Number(result.percentage)),
                };
            } catch (err) {
                // API indisponível: calcula localmente
                console.warn("Love API indisponível, usando cálculo local:", err);
                const percentage = this.calculoLocal(nome1, nome2);
                this.resApi = { percentage, result: this.mensagem(percentage) };
            } finally {
                this.loading = false;
            }
        },
        calculoLocal(a, b) {
            // Ordena os nomes para que "A + B" dê o mesmo resultado que "B + A"
            const texto = [a, b]
                .map((n) => n.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))
                .sort()
                .join("❤");

            let hash = 0;
            for (const char of texto) {
                hash = (hash * 31 + char.charCodeAt(0)) % 100000;
            }
            return hash % 101;
        },
        mensagem(p) {
            if (p >= 80) return "Vocês nasceram um para o outro!";
            if (p >= 60) return "Tem tudo para dar certo!";
            if (p >= 40) return "Pode dar certo, mas precisa de esforço!";
            if (p >= 20) return "Hmm... melhor serem só amigos.";
            return "Não foi dessa vez...";
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

                <p class="erro" v-if="erro">{{ erro }}</p>

                <div class="res" v-if="resApi">
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
    width: 100%;
    height: 100%;
    padding: 15px;
    overflow: hidden;
    background-color: rgb(0, 0, 0, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    z-index: 250;
}

.modal {
    width: 100%;
    display: flex;
    justify-content: center;
}

.inputUser {
    position: relative;
    z-index: 1;
    flex-direction: column;
    justify-content: space-around;

    width: 100%;
    max-width: 400px;
    padding: 50px 30px;
    background-color: white;
    border-radius: 10px;

    background-color: lightcoral;
}

.btnClose {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    cursor: pointer;
}

input {
    padding: 10px;
    border: none;
    width: 100%;
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

.lt1,
.lt2 {
    max-width: 30vw;
}

@media (max-width: 900px) {
    .lt1,
    .lt2 {
        display: none;
    }
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

.erro {
    margin-top: 15px;
    font-weight: 700;
    color: rgb(120, 0, 0);
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