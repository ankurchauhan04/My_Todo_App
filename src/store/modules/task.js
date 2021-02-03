import Vue from 'vue'
import { db } from "@/main";

const state = {
    taskArray: [],
    username: null,
};

const actions = {
    async getTasks(context, payload){
        context.commit('setUsername',payload)
        // var userName = payload
        await Vue.http.get(`https://todolist-937d8.firebaseio.com/tasks/${context.state.username}.json`)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                context.commit('get_task',data)
                // state.taskArray = data ? data : [];
              
              
            });
        
    },

    async edit_task(context, payload){
        await db.ref(`/tasks/${context.state.username}`).child(payload['index']).update(payload['newData']);
        
    },

    async clearAll(context){
        db.ref(`/tasks`).child(context.state.username).remove();
    },

    async logout(context){
        context.commit('logout')
    }
};

const getters = {
 getTask: (state) => {
     return state.taskArray
 }
};

const mutations = {
    get_task(state, payload){
        state.taskArray = payload ? payload : [];
    },
    setUsername(state, payload){
        console.log(payload)
        state.username = payload
        console.log(state.username)
    },
    logout(state){
        state.taskArray = []
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
  };