import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';
import createPersistedState from "vuex-persistedstate";




export default createStore({
  state: {
    user:{
      userEmail : "",
      name : "",
      roles : "ANONYMOUS",//권한 0 Anonymous,1 user,2 admin
      gender : "",
      profile : ""
    },
    token : "",
    url:"http://125.185.128.147:8090",

  },
  mutations: {
    successLogin: function(state, token){
      state.token = token;
    },
    setUserData: function(state, user){
      state.user = user
    },
    resetUserData: function(state){
      state.user.userEmail = ""
      state.user.name = ""
      state.user.roles = "ANONYMOUS"
      state.token = ""
      state.user.profile = ""
    },
      

  },
  actions: {
    login: function ({state,commit },loginObj){
      axios.post(state.url+"/login",loginObj)
      .then(response=>{
        if(response.data.split(':')[0] == 'Unauthenticated'){
          router.push({ name: 'Authorization',query:{userEmail:loginObj.userEmail}})
        }
        else if(response.data.split(':')[0]=="Authorization"){//실패시 초기화하는 거 만들어야함
          commit('successLogin', response.data)
          const config = {
            headers: { "Authorization":response.data.split(':')[1] },
          }
          axios.get(state.url+"/user",config)
          .then(response=>{
            commit('setUserData',response.data)
          })
          .catch(e=>{
            alert(`오류${e}`)
          })
        }
        else{
          alert("아이디 비밀번호를 확인해주세요")
        }
        
      })
      .catch(e=>{
        alert(`오류${e}`)
      })
    },
    logout: function ({commit}){
      commit('resetUserData')
      router.push({ name: 'Home'})
    } 
  },
  modules: {

  },
  plugins: [createPersistedState()],

})
