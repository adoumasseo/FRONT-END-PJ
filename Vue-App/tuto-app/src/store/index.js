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
      try {
        const response = await auth.login(credentials);
        commit('SET_USER', response.data.user);
      } catch (err) {
        throw new Error('Login failed');
        console.log(err);
        
      }

    },
    async register({ commit }, data) {
      try {
        const response = await auth.register(data);
        commit('SET_USER', response.data.user);
      } catch (err) {
        throw new Error('Registration failed');
        console.log(err);
      }
    },
    logout({ commit }) {
      auth.logout();
      commit('SET_USER', null);
      router.push('/');
    },
  },
  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
