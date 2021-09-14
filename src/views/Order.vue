<template>
    <div>
        <div class="container_grid" v-for="item in order.orderItemResponses" :key="item">
            <img :src="item.itemResponse.url">
            <span>
                <div><h1>{{item.itemResponse.title}}</h1></div>
                <div>{{"개당:"+item.itemResponse.price+"원"}}</div>
                <div>{{"갯수:"+item.count}}</div>
                <div>{{"합계:"+item.sumPrice}}</div>
                <button type="button" class="btn btn-primary" v-on:click="del(item.id)">삭제</button>
            </span>
        </div>
        <button type="button" class="btn btn-primary" v-on:click="buy">구매하기</button>
    </div>
</template>
   
<script>
import axios from 'axios'
import {mapState} from 'vuex'


export default {
    created() {
         axios.get(this.url+"/order",
            { 
                headers: { 
                    "Authorization":this.token.split(':')[1]
                }
            })
            .then((res)=>{
                this.order = res.data
                console.log(res.data)   
            })
            .catch(e=>{
                alert(`오류${e}`)
            })
    },
    data() {
        return {
            order:""
        }
    },
    computed:{
        ...mapState(['url']),
        ...mapState(['token']),
    },
    methods: {
        del(id){
            axios.delete(this.url+"/orderItem?orderItemId="+id)
            .then(()=>{
                this.$router.go();
            })
        },
        buy(){
            this.$router.push('/buy')
        }
    },
}
</script>
<style scoped>
.container_grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 50px;
    width: 80%;
}

</style>