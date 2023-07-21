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
    methods: {
        getImg(icon) {
            return this[icon]
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
    <main @click="showinfos">

        <h1 class="clima"> {{ clima.data }} </h1>

        <div class="temp">
            <h3 class="clima"> Minima: {{ clima.tempmin }} </h3>
            <h3 class="clima"> Máxima: {{ clima.tempmax }} </h3>
        </div>

        <div class="info" v-show="showInfo">
            <h3> <b>{{ clima.descrição }}</b> </h3>
            <br>
            <h3> Nascer do Sol: {{ clima.nascerdosol }} </h3>
            <h3> Pôr do Sol: {{ clima.pordosol }} </h3>
            <h3> Humidade: {{ clima.humidade }} </h3>
            <h3> Precipitação: {{ clima.precipitação }} </h3>
        </div>

        <img :src="getImg(clima.icon)" alt="">
    </main>
</template>

<style scoped>
main {
    width: 350px;
    height: 500px;

    display: flex;
    align-items: center;
    flex-direction: column;

    position: relative;

    z-index: 100;

    margin: 5px;

    color: white;
}

img {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: 100%;

    z-index: -1;
}

.temp {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: end;
    text-align: center;

    height: 100%;
    width: 100%;
}

.info {
    position: absolute;
    background-color: rgb(0, 0, 0, 0.7);
    height: 100%;
    width: 100%;

    font-weight: 100;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.clima{
    background-color: rgb(114, 114, 114, 0.5);
    padding: 10px;
    border-radius: 10px;
}

.info>* {
    font-weight: 400;
}
</style>