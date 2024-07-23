import { Note } from "../../types/types";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      notes: [] as Note[],
      filterTerm: "#all",
    };
  },
  getters,
  mutations,
  actions,
};
