<template>
    <div class="container">
        <div class="row">
            <div class="card col-12" style="width: 30rem;">
                <img src="http://125.185.128.147/profile/common/default.jpg" class="card-img-top" alt="">
                <div class="card-body">
                    <div>이메일:{{user.userEmail}}</div>
                    <div>이름:{{user.name}}</div>
                    <div>성별:{{user.gender}}</div>
                    <router-link class="navbar-brand" to="/pwchange">비밀번호변경</router-link>
                    <input type="file" id="profile">
                    <button @click="profileChange">사진 변경</button> 
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    created(){
        console.log(this.user)
    },
    data() {
        return {
           
        }
    },
    computed:{
        ...mapState(['user']),
        ...mapState(['url']),
        ...mapState(['token'])
    },
    methods: {
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        profileChange(){
            var frm = new FormData()
            var profile = document.getElementById("profile")
            frm.append("profile", profile.files[0])

            axios.patch(this.url+"/profile?uuid="+this.uuidv4(),frm,{ 
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    "Authorization":this.token.split(':')[1]
                }
            })
            .then()
        }
    },
}
</script>

<style  scoped>
    .col-12{
        margin: 100px auto 0px auto;
        text-align: center;  
    }
    .filebox label { 
        display: inline-block; 
        padding: .5em .75em; 
        color: #ffff; font-size: inherit; 
        line-height: normal; 
        vertical-align: middle; 
        background-color: #337ab7; 
        cursor: pointer; 
        border: 1px solid #2e6da4;
         border-bottom-color: #2e6da4; 
         border-radius: .25em; 
    } 
    .filebox input[type="file"] { /* 파일 필드 숨기기 */ 
        position: absolute; 
        width: 1px; 
        height: 1px; 
        padding: 0; 
        margin: -1px; 
        overflow: hidden; 
        clip:rect(0,0,0,0); 
        border: 0; 
    }
    .card-body>div{
        margin: 8px;
    }

</style>>
