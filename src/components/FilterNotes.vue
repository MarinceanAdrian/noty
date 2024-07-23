<template>
  <div>
    <TheHashtag
      v-if="(notes.length > 0 && !hashedNotes) || notes.length >= 2"
      hashtag="#all"
    ></TheHashtag>
    <TheHashtag v-if="favNotes" hashtag="#favs"></TheHashtag>
    <TheHashtag
      v-for="hashtag in hashtags"
      :key="hashtag"
      :hashtag="hashtag"
    ></TheHashtag>
  </div>
  <hr />
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import TheHashtag from "./TheHashtag.vue";
import { Note } from "../types/types";

const store = useStore();

// We can write a note without a hashtag.
// So we prevent adding an empty hashtag to the filter list
const hashtags = computed(() =>
  store.getters["notes/getHashtags"].filter(
    (hashtag: string) => hashtag && hashtag !== "" && true,
  ),
);

// get the notes length array to determine if we show some tags or not
const notes = computed(() => store.getters["notes/getNotes"]);
const favNotes = computed(() =>
  store.getters["notes/getNotes"].some((note: Note) => note.isFavourite),
);
const hashedNotes = computed(() =>
  store.getters["notes/getNotes"].some((note: Note) => note.hashtag),
);
</script>

<style scoped>
div {
  margin-bottom: 1rem;
}
hr {
  font-weight: bold;
  margin-bottom: 1.5rem;
}
</style>
