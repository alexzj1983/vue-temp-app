<template>
    <div class="file-input-layout" data-wenk="点击选择文件" data-wenk-pos="top-left">
        <input type="file" :name="inpName" class="file-input" :accept="inpAccept" @change="fileSelected">
        <button class="btn btn-primary" @click.prevent="openFileByBtn"><i class="fa fa-upload"></i></button>
        <div class="file-icon" v-show="is_file"><i class="fa fa-file"></i></div>
        <img v-show="img_src.length>0" :src="img_src" class="resize-img" :class="{'img-normal':!zoom_img,'img-zoom':zoom_img}" @click="zoom_img=!zoom_img">
        <div class="text-muted val-text" :title="val_text">{{val_text}}</div>
    </div>
</template>
<script>
export default {
    name:'InputFile',
    data(){
        return {
            fileDataUrl:null,
            reader:new FileReader(),
            val_text:'',
            img_src:'',
            is_file:false,
            zoom_img:false
        }
    },
    props:{
        value:{default:null},
        inpName:{
            type:String,
            default:'file'
        },
        inpAccept:{
            type:String,
            default:'*'
        },
        initSrc:{
            type:String,
            default:''
        }
    },
    watch:{
        value(o,vo){
            if(o==null){
                $(this.$el).find('input').val('');
                this.fileDataUrl = null;
                this.val_text = '';
                this.img_src = '';
                this.is_file = false;
            }
        },
        fileDataUrl(v,ov){
            var self = this;
            this.$emit('input',self.fileDataUrl);
        },
        initSrc(v,ov){
            if(v.length>0){
                this.img_src = v;
            }
        }
    },
    methods:{
        fileSelected(event){
            var self = this;
            self.val_text = event.target.value;
            
            
            if(event.target.value.length>0){
                var file = event.target.files[0];
                var type = file.type.split('/')[0];
                self.fileDataUrl = file;
                if(type=='image'){
                    self.reader.readAsDataURL(file);
                    self.is_file = false;
                } else {
                    self.img_src = '';
                    self.is_file = true;
                }
                
            } else {
                self.fileDataUrl = null;
                self.val_text = '';
                self.is_file = false;
                self.img_src = 0;
                if(self.initSrc.length>0){
                    self.img_src = self.initSrc;
                }

            }
            
        },
        openFileByBtn(){
            var self = this;
            $(self.$el).find('input:file').trigger('click');
        }
    },
    mounted(){
        var self = this;
        $(self.$el).find('input').val('');
        self.fileDataUrl = '';
        self.val_text = '';
        self.img_src = self.initSrc.length>0?self.initSrc:'';

        self.reader.onload = function (e) { 
            self.img_src = e.target.result;
        } 
    }
}
</script>
<style scoped>
.file-input-layout{
    position: relative;
    max-width: 150px;
    display: inline-block;
}

.img-normal{
    max-width: 34px;
    max-height: 34px;
}

.img-zoom{
    position: absolute;
    top:0px;
    left:0px;
    max-width: 210px;
    max-height: 210px;
    z-index: 998;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);
}

.resize-img{
    cursor: pointer;
    transition: all 0.15s ease-in 0.1s;
}

.file-input-layout>.btn.btn-primary{
    width: 40px;
}

.file-input{
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    top: 0px;
    left: 0px;
    overflow: hidden;
}
.val-text{
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
}
.file-icon{
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    color: #1ab394;
    border-radius: 4px;
    text-align: center;
    background-color:  #fff;
    border: 1px solid #1ab394;
    vertical-align: middle;
}
</style>