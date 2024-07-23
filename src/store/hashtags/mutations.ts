export default {
  setActiveHashtag(state: { activeHashtag: string }, payload: string) {
    return (state.activeHashtag = payload);
  },
};
