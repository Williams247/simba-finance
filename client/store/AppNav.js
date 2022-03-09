export const state = () => ({
    isOpen: false
  });
  
  export const mutations = {
    SET_OPEN_CLOSE: (state, payload) => {
      state.isOpen = payload
    }
  };
  
  export const actions = {
    setOpenClose({ commit }, payload) {
      commit("SET_OPEN_CLOSE", payload)
    }
  };
  
  export const getters = {
    opened: state => state.isOpen
  };
  