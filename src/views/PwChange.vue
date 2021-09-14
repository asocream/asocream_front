<template>
    <div class="container">
        <div class="row">
            <div class="col-6" >
                <div class="input-group">
                    <span class="input-group-text">now password</span>
                    <input type="text" v-model="nowPw" aria-label="First name" class="form-control">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6" >
                <div class="input-group">
                    <span class="input-group-text">new password</span>
                    <input type="text" v-model="newPw" aria-label="First name" class="form-control">
                </div>
            </div>
        </div>
        <div class="d-grid col-6 mx-auto">
            <button class="btn btn-primary" type="button" @click="pwChange">바꾸기</button>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return{
            nowPw:"",
            newPw:"",

        }  
    },
    computed:{
        ...mapState(['url']),
        ...mapState(['token'])
    },
    methods: {
        pwChange(){
            console.log(this.url+'/user')
            console.log(this.nowPw)
            console.log(this.token.split(':')[1])
            axios({
                method: 'patch',
                url: this.url+'/user',
                data: { userPw:this.nowPw, newPw:this.newPw },
                headers: { "Authorization":this.token.split(':')[1] },
            })
            .then(()=>{
                alert("비밀번호가 변경되었습니다.")
                this.$router.push({ name: 'Home'})
            })
        }
    },

}
</script>


<style scoped>
    .col-6{
        margin: 100px auto 0px auto;
        text-align: center;  
    }
    

</style>>
