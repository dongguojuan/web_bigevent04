$(function(){
    // 1.验证
    var form=layui.form
    form.verify({
        nickname:function(value){
            if(value >6) return "昵称不能超过6位"
        }
      });  
      
    //   渲染
      var layer=layui.layer
      xuantext()

      function xuantext(){
        $.ajax({
            method:"get",
            url:"/my/userinfo",
            success:function(res){
                if(res.status !==0 ) return layer.msg(res.message)
                form.val("formTest",res.data)
            }
        })
      }

    //   重置
    $('#btnReset').on('click',function(e){
         e.preventDefault() 
        //  重新渲染
         xuantext()
    })
    // 修改资料
    $('.layui-form').on('submit',function(e){
        e.preventDefault() 
        $.ajax({
            method:"post",
            url:"/my/userinfo",
            data: $(this).serialize(),
            success:function(res) {
                if(res.status !==0) return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })

            
})