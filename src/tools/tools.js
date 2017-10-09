import '../vendor/cors/jquery-ajax-transport-xdomainrequest'
import toastr from '../vendor/toastr/toastr'

import {cfg} from '../config/config.js'
import {router} from '../config/router.js'

var tip = (function() {
    toastr.options = {
        'closeButton': true,
        'debug': false,
        'newestOnTop': true,
        'progressBar': true,
        'positionClass': 'toast-top-center',
        'preventDuplicates': false,
        'onclick': null,
        'showDuration': '300',
        'hideDuration': '1000',
        'timeOut': '3000',
        'extendedTimeOut': '1000',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut'
    };

    return {
        info:toastr.info,
        succ:toastr.success,
        warn:toastr.warning,
        err:toastr.error
    }
})();

var ajax = (function(){
    function send(url,ajaxName){
        if(!url)tip.err('找不到url');

        return function(arg){
            var fullurl = url;
            if(localStorage.token){
                fullurl = url+'?ssid='+localStorage.token
            }

            var opt = {
                url: fullurl,
                type: 'post',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                }
            }

            if(Object.prototype.toString.call(arg.param)=='[object FormData]'){
                opt.data = arg.param;
                opt.cache = false;
                opt.processData = false;
                opt.contentType = false;
            } else {
                opt.data = JSON.stringify(arg.param?arg.param:{});
            }

            $.ajax(opt).done(function(data){
                if(data.errCode==0){
                    arg.cb(data);
                } else if(data.errCode==20001){
                    tip.err('登录失效请再次登录');
                    delete localStorage.token;
                    delete localStorage.username;
                    if(arg.loginFailCb)arg.loginFailCb();
                    
                    var loginObj = {name:'login'};
                    router.replace(loginObj);
                } else {
                    tip.err(data.errInfo);
                    if(arg.failCb)arg.failCb(data);
                }
            }).fail(function(){
                tip.err(!ajaxName?url:ajaxName);
                if(arg.failCb)arg.failCb();
            });
        };
    }

    return {
        login:send('','登录')
    };
})();

export {
    tip,ajax
}