// 注意每次调用 $.get() 或 $.post() 或$.ajax()的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // console.log(options.url);
    // 在发起真正的Ajax 请求之前，统一拼接请求的根路径
    options.url="http://ajax.frontend.itheima.net"+options.url

    // 拦截  只有my 开头得请求ajax就得有headers请求权限
   if(options.url.indexOf('/my/') !== -1){
    options.headers = {
        Authorization: localStorage.getItem('token') || ""

    }
   }
   options.complete = function(res){
     var obj = res.responseJSON
     if(obj.status == 1 && obj.message ==="身份认证失败！"){
        localStorage.removeItem('token')
        location.href="/login.html"
     }
   }
})