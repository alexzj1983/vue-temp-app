<template>
    <div class="navbar-side">
        <div class="sidebar-collapse">
            <ul class="nav in">
                <li :class="{'active':$route.name=='profilepage'}">
                    <a href="###" @click.prevent="goToPage('profilepage')">
                        <i class="fa fa-commenting"></i>
                        <span class="nav-label">概况</span><span class="fa arrow"></span>
                    </a>
                </li>
                <li :class="{'active':$route.name=='batchlistpage'}">
                    <a href="###" @click.prevent="goToPage('batchlistpage')">
                        <i class="fa fa-tasks"></i>
                        <span class="nav-label">批次列表</span><span class="fa arrow"></span>
                    </a>
                </li>
                <li :class="{'active':$route.name=='analysispage'}">
                    <a href="###" @click.prevent="goToPage('analysispage')">
                        <i class="fa fa-commenting"></i>
                        <span class="nav-label">人工检测</span><span class="fa arrow"></span>
                    </a>
                </li>
                <li :class="{'active':$route.name=='settingpage'}">
                    <a href="###" @click.prevent="goToPage('settingpage')">
                        <i class="fa fa-tasks"></i>
                        <span class="nav-label">系统管理</span><span class="fa arrow"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {tip,ajax} from '../tools/tools.js'

    export default {
        name: 'Sidemenu',
        data() {
            return {

            }
        },
        props: {

        },
        watch:{
            $route(v,ov){
                console.log(v);
            }
        },
        methods: {
            goToPage(r){
                console.log(r,'hahahah')
                this.$root.$router.push({
                    name:r
                });
            }
        },
        mounted(){
            var v = this.$route;
            
        }
    }
</script>
<style scoped>
    .navbar-side {
        position: fixed;
        box-shadow: 3px 0 6px rgba(0, 0, 0, 0.3);
        top: 50px;
        left: 0px;
        bottom: 0px;
        width: 180px;
        background-color: #5184d2;
        z-index: 2;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .navbar-side .nav-second-level li.active a {
        background-color: #5184d2;
    }
</style>