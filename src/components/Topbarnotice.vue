<template>
    <!--<li class="dropdown open">-->
    <li class="dropdown" :class="{'open':msg_box_shown}">
        <a class="dropdown-toggle count-info" data-toggle="dropdown" href="###" @click.prevent.stop="msg_box_shown=!msg_box_shown" aria-expanded="true">
            <i class="fa fa-bell"></i> <span class="label label-primary">{{$root.MSG_LIST.data.total}}</span>
        </a>
        <ul class="dropdown-menu dropdown-alerts">
            <li>
                <div class="msg-box-title">
                    <span class="text-muted small">消息通知</span>
                    <span class="pull-right text-muted small">
                        您有
                        <b class="text-success">{{$root.MSG_LIST.data.total}}</b>
                        条未读消息
                        <a href="###" @click.prevent.stop="goToMsgPage()">查看全部通知</a>
                    </span>
                </div>
            </li>

            <template v-for="(msg,i) in $root.MSG_LIST.data.data">
                <li class="divider"></li>
                <li>
                    <a href="###" @click.prevent.stop="goToMsgDetail(msg)">
                        <div class="row">
                            <div class="col-lg-3">
                                <b>{{msg.type | typeStr}}</b>
                            </div>
                            <div class="col-lg-5 text-ellipsis">
                                <span class="text-muted small">{{msg.title}}</span>
                            </div>
                            <div class="col-lg-4 text-right">
                                <span class="text-muted small">{{msg.addtime | addtimeStr}}</span>
                            </div>
                        </div>
                    </a>
                </li>
            </template>
        </ul>
    </li>
</template>
<script>
    import Push from 'push.js/push'
    import Image from '../assets/logo-s.png'
    import {ajax,top} from '../tools/tools.js'

    export default {
        name: 'Topbarnotice',
        components:{},
        data() {
            return {
                msg_box_shown:false,

                msg_interval:null
            }
        },
        watch:{
            
        },
        filters:{
            typeStr(v){
                return v=='1'?'系统推送':'流程更新'
            },
            addtimeStr(v){
                return v.substring(5,v.length-3);
            }
        },
        methods:{
            goToMsgPage(){
                this.$root.$router.push({
                    name:'msgpage'
                });
                this.msg_box_shown = false;
            },
            getMsgList(){
                var self = this;
                ajax.getMessageList({
                    param:{
                        pn:1,
                        ps:10,
                        status:1
                    },
                    cb:function(data){
                        self.$root.MSG_LIST = data;
                        
                        var now = new Date();
                        data.data.data.map(function(v,i){
                            var dis = (now-self.getDate(v.addtime))/1000;
                            if(dis<30){
                                self.createNote(v);
                            }
                        })
                    },
                    failCb:function(data){
                        
                    }
                    
                })
            },
            goToMsgDetail(msg){
                var self = this;
                var number = msg.number;
                ajax.getMessageDetail({
                    param:{
                        message_id:msg.id
                    },
                    cb(data){
                        self.getMsgList();

                        if(msg.type=='2'){
                            self.$root.$router.push({
                                name:'fbdetailpage',
                                params:{
                                    number,
                                    routename:'s'
                                }
                            });
                        } else {
                            self.$root.SYS_MSG = msg;
                            self.$root.$router.push({
                                name:'msgdetailpage'
                            });
                        }
                        
                    },
                    failCb:function(data){
                        
                    }
                })
                    

                
                // self.msg_box_shown = false;
            },
            createNote(msg){
                var self = this;
                Push.create(msg.type=='1'?'系统推送':'流程更新', {
                    body: msg.title,
                    icon: {
                        x32: Image
                    },
                    timeout: 10000,
                    onClick:function(){
                        self.goToMsgDetail(msg);
                        this.close();
                    }
                });
            },
            getDate(dateStr){
                var dayStr = dateStr.substring(0,10);
                var YYYY = parseInt(dayStr.split('-')[0]);
                var MM = parseInt(dayStr.split('-')[1])-1;
                var DD = parseInt(dayStr.split('-')[2]);

                var timeStr = dateStr.substring(11,dateStr.length);
                var hh = parseInt(timeStr.split(':')[0]);
                var mm = parseInt(timeStr.split(':')[1]);
                var ss = parseInt(timeStr.split(':')[2]);

                return new Date(YYYY,MM,DD,hh,mm,ss);
            }
        },
        mounted(){
            var self = this;
            self.getMsgList();

            if(self.msg_interval==null){
                self.msg_interval = setInterval(function(){
                    self.getMsgList();
                },30000);
            }
            
            $(document).click(function(){
                self.msg_box_shown = false;
            })

        },
        beforeDestroy(){
            clearInterval(this.msg_interval);
        }
    }
</script>
<style scoped>
.navbar-nav > li > .dropdown-menu{
    width:400px;
}

.navbar-default .nav > li > a:hover, .navbar-default .nav > li > a:focus{
    background-color: inherit;
    color:#999c9e;
}
.msg-box-title{
    padding:5px;
}
</style>
