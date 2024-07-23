export default {
  toggleModal(state: { isModalOpen: boolean }, payload: boolean) {
    state.isModalOpen = payload;
  },
};
