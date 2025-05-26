

<template>
  <Agregar @medicamento-agregado="actualizar"/>
  <Listado ref="medicamento"/>
</template>
<script setup>
import Listado from './components/Listado.vue'
import Agregar from './components/Agregar.vue'
import {ref} from 'vue';

const medicamento=ref(null);
const actualizar=()=>{
  medicamento.value?.TablaMedicamento();
}
</script>
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
