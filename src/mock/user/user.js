export default {
    namespaced: true,
    state: {
      userList: [],
    },
    getters: {
        userList: state => {
            return state.userList
        }
    
    },
    mutations: {
      setUser (state, user) {
        state.userList = userList
      },
    }
    
  }
  