<template>
    <div class="layout">
        <div>中:{{roll}}</div>
        <div>次:{{t}}</div>
        <div>余额:{{m}}</div>
        <input type="text" v-model="b">
        <button @click="getRoll('3')">do 10</button>
        <button @click="getRoll('2')">do 5</button>
        <button @click="getRoll('1')">do 2</button>
    </div>
</template>
<script>
export default {
    name:'DatePicker',
    data(){
        return {
            roll:'',
            m:10000,
            t:0,
            b:'0'
        }
    },
    methods:{
        getRoll(d){
            var obj = {
                '1':2,
                '2':5,
                '3':10
            }
            var roll = (Math.random()*3).toString().split('.')[0];
            this.roll = obj[roll];
            var bl = 0;
            if(d=roll){
                bl = obj[d]*parseInt(this.b);
            } else {
                bl = parseInt(this.b)*-1;
            }
            this.t++;
            this.m = this.m + bl;
        }
    }
}   
</script>
