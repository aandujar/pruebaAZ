import Vue from 'vue'
import Vuex from 'vuex'
import * as service from "@/service/index.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    userSelected: null,
    loading: false
  },
  getters: {
    isUserLogged: state => {
        return state.user !== null;
    }
},
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setUsers (state, users) {
      state.users = users;
    },
    setUserSelected (state, user) {
      state.userSelected = user;
    },
    setLoading (state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    setUser ({ commit }, user) {
      return new Promise((resolve) => {
        commit('setUser', user);
        resolve();
      });
    },
    getUsers ({ commit }, params) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true);
        service.getUsers(params)
        .then(function (response) {
          commit('setUsers', response.data.results);
          resolve(response.data.results)
      })
      .catch(function (error) {
          commit('setUsers', []);
          reject(error)
      })
      .finally(() => commit('setLoading', false))
      });
    }
  }
})
