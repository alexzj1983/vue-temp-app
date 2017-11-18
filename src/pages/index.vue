<template>
    <div class="mian">
        <!-- <DatePicker></DatePicker> -->
        <!-- <Roll></Roll> -->
        <div v-for="(v,i) in str" :key="i">
            {{v}}
        </div>
    </div>
</template>
<script>
    import DatePicker from '../components/picker/DatePicker.vue'
    import Roll from '../components/Roll.vue'

    export default {
        components: {
            DatePicker,Roll
        },
        data() {
            return {
                str:''.split(';')
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