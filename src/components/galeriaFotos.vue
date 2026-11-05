<script>
export default {
    props: {
        fotos: { type: Array, default: () => [] },
        cidade: String,
        carregando: Boolean,
        erro: String,
    },
    emits: ['fechar'],
    data() {
        return {
            quebradas: [],
            aberta: null, // índice da foto ampliada
        };
    },
    computed: {
        validas() {
            return this.fotos.filter((f) => !this.quebradas.includes(f));
        },
    },
    methods: {
        fechar() {
            if (this.aberta !== null) {
                this.aberta = null;
                return;
            }
            this.$emit('fechar');
        },
        quebrou(foto) {
            this.quebradas.push(foto);
        },
        abrir(i) {
            this.aberta = i;
        },
        anterior() {
            const total = this.validas.length;
            this.aberta = (this.aberta - 1 + total) % total;
        },
        proxima() {
            const total = this.validas.length;
            this.aberta = (this.aberta + 1) % total;
        },
        teclado(e) {
            if (e.key === 'Escape') this.fechar();
            if (this.aberta === null) return;
            if (e.key === 'ArrowLeft') this.anterior();
            if (e.key === 'ArrowRight') this.proxima();
        },
    },
    mounted() {
        window.addEventListener('keydown', this.teclado);
    },
    unmounted() {
        window.removeEventListener('keydown', this.teclado);
    },
};
</script>

<template>
    <Teleport to="body">
        <transition name="galeria" appear>
            <div class="galeria" @click.self="fechar">
                <header class="topo">
                    <div>
                        <p class="titulo">
                            <span class="material-symbols-outlined">photo_library</span>
                            Fotos de {{ cidade }}
                        </p>
                        <p class="sub" v-if="!carregando && validas.length">
                            {{ validas.length }} fotos · clique para ampliar
                        </p>
                    </div>
                    <button class="fechar" @click="$emit('fechar')" aria-label="Fechar">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </header>

                <p class="aviso" v-if="erro">{{ erro }}</p>

                <div class="grade" v-else-if="carregando">
                    <div class="esqueleto" v-for="n in 6" :key="n"></div>
                </div>

                <div class="grade" v-else>
                    <figure
                        v-for="(foto, i) of validas"
                        :key="foto"
                        class="item"
                        :style="{ animationDelay: i * 60 + 'ms' }"
                        @click="abrir(i)"
                    >
                        <img :src="foto" :alt="'Foto de ' + cidade" loading="lazy" @error="quebrou(foto)" />
                        <span class="zoom material-symbols-outlined">zoom_in</span>
                    </figure>
                </div>

                <!-- FOTO AMPLIADA -->
                <transition name="galeria">
                    <div class="lightbox" v-if="aberta !== null" @click.self="aberta = null">
                        <button class="nav esq" @click="anterior" aria-label="Anterior">
                            <span class="material-symbols-outlined">chevron_left</span>
                        </button>

                        <transition name="troca" mode="out-in">
                            <img :key="validas[aberta]" :src="validas[aberta]" :alt="'Foto de ' + cidade" />
                        </transition>

                        <button class="nav dir" @click="proxima" aria-label="Próxima">
                            <span class="material-symbols-outlined">chevron_right</span>
                        </button>

                        <span class="contador">{{ aberta + 1 }} / {{ validas.length }}</span>
                    </div>
                </transition>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.galeria {
    position: fixed;
    inset: 0;
    z-index: 2000;

    display: flex;
    flex-direction: column;

    overflow-y: auto;
    padding: 0 20px 40px;

    background: rgba(0, 15, 40, 0.94);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: white;
}

/* CABEÇALHO */
.topo {
    position: sticky;
    top: 0;
    z-index: 2;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    flex-shrink: 0;

    background: linear-gradient(180deg, rgba(0, 15, 40, 1) 60%, rgba(0, 15, 40, 0));
}

.titulo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: clamp(1.1rem, 4vw, 1.5rem);
    font-weight: 800;
}

.titulo .material-symbols-outlined {
    color: #8ec5ff;
}

.sub {
    margin-top: 2px;
    font-size: 0.85rem;
    opacity: 0.7;
}

.fechar {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border: none;
    border-radius: 50%;

    background: rgba(255, 255, 255, 0.12);
    color: white;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
}

.fechar:hover {
    background: #0055d9;
    transform: rotate(90deg);
}

/* GRADE (estilo mosaico) */
.grade {
    width: 100%;
    max-width: 1200px;
    /* auto nas 4 direções: centraliza na horizontal e na vertical */
    margin: auto;
    columns: 3 280px;
    column-gap: 16px;
}

.item {
    position: relative;
    margin: 0 0 16px;
    break-inside: avoid;

    overflow: hidden;
    border-radius: 14px;
    cursor: zoom-in;

    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);

    opacity: 0;
    animation: surgir 0.4s ease forwards;
}

.item img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.4s ease, filter 0.4s ease;
}

.item:hover img {
    transform: scale(1.05);
    filter: brightness(0.75);
}

.zoom {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);

    padding: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #0055d9;

    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
}

.item:hover .zoom {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

@keyframes surgir {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* CARREGANDO */
.esqueleto {
    height: 220px;
    margin-bottom: 16px;
    border-radius: 14px;
    break-inside: avoid;

    background: linear-gradient(90deg,
            rgba(255, 255, 255, 0.06) 0%,
            rgba(255, 255, 255, 0.14) 50%,
            rgba(255, 255, 255, 0.06) 100%);
    background-size: 200% 100%;
    animation: brilho 1.2s infinite linear;
}

.esqueleto:nth-child(3n + 2) {
    height: 300px;
}

@keyframes brilho {
    from {
        background-position: 200% 0;
    }

    to {
        background-position: -200% 0;
    }
}

.aviso {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    font-weight: 700;
    background: rgba(240, 128, 128, 0.9);
}

/* FOTO AMPLIADA */
.lightbox {
    position: fixed;
    inset: 0;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 70px;

    background: rgba(0, 0, 0, 0.92);
}

.lightbox img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;

    background: rgba(255, 255, 255, 0.15);
    color: white;
    cursor: pointer;
    transition: background 0.2s;
}

.nav:hover {
    background: #0055d9;
}

.nav .material-symbols-outlined {
    font-size: 32px;
}

.esq {
    left: 12px;
}

.dir {
    right: 12px;
}

.contador {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    opacity: 0.8;
}

/* TRANSIÇÕES */
.galeria-enter-active,
.galeria-leave-active {
    transition: opacity 0.3s ease;
}

.galeria-enter-from,
.galeria-leave-to {
    opacity: 0;
}

.troca-enter-active,
.troca-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.troca-enter-from,
.troca-leave-to {
    opacity: 0;
    transform: scale(0.97);
}

@media (max-width: 600px) {
    .galeria {
        padding: 0 12px 30px;
    }

    .lightbox {
        padding: 60px 10px;
    }

    .nav {
        top: auto;
        bottom: 12px;
        transform: none;
    }

    .contador {
        bottom: 26px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .item {
        animation: none;
        opacity: 1;
    }
}
</style>
