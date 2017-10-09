<template>
    <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="javascript:">
                        <img alt="Brand" src="../assets/logo.png" width="24" height="24">
                    </a>
                    <a class="navbar-brand"href="javascript:">AVL CO平台</a>

                </div>
                
                <ul class="nav navbar-nav navbar-right">
                    
                    <li>
                        <form class="navbar-form navbar-left">
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="输入查询编号" v-model="number" @keydown.prevent.enter="searchFb">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-primary" @click.prevent="searchFb" :disabled="in_search">
                                            <i class="fa fa-search fa-fw" v-show="!in_search"></i>
                                            <i class="fa fa-refresh fa-spin fa-fw" v-show="in_search"></i>
                                            &nbsp;搜索
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </li>
                    <li>
                        <p class="navbar-text">
                            <a href="###" @click.prevent="goToChgpwd">
                                <i class="fa fa-user"></i>
                                &nbsp;{{$root.USER_NAME}}
                            </a>
                        </p>
                    </li>
                    <li><p class="navbar-text"><i class="fa fa-power-off"></i>&nbsp;
                    <a href="javascript:" class="navbar-link" @click.prevent="logout">退出</a></p></li>
                </ul>

            </div>
        </nav>
</template>
<script>
    import Topbarnotice from './Topbarnotice.vue';
    import {
        tip,
        ajax
    } from '../tools/tools.js'

    export default {
        name: 'Navheader',
        components:{Topbarnotice},
        data(){
            return {
                number:'',
                in_search:false
            }
        },
        methods:{
            logout(){
                this.$root.$router.replace({
                    name:'logout'
                });
            },
            goToChgpwd(){
                this.$root.$router.push({
                    name:'chgpwd'
                });
            },
            showlog(){
                // this.$root.$router.replace({
                //     name:'log'
                // });
            },
            searchFb(){
                var self = this;
                if(self.number.length==0){
                    tip.warn('请输入要查询的编号')
                } else {
                    self.in_search = true;
                    ajax.getFeedbackDetail({
                        param:{
                            ps:10,
                            number:self.number
                        },
                        cb(data){
                            var routename = data.data.list_type=='underway'?'w':'r';
                            var number = data.data.data.number;
                            self.$root.$router.push({
                                name:'fbdetailpage',
                                params:{
                                    number,
                                    routename:'s'
                                }
                            });
                            self.in_search = false;
                        },
                        failCb(data){
                            self.in_search = false;
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>

</style>