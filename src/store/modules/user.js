import Vue from 'vue'

function initialState() {
  return {
    user: {},
    email: null,
    registeredUsers: [],
  }
}

const state = initialState();

const actions = {
  //action to get the user email from login page in payload
  async setEmail(context, payload) {
    //set the email to the value stored in payload
    context.commit('set_email',{email: payload}) 
  },

  //action to get details of logged in user
  async getUserDetails(context, payload) {
    context.commit(
      'set_user',
      {
        user: payload
      }
    )
  },
  
  async getUser(context, payload){

    await Vue.http
        .get("https://todolist-937d8.firebaseio.com/registeredusers.json")
        .then(function (data) {
          return data.json();
        })
        .then(function (data) {
          let array = [];
          for (let i in data) {
            array.push(data[i]);
          }
          context.commit('get_user',array)
          
          return array;
        })
        .then(function (data) {
          for (let i in data) {
            if (context.state.email == data[i].email) {
              try {
                context.dispatch("getUserDetails", data[i]);
              } catch {
                // FIXME:: error handle
              }
            }
          }
        });

    
  },

  async logout(context){
    console.log('asdlhfa;kds')
    context.commit('logout')
  }
}

const getters = {
};

const mutations = {
  set_email(state, payload) {
    state.email = payload.email;
  },

  set_user(state, payload) {
    state.user = payload.user;
  },

  get_user(state, payload){
    state.registeredUsers = payload
  },

  logout(state){
    state.user = {}
    state.email = null
    console.log(state.user,state.email)
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};