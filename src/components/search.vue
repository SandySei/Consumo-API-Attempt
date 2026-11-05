<script>
export default {
  props: {
    filteredCidades: Object,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <main class="content" :id="filteredCidades.nome">

    <div class="cidade" :id="filteredCidades.nome">{{ filteredCidades.nome }}</div>
    <div class="estado" :id="filteredCidades.nome">
      {{ filteredCidades.estado }} / {{ filteredCidades.UF }}
    </div>

  </main>
</template>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 10px;

  width: 100%;
  min-height: 55px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: left;

  padding-left: 15px;
  padding-right: 15px;

  background-color:rgb(238, 238, 238) !important;
  box-shadow: 1px 1px 3px lightgray;

  cursor: pointer;
  border-left: 4px solid transparent;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.content:hover {
  background-color: #ffffff !important;
  border-left-color: #0055d9;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.content:hover .cidade {
  color: #0055d9;
  font-weight: 700;
}

.cidade,
.estado {
  pointer-events: none;
}

.estado{
 font-size: 0.75rem;
 text-align: right;
}

</style>
