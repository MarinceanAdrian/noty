<template>
  <div>
    <div class="overlay" @click="closeModal" v-if="isModalOpen"></div>
    <Transition name="dialog">
      <!-- v-show is preferable, it is SEO friendly since the markup is present in the DOM.
      However, having v-show a component, when is toggled, keeps its state as it not 
      fully re-rendered in the DOM. So if we want a C to start with a clean state, use v-if -->
      <div class="modal" v-if="isModalOpen">
        <slot name="add-note" :existingText="props.existingText"> </slot>
        <!-- We want this button here no matter what content is rendered -->
        <i
          class="fa fa-window-close"
          aria-hidden="true"
          @click="closeModal"
        ></i>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const emits = defineEmits<{ (e: "clear-existing-text") }>();

const isModalOpen = computed(() => store.getters["modal/isModalOpen"]);
const props = defineProps<{ existingText: string | null }>();

function closeModal() {
  router.replace("/notes");
  // if (props.existingText && props.existingText !== "") {
  //   if (confirm("You have unsaved changed. Proceed to closing note anyways?")) {
  //     store.dispatch("modal/toggleModal", false);
  //     emits("clear-existing-text");
  //   }
  //   return;
  // }
  store.dispatch("modal/toggleModal", false);
}
</script>

<style scoped>
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 750px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.fa-window-close {
  color: crimson;
  position: absolute;
  top: 0.2rem;
  border-radius: 100%;
  font-size: 1.5rem;
  cursor: pointer;
  right: 0.2rem;
  transform: translateX(10px);
  opacity: 0;
  transition: all 0.2s linear;
}

.modal:hover .fa-window-close {
  opacity: 1;
  transform: translateX(0);
}

/* Transition */
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
  transform: translate(-50%, -45%);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
  transform: translate(-50%, -45%);
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
  transform: translate(-50%, -45%);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
  transform: translate(-50%, -50%);
}
</style>
