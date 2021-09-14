<template>
    <div>
        <div class="container_grid" v-for="item in orders" :key="item">
            <div class="grid" v-for="item2 in item.orderItemResponses" :key="item2">
                <img :src="item2.itemResponse.url">
                <div>
                    <div>상품 : {{item2.itemResponse.title}}</div>
                    <div>갯수 : {{item2.count}}</div>
                    <div>가격 : {{item2.itemResponse.price}}</div>
                    <div>합계 : {{item2.sumPrice}}</div>
                </div>
            </div>
            <div>주소 :{{item.address.shortAddress+item.address.detailedAddress}}</div>
            <div>우편번호 : {{item.address.zipcode}}</div>
            <div>상태 : {{item.orderState}}</div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
    created() {
         axios.get(this.url+"/orders",
            { 
                headers: { 
                    "Authorization":this.token.split(':')[1]
                }
            })
            .then(res=>{
                this.orders = res.data
                console.log(res.data)
            })
        
    },
    methods: {
        
    },
    data() {
        return {
            orders:""
        }
    },
    computed:{
        ...mapState(['url']),
        ...mapState(['token'])
    },
}
</script>
<style scoped>
.container_grid{
    display: grid;
    grid-template-columns: 1fr;
    margin: 100px 10% 0px 10%;
}
img{
    width: 80px;
    height: 100px;
}
.grid{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
   