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
    history: [],
    module: {},
    group: {}
  },
  /**
   * --- GETTERS
   */
  getters: {
    sources: state => state.sources,
    countries: state => state.countries,
    filteredSources: state => {
      return keyword => state.sources.filter(source => {
        return source.label.match(keyword) || source.label.match(keyword) || source.language.match(keyword)
        || source.country.match(keyword) || source.category.match(keyword)
      })
    },
    groups: state => state.groups,
    articles: state => state.articles,
    history: state => state.history,
    module: state => state.module,
    group: state => state.group
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
    setHistory: (state, history) => {
      state.history = history
    },
    setModule: (state, mod) => {
      state.module = mod
    },
    setOneGroup: (state, group) => {
      state.group = group
    }
  },
  /**
   * --- ACTIONS
   */
  actions: {
    /**
     * -- Sources & Countries
     */
    asyncGetSources: context => {
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
    asyncGetCountries: context => {
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
    /**
     * -- Groups
     */
    asyncAddGroup: (context, data) => {
      return new Promise((resolve, reject) => {
        http.post('groups', data)
          .then(res => {
            context.commit('setGroups', res.data.content.groups)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncGetGroups: context => {
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
    asyncGetOneGroup: (context, data) => {
      return new Promise((resolve, reject) => {
        http.get('groups/' + data)
          .then(res => {
            context.commit('setOneGroup', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncRemoveGroup: (context, data) => {
      return new Promise((resolve, reject) => {
        http.delete('groups/' + data)
          .then(res => {
            context.commit('setGroups', res.data.content.groups)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * -- News Request
     */
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
    /**
     * -- Modules
     */
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
    asyncRemoveModule: (context, data) => {
      return new Promise((resolve, reject) => {
        http.delete('modules/' + data.moduleId + '?groupId=' + data.groupId)
          .then(res => {
            context.commit('setGroups', res.data.content.groups.groups)
            context.commit('setOneGroup', res.data.content.group)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * -- History
     */
    asyncGetHistory: context => {
      return new Promise((resolve, reject) => {
        http.get('history')
          .then(res => {
            context.commit('setHistory', res.data.content)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    asyncAddHistory: (context, data) => {
      return new Promise((resolve, reject) => {
        http.post('history', data)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * --- END OF ACTIONS
     */
  }
})

export default store