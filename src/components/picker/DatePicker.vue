<template>
    <div class="datepicker-layout">
        <input type="text" v-model="yyyy">
        <input type="text" v-model="mm">
        <button @click="daysList()">set mm</button>
        
        <div class="date-picker-month-select">
            {{display_yyyy}} - {{display_mm}}
        </div>
        <div class="datepicker-days-grid">
            <template v-for="(week_days,w) in days_obj_list">
                <div class="datepicker-week-row" :key="w">
                    <template v-for="(day_obj,d) in week_days">
                        <div class="datepicker-day-coll" :class="{'datepicker-curr__mm-day':day_obj.mm==display_mm,'datepicker-curr__dd':isCurrDay(day_obj)}" :key="d">
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

            display_yyyy:0,
            display_mm:0,
            display_dd:0,

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
        isCurrDay(date_obj){
            return date_obj.yyyy==this.display_yyyy&&date_obj.mm==this.display_mm&&date_obj.dd==this.display_dd;
        },
        daysList(){
            var self = this;
            var year = parseInt(self.yyyy);
            var month = parseInt(self.mm);

            var d = new Date();
            d.setFullYear(year);
            d.setMonth(month);
            d.setDate(1);

            var prev_mm = month-1;
            var curr_mm = month;
            var next_mm = month+1;

            var prev_date = self.getLastDayDate(year,prev_mm);
            var curr_date = self.getLastDayDate(year,curr_mm);
            var next_date = self.getLastDayDate(year,next_mm);

            self.display_yyyy = curr_date.getFullYear();
            self.display_mm = self.getMonth(curr_date.getMonth());
            self.display_dd = self.dd;

            var prev_days = prev_date.getDate();
            var curr_days = curr_date.getDate();
            var next_days = next_date.getDate();

            var curr_week_start = d.getDay();
            d.setDate(curr_days);
            var curr_week_end = d.getDay();

            var prev_days_list = self.getDaysList(prev_date,(prev_days-curr_week_start+1),prev_days);
            var curr_days_list = self.getDaysList(curr_date,1,curr_days);
            var next_days_list = self.getDaysList(next_date,1,(6-curr_week_end));
            
            var days_obj_list = prev_days_list.concat(curr_days_list.concat(next_days_list));

            self.days_obj_list = [];
            for(let i=0;i<days_obj_list.length/7;i++){
                self.days_obj_list.push(days_obj_list.slice(i*7,((i+1)*7)));
            }
        },
        getDaysList(date_obj,start,end){
            var self = this;
            var days_list = [];
            for(let i=start;i<=end;i++){
                var yyyy = date_obj.getFullYear();
                var mm = self.getMonth(date_obj.getMonth());
                days_list.push({yyyy,mm,dd:i});
            }
            return days_list;
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
        
        self.daysList();
    }
}
</script>
<style scoped>
.datepicker-layout{
    display: inline-block;
    font-size: 0.75em;
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
    border-radius: 4px;
}

.datepicker-day-coll.datepicker-curr__mm-day{
    background-color: #fff;
}
.datepicker-day-coll.datepicker-curr__mm-day.datepicker-curr__dd{
    background-color: #aaa;
    color: #fff;
}
</style>