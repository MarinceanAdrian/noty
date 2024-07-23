import { createRouter, createWebHistory } from "vue-router";
import EditableNote from "../pages/EditableNote.vue";
import NotesView from "../pages/NotesView.vue";
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/notes",
    },
    {
      path: "/notes",
      component: NotesView,
    },
    {
      path: "/note/:id",
      component: EditableNote,
      props: true,
    },
  ],
});
