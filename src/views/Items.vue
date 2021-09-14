<template>
    <div class="container_grid">
        <router-link v-for="item in items" :key="item" :to="`/detail?id=${item.id}`">
            <div class="card" >
                <img :src="item.url">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">{{item.title}}</li>
                    <li class="list-group-item">{{item.price+"원"}}</li>
                </ul>
            </div>
        </router-link>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    
    created(){
        this.items = ""
        axios.get(this.url+"/itemByCategory?id="+this.$route.query.kind)
            .then((res)=>{
                this.items = res.data
            })
            .catch(e=>{
                alert(`오류${e}`)
            })
    },
    data() {
        return {
            items:""
        }
    },
    computed:{
        ...mapState(['url'])
    },
    methods:{
    
    }
}
</script>
<style scoped>
.container_grid{
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 50px;
}
.card{
    margin: 15px;
}
.list-group-item{
    text-align: center;
}
</style>