<template>
  <ul class="notes-list">
    <NoteCardItem v-for="note in notes" :note="note" />
  </ul>
</template>

<script setup lang="ts">
import NoteCardItem from "./NoteCardItem.vue";
import { Note } from "../types/types";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const filteredHashtag = computed(() => store.getters["notes/getFilterHashtag"]);

const notes = computed(() => {
  return store.getters["notes/getNotes"].filter((note: Note) => {
    if (filteredHashtag.value === "#all") {
      return note;
    } else if (filteredHashtag.value === "#favs") {
      return note.isFavourite;
    } else {
      return note.hashtag.includes(filteredHashtag.value);
    }
  });
});
</script>

<style scoped>
.notes-list {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  flex-wrap: wrap;
}
</style>
