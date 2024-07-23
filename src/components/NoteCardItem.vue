<template>
  <li class="card" :style="{ backgroundColor: color }">
    <i
      class="fa-regular fa-star"
      @click="toggleFavourite"
      v-if="!props.note.isFavourite"
    ></i>
    <i class="fa-solid fa-star" @click="toggleFavourite" v-else></i>
    <i
      class="fa fa-trash"
      aria-hidden="true"
      @click="deleteNote(props.note.id)"
    ></i>
    <RouterLink
      :to="{
        path: `note/${props.note.id}`,
        query: { text: note.text, color: note.color },
      }"
      class="main-text"
    >
      {{ props.note.text }}
    </RouterLink>
    <div class="actions">
      <p class="date">Created at: {{ props.note.lastUpdate }}.</p>
      <i class="fas fa-edit" @click="editNote(note)"></i>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Note from "../types/types";

const store = useStore();
const router = useRouter();

const props = defineProps<{ note: Note }>();

const color = computed(() => props.note.color);

function toggleFavourite() {
  store.dispatch("notes/toggleFavourite", props.note.id);
}

function editNote(note: Note) {
  router.push({ query: { ...note } });
  store.dispatch("modal/toggleModal", true);
}

function deleteNote(noteId: string) {
  if (confirm("Are you sure you want to delete this current note?")) {
    store.dispatch("notes/deleteNote", +noteId);
  }
}
</script>

<style scoped>
a {
  all: unset;
}
.card {
  width: 225px;
  height: 225px;
  padding: 12px 20px 12px 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.3s linear;
}
.card:hover {
  transform: scale(1.015);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.main-text {
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 70%;
  white-space: pre-line;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fa-trash {
  opacity: 0;
  transition: all 0.3s linear;
  position: absolute;
  transform: translateX(10.5rem);
}

.card:hover .fa-trash {
  opacity: 1;
}

.date {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.9);
  font-style: italic;
}
</style>
