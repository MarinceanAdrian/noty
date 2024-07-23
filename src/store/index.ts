import { createStore } from "vuex";
import notesModule from "./notes/index";
import modalModule from "./modal/index";
import hashtagsModule from "./hashtags/index";
export default createStore({
  modules: {
    notes: notesModule,
    modal: modalModule,
    hashtag: hashtagsModule,
  },
});
