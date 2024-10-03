import { createStore } from 'vuex';
import * as auth from '../services/auth';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await auth.login(credentials);
      commit('SET_USER', response.data.user);
    },
    logout({ commit }) {
      auth.logout();
      commit('SET_USER', null);
    },
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
