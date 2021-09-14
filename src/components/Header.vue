<template>
    <div >
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">Asocream</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <!-- <li class="nav-item" >
                            <a class="nav-link active" href="/timeSale">TimeSale</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/best">Best</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/new">New</a>
                        </li> -->
                        <li class="nav-item dropdown" v-for="item in categoryAndKind" :key="item">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">{{item.categoryVo.name}}</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li v-for="item2 in item.kindVos" :key="item2">
                                    <a class="dropdown-item" :href="`/items?kind=${item2.kindId}`">{{item2.name}}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="search">
                        <button class="btn btn-outline-light" type="submit">Search</button> -->
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-light login" data-bs-toggle="modal" v-if="user.roles=='ANONYMOUS'" data-bs-target="#staticBackdrop">
                            Login
                        </button>
                        <div class="dropdown" v-if="user.roles=='USER'||user.roles=='admin'">
                            
                            <button class="btn btn-outline-light login" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                My
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><router-link class="dropdown-item" to="/profile">ProFile</router-link></li>
                                <li><a class="dropdown-item"  @click="logout">Logout</a></li>
                                <li><router-link class="dropdown-item" to="/orderHistory">Order History</router-link></li>
                                
                            </ul>
                        </div>
                    </form>
                </div>      
            </div>
        </nav>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Login</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" v-model="userEmail" class="form-control" id="inputEmail3">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" v-model="userPw" class="form-control" id="inputPassword3">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-group col-12 mx-auto gap-2">
                            <button type="button" class="btn btn-outline-primary" @click="find" data-bs-dismiss="modal">find</button>
                            <button type="button" @click="join" data-bs-dismiss="modal" class="btn btn-outline-warning">join</button>
                        </div>
                        
                        <div class="d-grid gap-2 col-12 mx-auto">
                            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal" @click="login_(userEmail,userPw)">login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { mapActions,mapState} from 'vuex'
import axios from 'axios'

export default {
    created: function () {
        axios.get(this.url+"/categoryAndKind")
        .then((res)=>{
            this.categoryAndKind = res.data
        })
    },
    data() {
        return {
           authority:0,//0 Anonymous,1 user,2 admin
           search:"",
           userEmail:"",
           userPw:"",
           categoryAndKind:"",
        }
    },
    computed:{
        ...mapState(['user']),
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['login']),
        ...mapActions(['logout']),
        login_(userEmail,userPw){
            this.login({userEmail,userPw})
        },
        join(){
            this.$router.push({ name: 'Join'})
        },
        find(){
            this.$router.push({ name: 'UserFind'})
        }
    },
}
</script>


<style scoped>
    .login{
        margin: 0px 0px 0px 6px;
    }
    .navbar{
        padding: 0px 100px 0px 100px ;

    }
    img{
        widows: 20px;
        height: 20px;
    }
</style>



