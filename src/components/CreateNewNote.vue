<template>
  <textarea
    name="note"
    id="note"
    rows="14"
    v-model="newNoteText.val"
    :class="{ invalid: !newNoteText.isValid }"
    @input="newNoteText.isValid = true"
    @change="populateExistingText"
  ></textarea>
  <p v-if="!newNoteText.isValid" class="error-text">
    Note text can not be empty. Please provide some text to continue.
  </p>
  <button class="btn" @click="addNote">Add Note</button>
  <fieldset>
    <legend>Provide a hashtag</legend>
    <div class="form-control">
      <label for="hash">Hashtag: </label>
      <input type="text" v-model="hashtag" class="input" placeholder="#work" />
    </div>
  </fieldset>
  <fieldset id="last">
    <legend>Pick your Note color</legend>
    <div class="form-control">
      <label for="color-picker">Note background color:</label>
      <input
        type="color"
        value="#ff0000"
        id="color-picker"
        v-model="choosedColor"
      />
    </div>
    <div class="form-control">
      <p>
        Or provide your favourite HEX value:
        <input
          type="text"
          class="input"
          v-model="favColor"
          :style="{ background: favColor }"
          title="By providing a color here, it will be used as the main color"
        />
      </p>
    </div>
    <p>
      Reset all values:
      <button id="reset" title="Reset color" @click="resetColors">
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </button>
    </p>
  </fieldset>
  <button v-if="isExisting" class="btn btn-error" @click="deleteNote">
    Delete Note
  </button>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

let timer;

const store = useStore();
const route = useRoute();
const router = useRouter();

const color = computed(() => {
  return favColor.value ? favColor.value : choosedColor.value;
});

// state
const newNoteText: Ref<{ val: string; isValid: boolean }> = ref({
  val: null,
  isValid: true,
});
const choosedColor: Ref<string> = ref("#487748");
const favColor: Ref<string> = ref("");
const hashtag: Ref<string> = ref("");
const isExisting: Ref<boolean> = ref(false);

const emits = defineEmits<{
  (e: "check-existing-text", payload: string | undefined);
}>();

function resetColors() {
  choosedColor.value = "#487748";
  favColor.value = "";
}

function clearFields() {
  // clear fields
  newNoteText.value.val = "";
  hashtag.value = "";
}

async function addNote() {
  // Basic validation
  if (newNoteText.value.val === null || newNoteText.value.val === "") {
    newNoteText.value.isValid = false;
    return;
  }

  // Edit state
  if (Object.keys(route.query).length > 0) {
    const updatedNote = {
      id: route.query.id,
      hashtag: hashtag.value,
      color: choosedColor.value,
      favColor: route.query.favColor && favColor.value,
      lastUpdate: route.query.lastUpdate,
      text: newNoteText.value.val,
    };

    store.dispatch("notes/editNote", updatedNote);
    store.dispatch("modal/toggleModal", false);
    router.replace("/notes");
    clearFields();
    return;
  }

  // New note case
  const newNote = {
    id: new Date().getTime(),
    hashtag: hashtag.value,
    color: color.value,
    lastUpdate: new Date().toDateString(),
    isFavourite: false,
    text: newNoteText.value.val,
  };

  // store.dispatch("notes/registerNotes", newNote);
  store.dispatch("notes/createNote", newNote);
  store.dispatch("modal/toggleModal", false);
  clearFields();
}

function populateExistingText() {
  emits("check-existing-text", newNoteText.value.val);
}

function deleteNote() {
  if (confirm("Are you sure you want to delete this existing note?")) {
    store.dispatch("notes/deleteNote", +route.query.id);
    store.dispatch("modal/toggleModal", false);
    router.replace("/notes");
  }
}

onMounted(() => {
  timer = setTimeout(() => {
    if (Object.keys(route.query).length > 0) {
      newNoteText.value.val = route.query.text;
      choosedColor.value = route.query.color;
      favColor.value = route.query.favColor;
      hashtag.value = route.query.hashtag;
      isExisting.value = true;
    }
    clearTimeout(timer);
  }, 500);
});
</script>

<style scoped>
textarea {
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 0.2rem;
  margin-bottom: 0.2rem;
  width: 100%;
}
.form-control {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.form-control input {
  border-radius: 0.2rem;
}

fieldset {
  border: 1px solid lightgray;
  border-radius: 0.2rem;
  margin-bottom: 1.2rem;
  padding: 0.5rem;
}

#last {
  margin-bottom: 0;
}

#reset {
  all: unset;
  display: inline-block;
  color: black;
  padding: 4px;
  border: 2px solid black;
  border-radius: 100%;
  cursor: pointer;
}

legend {
  font-weight: bold;
}

#color-picker {
  border: none;
  background-color: transparent;
  width: 4rem;
  height: 2rem;
}

.input {
  width: 4rem;
  border: 1px solid #ccc;
  height: 1.5rem;
}

.invalid {
  border: 1px solid red;
  background-color: #ffbfbf;
  outline: none;
}

.error-text {
  color: red;
  font-size: 0.9rem;
}
</style>
