<template>
  <header>
    <h1>Noty</h1>
    <button @click="openModal">+</button>
  </header>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const route = useRoute();

const store = useStore();

function openModal() {
  store.dispatch("modal/toggleModal", true);
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 75px;
}

button {
  border: none;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 100%;
  background-color: black;
  color: white;
  font-weight: bold;
  transition: all 0.1s linear;
  font-size: 20px;
}

button:hover {
  transform: scale(1.055);
}
</style>
