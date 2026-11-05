<script>

import snow from '@/icons/snow.png';
import rain from '@/icons/rain.png';
import fog from '@/icons/fog.png';
import wind from '@/icons/wind.png';
import cloudy from '@/icons/cloudy.png';
import partlycloudyday from '@/icons/partlycloudyday.png';
import partlycloudynight from '@/icons/partlycloudynight.png';
import clearday from '@/icons/clearday.png';
import clearnight from '@/icons/clearnight.png';

const DIAS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default {
    data() {
        return {
            snow,
            rain,
            fog,
            wind,
            cloudy,
            partlycloudyday,
            partlycloudynight,
            clearday,
            clearnight,

            showInfo: false,
        }
    },
    computed: {
        partesData() {
            // aceita "05.11.2026" ou "05-11-2026"
            const [dia, mes, ano] = String(this.clima.data).split(/[.-]/).map(Number);
            return { dia, mes, ano };
        },
        diaSemana() {
            const { dia, mes, ano } = this.partesData;
            const data = new Date(ano, mes - 1, dia);
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            if (data.getTime() === hoje.getTime()) return 'Hoje';
            return DIAS[data.getDay()];
        },
        dataCurta() {
            const { dia, mes } = this.partesData;
            return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`;
        },
        condicao() {
            return String(this.clima.condição || '').split(',')[0];
        },
    },
    methods: {
        getImg(icon) {
            if (this[icon]) return this[icon];
            if (String(icon).includes('rain') || String(icon).includes('showers') || String(icon).includes('thunder')) return this.rain;
            if (String(icon).includes('snow')) return this.snow;
            return this.cloudy;
        },
        hora(valor) {
            return valor ? String(valor).slice(0, 5) : '--';
        },
        showinfos() {
            this.showInfo = !this.showInfo
        }
    },
    props: {
        clima: Object
    }
}
</script>

<template>
    <div class="cena" @click="showinfos" :title="showInfo ? 'Clique para voltar' : 'Clique para ver detalhes'">
        <div class="card" :class="{ virado: showInfo }">

            <!-- FRENTE -->
            <div class="face frente">
                <img class="fundo" :src="getImg(clima.icon)" alt="">
                <div class="overlay"></div>

                <header class="topo">
                    <div>
                        <span class="dia">{{ diaSemana }}</span>
                        <span class="data">{{ dataCurta }}</span>
                    </div>
                    <span class="selo">
                        <span class="material-symbols-outlined">360</span>
                    </span>
                </header>

                <section class="centro">
                    <p class="media">{{ clima.tempmedia }}</p>
                    <p class="condicao">{{ condicao }}</p>
                </section>

                <footer class="rodape">
                    <div class="faixa">
                        <span class="material-symbols-outlined">arrow_downward</span>
                        <span>{{ clima.tempmin }}</span>
                    </div>
                    <div class="divisor"></div>
                    <div class="faixa">
                        <span class="material-symbols-outlined">arrow_upward</span>
                        <span>{{ clima.tempmax }}</span>
                    </div>
                </footer>

                <span class="dica">
                    <span class="material-symbols-outlined">touch_app</span>
                    Clique para virar
                </span>
            </div>

            <!-- VERSO -->
            <div class="face verso">
                <img class="fundo" :src="getImg(clima.icon)" alt="">
                <div class="overlay escuro"></div>

                <header class="topo">
                    <div>
                        <span class="dia">{{ diaSemana }}</span>
                        <span class="data">{{ dataCurta }}</span>
                    </div>
                    <span class="selo">
                        <span class="material-symbols-outlined">undo</span>
                    </span>
                </header>

                <p class="descricao">{{ clima.descrição }}</p>

                <ul>
                    <li>
                        <span class="material-symbols-outlined">wb_twilight</span>
                        <span>Nascer do sol</span>
                        <b>{{ hora(clima.nascerdosol) }}</b>
                    </li>
                    <li>
                        <span class="material-symbols-outlined">wb_sunny</span>
                        <span>Pôr do sol</span>
                        <b>{{ hora(clima.pordosol) }}</b>
                    </li>
                    <li>
                        <span class="material-symbols-outlined">humidity_percentage</span>
                        <span>Umidade</span>
                        <b>{{ clima.humidade }}</b>
                    </li>
                    <li>
                        <span class="material-symbols-outlined">rainy</span>
                        <span>Precipitação</span>
                        <b>{{ clima.precipitação }}</b>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* ESTRUTURA DO FLIP */
.cena {
    height: 400px;
    margin: 8px;
    perspective: 1200px;
    cursor: pointer;
}

.card {
    position: relative;
    width: 100%;
    height: 100%;

    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

/* dica de que o card gira: inclina um pouco ao passar o mouse */
.cena:hover .card {
    transform: rotateY(-14deg) translateY(-6px);
}

.card.virado {
    transform: rotateY(180deg);
}

.cena:hover .card.virado {
    transform: rotateY(194deg) translateY(-6px);
}

.face {
    position: absolute;
    inset: 0;
    overflow: hidden;

    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-radius: 20px;
    color: white;

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
    transition: box-shadow 0.3s ease;
    isolation: isolate;
}

.cena:hover .face {
    box-shadow: 0 18px 35px rgba(0, 45, 114, 0.35);
}

.verso {
    transform: rotateY(180deg);
    justify-content: flex-start;
    gap: 16px;
}

.fundo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
}

.overlay {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(180deg,
            rgba(0, 20, 60, 0.55) 0%,
            rgba(0, 0, 0, 0.05) 40%,
            rgba(0, 0, 0, 0.1) 55%,
            rgba(0, 20, 60, 0.85) 100%);
}

.overlay.escuro {
    background: rgba(0, 25, 70, 0.9);
}

/* TOPO */
.topo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.topo > div {
    display: flex;
    flex-direction: column;
}

.dia {
    font-size: 1.4rem;
    font-weight: 800;
    letter-spacing: 0.5px;
}

.data {
    font-size: 0.9rem;
    opacity: 0.85;
}

/* selo de "virar" no canto */
.selo {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 34px;
    height: 34px;
    border-radius: 50%;

    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.35);
    transition: background 0.3s, transform 0.6s;
}

.selo .material-symbols-outlined {
    font-size: 20px;
}

.cena:hover .selo {
    background: #0055d9;
    transform: rotate(360deg);
}

/* CENTRO */
.centro {
    text-align: center;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.media {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
}

.condicao {
    margin-top: 6px;
    font-size: 0.95rem;
    text-transform: capitalize;
}

/* RODAPÉ */
.rodape {
    display: flex;
    align-items: center;
    justify-content: space-around;

    padding: 12px 10px;
    border-radius: 14px;

    background: rgba(0, 20, 60, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.25);
    transition: opacity 0.3s;
}

.faixa {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
    font-size: 1.05rem;
}

.faixa .material-symbols-outlined {
    font-size: 20px;
}

.faixa:first-child .material-symbols-outlined {
    color: #8ec5ff;
}

.faixa:last-child .material-symbols-outlined {
    color: #ffb38a;
}

.divisor {
    width: 1px;
    height: 24px;
    background: rgba(255, 255, 255, 0.35);
}

/* "Clique para virar" aparece no hover, no lugar da faixa min/max */
.dica {
    position: absolute;
    left: 50%;
    bottom: 26px;

    display: flex;
    align-items: center;
    gap: 6px;

    padding: 8px 14px;
    border-radius: 999px;

    background: white;
    color: #0055d9;
    font-size: 0.8rem;
    font-weight: 700;
    white-space: nowrap;

    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);

    opacity: 0;
    transform: translate(-50%, 10px);
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
}

.dica .material-symbols-outlined {
    font-size: 18px;
}

.cena:hover .dica {
    opacity: 1;
    transform: translate(-50%, 0);
}

.cena:hover .frente .rodape {
    opacity: 0;
}

/* VERSO */
.descricao {
    font-size: 0.9rem;
    line-height: 1.4;
}

.verso ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
}

.verso li {
    display: grid;
    grid-template-columns: 24px 1fr auto;
    align-items: center;
    gap: 8px;

    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    font-size: 0.9rem;
}

.verso li .material-symbols-outlined {
    font-size: 20px;
    color: #8ec5ff;
}

/* em telas de toque não há hover: deixa o selo sempre destacado */
@media (hover: none) {
    .selo {
        background: #0055d9;
    }
}

@media (prefers-reduced-motion: reduce) {
    .card,
    .selo {
        transition: none;
    }
}
</style>