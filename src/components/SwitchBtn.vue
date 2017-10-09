<template>
    <span class="switchery" @click.prevet="switchState()" :class="{'on':value}"><small></small></span>
</template>
<script>
export default {
    name:'SwitchBtn',
    data(){
        return {
            switchOn:true
        }
    },
    props:{
        value:{
            type:Boolean
        }
    },
    methods:{
        switchState(){
            this.switchOn = !this.switchOn;
            this.$emit('input',this.switchOn);
        }
    },
    mounted(){
        this.switchOn = this.value;
    }
}
</script>
<style scoped>
.switchery {
    background-color: #fff;
    border: 1px solid #dfdfdf;
    border-radius: 15px;
    cursor: pointer;
    display: inline-block;
    height: 20px;
    position: relative;
    vertical-align: middle;
    width: 40px;

    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    -webkit-transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;
    -moz-transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;
    transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;
}

.switchery > small {
    background: #fff;
    border-radius: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    height: 20px;
    position: absolute;
    top: 0;
    width: 20px;
    left: 0px;
    -webkit-transition: left 0.2s ease-in;
    -moz-transition: left 0.2s ease-in;
    transition: left 0.2s ease-in;
}

.switchery.on{
  border-color: #3464c3;
  box-shadow: #3464c3 0px 0px 0px 16px inset;
  
  background-color: #3464c3;
}

.switchery.on > small{
  left: 20px;
}
</style>
