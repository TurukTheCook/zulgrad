import Vue from 'vue'
import Vuex from 'vuex'
import http from './../helpers/http'

Vue.use(Vuex)

const store = new Vuex.Store({
  /**
   * --- STATE
   */
  state: {
    sources: [],
    countries: [],
    groups: [],
    articles: [],
    module: {}
  },
  /**
   * --- GETTERS
   */
  getters: {
    sources: (state) => state.sources,
    countries: (state) => state.countries,
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
  /**
   * --- MUTATIONS
   */
  mutations: {
    setSources: (state, sources) => {
      state.sources = sources
    },
    setCountries: (state, countries) => {
      state.countries = countries
    },
    setGroups: (state, groups) => {
      state.groups = groups
    },
    setArticles: (state, articles) => {
      state.articles = articles
    },
    setModule: (state, mod) => {
      state.module = mod
    }
  },
  /**
   * --- ACTIONS
   */
  actions: {
    asyncGetSources: (context) => {
      return new Promise((resolve, reject) => {
        http.get('sources')
          .then (res => {
            context.commit('setSources', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncGetCountries: (context) => {
      return new Promise((resolve, reject) => {
        http.get('countries')
          .then (res => {
            context.commit('setCountries', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncGetGroups: (context) => {
      return new Promise((resolve, reject) => {
        http.get('groups')
          .then(res => {
            context.commit('setGroups', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncNewsRequest: (context, data) => {
      return new Promise((resolve, reject) => {
        http.post('requests', data)
          .then(res => {
            context.commit('setArticles', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncAddModule: (context, data) => {
      return new Promise((resolve, reject) => {
        http.post('modules', data)
          .then(res => {
            context.commit('setGroups', res.data.content.groups)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncGetModule: (context, data) => {
      return new Promise((resolve, reject) => {
        http.get('modules/' + data)
          .then(res => {
            context.commit('setModule', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})

export default store