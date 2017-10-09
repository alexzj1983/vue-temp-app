<template>
    <div class="datepicker-layout">
        <input type="text" v-model="yyyy">
        <input type="text" v-model="mm">
        <button @click="getDayObjectsList()">set mm</button>
        
        <div class="datepicker-days-grid">
            <template v-for="(week_days,w) in days_obj_list">
                <div class="datepicker-week-row" :key="w">
                    <template v-for="(day_obj,d) in week_days">
                        <div class="datepicker-day-coll" :class="{'datepicker-curr_mm-day':day_obj.mm==getMonth(curr_mm)}" :key="d">
                            {{day_obj.dd}}
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name:'DatePicker',
    data(){
        return {
            init_date:new Date(),
            month_list:[1,2,3,4,5,6,7,8,9,10,11,12],
            week_list:[1,2,3,4,5,6,7],

            yyyy:0,
            mm:0,
            dd:0,
            ww:0,

            curr_mm:0,

            days_obj_list:[],

            date_str:'',
            opened:false
        }
    },
    props:{
        value:{
            type:String,
            default:''
        },
        format:{
            type:String,
            default:'yyyy-mm-dd'
        }
    },
    computed:{
        
    },
    watch:{
        value(o,vo){
            
        }
    },
    methods:{
        getDayObjectsList(){
            var self = this;
            var year = parseInt(self.yyyy);
            var month = parseInt(self.mm);

            var d = new Date();
            d.setFullYear(year);
            d.setMonth(month);
            d.setDate(1);

            var prev_mm = month-1;
            var curr_mm = self.curr_mm = month;
            var next_mm = month+1;

            var prev_date = self.getLastDayDate(year,prev_mm);
            var curr_date = self.getLastDayDate(year,curr_mm);
            var next_date = self.getLastDayDate(year,next_mm);

            var prev_days = prev_date.getDate();
            var curr_days = curr_date.getDate();
            var next_days = next_date.getDate();

            var curr_week_start = d.getDay();
            var prev_days_list = [];
            for(let i=(prev_days-curr_week_start+1);i<=prev_days;i++){
                var yyyy = prev_date.getFullYear();
                var mm = self.getMonth(prev_date.getMonth());
                prev_days_list.push({yyyy,mm,dd:i});
            }

            var curr_days_list = [];
            for(let i=1;i<=curr_days;i++){
                var yyyy = curr_date.getFullYear();
                var mm = self.getMonth(curr_date.getMonth());
                curr_days_list.push({yyyy,mm,dd:i});
            }

            d.setDate(curr_days);
            var curr_week_end = d.getDay();
            var next_days_list = [];
            for(let i=1;i<=(6-curr_week_end);i++){
                var yyyy = next_date.getFullYear();
                var mm = self.getMonth(next_date.getMonth());
                next_days_list.push({yyyy,mm,dd:i});
            }
            
            var days_obj_list = prev_days_list.concat(curr_days_list.concat(next_days_list));
            var temp_arr = [];
            for(let i=0;i<days_obj_list.length/7;i++){
                temp_arr.push(days_obj_list.slice(i*7,((i+1)*7)));
            }

            self.days_obj_list = temp_arr;
        },
        getLastDayDate(year,month){
            var self = this;
            var d = new Date('1970-01-01');
            d.setFullYear(year);
            d.setMonth(month+1);
            d.setDate(0);
            return d;
        },
        getMonth(month){
            var self = this;
            if(month<0)return self.month_list[12+month];
            if(month>11)return self.month_list[month-12];
            return self.month_list[month];
        },
        getWeek(mm,dd){
            var self = this;
            
        }
    },
    created(){
        var self = this;

    },
    mounted(){
        var self = this;
        self.yyyy = self.init_date.getFullYear();
        self.mm = self.init_date.getMonth();
        self.dd = self.init_date.getDate();
        self.ww = self.init_date.getDay();
        
        self.getDayObjectsList();
    }
}
</script>
<style scoped>
.datepicker-layout{
    display: inline-block;
}

.datepicker-week-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.datepicker-day-coll{
    text-align: center;
    border: solid 1px #ccc;
    flex: 1;
    margin: 1px;
    background-color: #eee;
}

.datepicker-day-coll.datepicker-curr_mm-day{
    background-color: #fff;
}
</style>