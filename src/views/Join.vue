
<template>
    <div class="container">
        <div class="row">
            <div class="col-6 join-container">
                <div class="row gap-4">
                    <label for="validationServer01" class="form-label">Email</label>
                    <input type="email" id="userEmail" v-model="user.userEmail" class="form-control input-email" v-bind:class="{ 'is-valid' : eConfirm }" :disabled="eConfirm" :readonly="eConfirm">
                    <button type="button" class="btn btn-secondary btn-email " @click="emailConfirm" :disabled="eConfirm">Confirm</button>
                    <label for="validationServer01" class="form-label" >Password(영문자 숫자 특수문자 모두 사용하여 8~16자)</label>
                    <input type="password" class="form-control" id="userPw" v-model="user.userPw" @keyup="pwValid" v-bind:class="{'is-valid' : userPw_}">
                    <label for="validationServer01" class="form-label">PasswordConfirm</label>
                    <input type="password" class="form-control" id="pwConfirm" v-model="pwConfirm" @keyup="passwordConfirm" v-bind:class="{'is-valid' : pwConfirm_}">
                    <label for="validationServer01" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" v-model="user.name">
                    <div>
                        <div class="form-check">
                            <input class="form-check-input" value="male" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="user.gender" >
                            <label class="form-check-label" for="flexRadioDefault1">
                                male
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" value="female" type="radio" name="flexRadioDefault" id="flexRadioDefault2" v-model="user.gender">
                            <label class="form-check-label" for="flexRadioDefault2">
                                female
                            </label>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success btn-join" @click="join">Success</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            eConfirm:false,
            userPw_:false,
            pwConfirm:"",
            pwConfirm_:false,
            user:{
                userEmail:"",
                userPw:"",
                name:"",
                gender:""
            }
        }
    },
    computed:{
        ...mapState(['url'])
    },
    methods: {
        emailConfirm(){
            var regexpEmail= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            
            if(!regexpEmail.test(this.user.userEmail)){
                alert("이메일 형식을 확인해주세요~~")
                return
            }

            axios.get(this.url+"/userConfirm?userEmail="+this.user.userEmail)
            .then(response=>{
                this.eConfirm = response.data
                
            })
            .catch(e=>{
              alert("이메일이 중복되었습니다. " + e)
            })
        },
        pwValid(){
            var regexpPw= /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/

            if(regexpPw.test(this.user.userPw)){
                this.userPw_ = true
            }
            else{
                this.userPw_ = false
            }
        },
        passwordConfirm(){
            if(this.user.userPw==this.pwConfirm){
                this.pwConfirm_ = true
            }
            else{
                this.pwConfirm_ = false
            }
        },
        join(){
            if(this.eConfirm == false){
                alert("이메일 중복확인을 눌러주세요")
                document.getElementById('userEmail').focus();
            }
            else if(this.userPw_ == false){
                alert("비밀번호 정책에 맞게 입력해주세요")
                document.getElementById('userPw').focus();
            }
            else if(this.pwConfirm_ == false){
                alert("비밀번호를 똑같이 입력해주세요")
                document.getElementById('pwConfirm').focus();
            }
            else if(this.user.name == false){
                alert("이름을 입력해주세요")
                document.getElementById('name').focus();
            }
            else if(!this.user.gender){
                alert("성별을 체크해 주세요")
                document.getElementById('flexRadioDefault1').focus();
            }
            else{
                axios.post(this.url+"/user",this.user)
                .then(()=>{
                    this.$router.push({ name: 'Home'})
                })
            }

        },

    }
}
</script>









<style scoped>
.join-container{
    text-align: center;
    margin: auto;
    padding: 50px 0px 0px 0px;
}

.input-email{
    display:inline-block;
    margin: 0px 10px 0px 0px ;
    
}

.form-control{
    display: inline-block;
}
.form-check{
    display: inline-block;
    margin: 20px;
}
.btn-join{
    margin: auto;
}


</style>>
