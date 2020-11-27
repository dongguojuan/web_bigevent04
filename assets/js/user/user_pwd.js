$(function(){
    var form = layui.form
    form.verify({
       
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value){
            if(value===$('[ name="oldPwd"]').val()) return "不能以旧密码一致"
        },
        rePwd:function(value) {
            if(value!==$('[name="nwsPwd"]').val()) return "与新密码不一致"
        }

        // username: function(value, item){ //value：表单的值、item：表单的DOM对象
        //     if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        //       return '用户名不能有特殊字符';
        //     }
         
      });  

      $('.layui-form').on('submit',function(e){
          e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/updatepwd",
            data:{
                oldPwd:  $('[ name="oldPwd"]').val(),
                newPwd:  $('[ name="nwsPwd"]').val(),
            },
            success:function(res){
                if(res.status !==0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)

                $('.layui-form')[0].reset()
            }
        })
      })
      
   
})