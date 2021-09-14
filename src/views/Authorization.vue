<template>
    <div class="container">
        <div class="row">
            <div class="col-6 align-self-center">
                <input type="email" id="userEmail" v-model="userEmail" class=" form-control input-email ">
                <button class="btn btn-success" @click="sendEmail">전송</button>
            </div>
        </div>
        <div class="row">
            <div class="col-6 align-self-center">
                <input type="text"  v-model="token" class=" form-control input-email ">
                <button class="btn btn-success" @click="authorization">확인</button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
    created(){
        this.userEmail = this.$route.query.userEmail
    },
    data() {
        return {
           userEmail:"",
           token:""
        }
    },
     computed:{
        ...mapState(['url'])
    },
    methods:{
        sendEmail(){
            axios.get(this.url+"/sendMail?userEmail="+this.userEmail)
            .then(()=>{
                alert("이메일이 전송되었습니다.")
            })
            .catch(e=>{
                alert(`오류${e}`)
            })
        },
        authorization(){
            axios.post(this.url+"/emailConfirm",{'token':this.token})
            .then(()=>{
                this.$router.push({ name: 'UserFind'})
            })
        }
    }
}
</script>
<style  scoped>
.col-6{
    margin: 100px auto 0px auto;
    text-align: center;
    
}
.input-email{
    display: inline-block;
    margin: 0px 20px 0px 0px;
    width: 50%;
    
}
</style>>

