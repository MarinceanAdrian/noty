<template>
  <BaseDialog
    :existingText="existingText"
    @clear-existing-text="existingText = ''"
  >
    <template #add-note="{ existingText }">
      <CreateNewNote
        :existingText="existingText"
        @check-existing-text="checkExistingText"
      ></CreateNewNote>
    </template>
  </BaseDialog>
  <main>
    <TheHeader />
    <div class="container">
      <FilterNotes />
      <div class="cards-container">
        <NotesCardList v-if="hasNotes" />
        <h4 v-else>You have 0 notes. Please add one from the plus button</h4>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import CreateNewNote from "../components/CreateNewNote.vue";
import NotesCardList from "../components/NotesCardList.vue";
import FilterNotes from "../components/FilterNotes.vue";
import TheHeader from "../components/layout/TheHeader.vue";
import { ref, Ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const existingText: Ref<string | undefined> = ref("");

const hasNotes = computed(() => store.getters["notes/hasNotes"]);

function checkExistingText(payload: string) {
  existingText.value = payload;
}

onMounted(async () => {
  // clear the query params on realod
  router.replace("/notes");
  await store.dispatch("notes/setNotes");
});
</script>

<style scoped>
main {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
}

h4 {
  text-align: center;
}
</style>
