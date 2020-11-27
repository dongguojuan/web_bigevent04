$(function(){
    getUserInfo()
    // 退出
    $('#tuichu').on('click',function(){
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空taoken值
            localStorage.removeItem('token')
            // 关闭窗口
            layer.close(index);
            // 跳转
            location.href="/login.html"
          });
    })
})
var layer=layui.layer
// 从后台获取数据
function getUserInfo(){
    $.ajax({
        method:"get",
        url:"/my/userinfo",
        // headers:{
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function(res) {
            if(res.status !==0) return layui.layer.msg(res.message)
            xuantoux(res.data)
        }
    })
}
// 获取后渲染头像跟内容
function xuantoux(user) {
    var name =user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;"+ name)
    if(user.user_pic !==null) {
        $(".layui-nav-img").attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        var text= name[0].toUpperCase()
        $('.text-avatar').show().html(text)
        $(".layui-nav-img").hide()
    }
}