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
            if(localStorage.coc_token){
                fullurl = url+'?CO_SSID_OP='+localStorage.coc_token
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
                    delete localStorage.coc_token;
                    delete localStorage.coc_username;
                    arg.loginFailCb?arg.loginFailCb():null;
                    
                    var loginObj = {name:'login'};
                    if(router.app.$root.$route.name == 'fbdetailpage'){
                        loginObj.query = {
                            redirect: router.app.$root.$route.fullPath
                        }
                    }

                    router.replace(loginObj);
                } else {
                    tip.err(data.errInfo);
                    arg.failCb?arg.failCb(data):null;
                }
            }).fail(function(){
                tip.err(!ajaxName?url:ajaxName);
                arg.failCb?arg.failCb({errCode:30000}):null;
            });
        };
    }

    return {
        login:send(cfg.baseUrl+'/Api.php/Customer/login','登录'),
        sendFeedbackEmail:send(cfg.baseUrl+'/Api.php/Customer/sendFeedbackEmail','用户反馈'),
        getCustomerDetail:send(cfg.baseUrl+'/Api.php/Customer/getCustomerDetail','获取用户信息'),
        changePassword:send(cfg.baseUrl+'/Api.php/Customer/changePassword','修改密码-登录状态'),
        addEmail:send(cfg.baseUrl+'/Api.php/Customer/addEmail','添加绑定邮箱'),
        delEmail:send(cfg.baseUrl+'/Api.php/Customer/delEmail','删除绑定邮箱 '),
        addFeedback:send(cfg.baseUrl+'/Api.php/Customer/addFeedback','新增反馈'),
        applyOpenFeedback:send(cfg.baseUrl+'/Api.php/Customer/applyOpenFeedback','申请开通服务'),
        getFeedbackList:send(cfg.baseUrl+'/Api.php/Customer/getFeedbackList','获取反馈列表'),
        getFeedbackDetail:send(cfg.baseUrl+'/Api.php/Customer/getFeedbackDetail','获取反馈详情'),
        getFeedbackComment:send(cfg.baseUrl+'/Api.php/Customer/getFeedbackComment','获取反馈补充说明'),
        addFeedbackComment:send(cfg.baseUrl+'/Api.php/Customer/addFeedbackComment','新增反馈补充说明'),
        getFeedbackMaterial:send(cfg.baseUrl+'/Api.php/Customer/getFeedbackMaterial','获取资料记录'),
        feedbackAccept:send(cfg.baseUrl+'/Api.php/Customer/feedbackAccept','验收成功'),
        feedbackRefuse:send(cfg.baseUrl+'/Api.php/Customer/feedbackRefuse','验收失败'),
        getMessageList:send(cfg.baseUrl+'/Api.php/Customer/getMessageList','获取消息列表'),
        getMessageDetail:send(cfg.baseUrl+'/Api.php/Customer/getMessageDetail','获取消息详细')
        
        
        
    };
})();

export {
    tip,ajax
}