<template>
    <div>
        <div class="container_grid">
            <img :src="item.url" class="img">
            <div class="text">
                <h1>{{item.title}}</h1>
                <div>{{item.explanation}}</div>
                <div>{{item.price+"원"}}</div>
                <div>
                    <input v-model="count" type="number" min="1" >
                    <span>수량</span>
                </div>
                <div>구매수 : {{item.views}}</div>
                <div>
                    <button v-on:click="buy" type="button" class="btn btn-success">구매</button>
                    <button v-on:click="order" type="button" class="btn btn-success">장바구니</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    created(){
        axios.get(this.url+"/item?id="+this.$route.query.id)
            .then((res)=>{
                this.item = res.data
                console.log(res.data)
            })
            .catch(e=>{
                alert(`오류${e}`)
            })
    },
    data() {
        return {
            item:"",
            count:1
        }
    },
    computed:{
        ...mapState(['url']),
        ...mapState(['token'])
    },
    methods:{
        order(){

            axios.post(this.url+"/orderItem",
            {
                "itemId":this.$route.query.id,
                "count":this.count
            },
            { 
                headers: { 
                    "Authorization":this.token.split(':')[1]
                }
            })
            .then(()=>{
                this.$router.push('/order')
            })
            
        },
    }
}
</script>
<style scoped>
.container_grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 100px 20% 0px 20%;
    justify-items: stretch ;
}
.img{
    border-radius: 20px;
}
.text{
    margin: 15px;
}
</style>