<template>
    <div class="mian">
        <DatePicker></DatePicker>
    </div>
</template>
<script>
    import DatePicker from '../components/picker/DatePicker.vue'
    

    export default {
        components: {
            DatePicker
        },
        data() {
            return {
                
            }
        },
        watch: {
            
        },
        methods: {
            
        }
    }
</script>
<style>
.mian {
    position: fixed;
    top: 50px;
    left: 180px;
    right: 0px;
    bottom: 0px;
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>