import Vue from 'vue'
import Vuex from 'vuex'
import http from './../helpers/http'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sources: [],
    groups: [],
    articles: [],
    module: {}
  },
  getters: {
    sources: (state) => state.sources,
    filteredSources: (state) => {
      return keyword => state.sources.filter((source) => {
        return source.label.match(keyword) || source.label.match(keyword) || source.language.match(keyword)
        || source.country.match(keyword) || source.category.match(keyword)
      })
    },
    groups: (state) => state.groups,
    articles: (state) => state.articles,
    module: (state) => state.module
  },
  mutations: {
    setSources: (state, sources) => {
      state.sources = sources
    },
    setGroups: (state, groups) => {
      state.groups = groups
    },
    setArticles: (state, articles) => {
      state.articles = articles
    }
  },
  actions: {
    getSources: (context) => {
      return new Promise((resolve, reject) => {
        http.get('sources')
          .then (res => {
            context.commit('setSources', res.data.content)
            resolve(res)
          })
          .catch(err => {
            console.log('store getsources err: ', err.response.data.message)
            reject(err)
          })
      })
    },
    getGroups: (context) => {
      return new Promise((resolve, reject) => {
        http.get('groups')
          .then(res => {
            context.commit('setGroups', res.data.content)
            resolve(res)
          })
          .catch(err => {
            console.log('store getgroups err: ', err.response.data.message)
            reject(err)
          })
      })
    },
    getArticles: (context, data) => {
      return new Promise((resolve, reject) => {
        http.post('/requests', data)
          .then(res => {
            context.commit('setArticles', res.data.content)
            resolve(res)
          })
          .catch(err => {
            console.log('store getarticles err: ', err.response.data.message)
            reject(err)
          })
      })
    }
  }
})

export default store