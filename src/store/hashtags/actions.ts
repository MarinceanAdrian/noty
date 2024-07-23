export default {
  setActiveHashtag(context, payload: string) {
    return context.commit("setActiveHashtag", payload);
  },
};
