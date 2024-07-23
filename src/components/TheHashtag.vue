<template>
  <span @click="filterByHashtag" :class="{ highlighted: isActive }">
    {{ hashtag }}
  </span>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { Hashtag } from "../types/types";

const props = defineProps<{ hashtag: Hashtag }>();

const store = useStore();

const isActive = computed(
  () => store.getters["hashtag/getActiveHashtag"] === props.hashtag, // '' === #all false
);

console.log("props", props.hashtag);

function filterByHashtag(event: MouseEvent) {
  const target = event.target as HTMLElement;
  store.dispatch("hashtag/setActiveHashtag", target.innerHTML);
  // set filter criteria here: target.innerHTML
  store.dispatch("notes/setFilterTerm", target.innerHTML);
}
</script>

<style scoped>
span {
  display: inline-block;
  margin-left: 0.5rem;
  border: 2px solid black;
  border-radius: 0.2rem;
  padding: 0.2rem 1rem;
  cursor: pointer;
  /* font-weight: bold; */
  font-style: italic;
}

.highlighted {
  background: black;
  color: white;
}
</style>
