$(function(){
  $('#reg_link').on('click',function(){
      $('.login-box').hide()
      $('.reg-box').show()
  })  
  $('#login_link').on('click', function() {
      $('.reg-box').hide()
      $('.login-box').show()
  })

  // 从 引入的layui.all.js中获取form 对象
var form = layui.form
var layer = layui.layer;
// 通过 form.verify() 函数自定义校验规则
form.verify({
  // 自定义了一个pwd的校验规则
  pwd: [
    /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
  ] ,
// 校验俩次密码是否一致的规则
repwd:function(value) {
  // 通过形参拿到的是确认密码框中的内容
  // 还需要拿到密码框中的内容 对比俩次密码
  // 如果判断失败，则return一个提示消息即可
  var pwd =$('.reg-box [name=password]').val()
  if(pwd !== value){
    return "俩次密码不一致！"
  }
}

})
// 监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
  e.preventDefault()
  $.post('/api/reguser',
  {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
  function(res){
    if(res.status!==0) {
      // return console.log(res.message);
      return layer.msg(res.message);
    }
    layer.msg(res.message);
    // 注册成功后直接切换到登录区域
    $('#login_link').click()
    $('#form_reg')[0].reset()
  })
}) 
$('#form_login').on('submit',function(e){
  e.preventDefault()
  $.post('/api/login',
  // {
  // //   username:$('#form_login [name=username]').val(),
  // //  password:$('#form_login [name=password]').val()
  // }
  $('#form_login').serialize(),
  function(res) {
    if(res.status!==0) {
      return layer.msg(res.message);  
    }
    layer.msg(res.message);
    console.log(res.token);
    // 将token存到本地
    localStorage.setItem('token',res.token)
    // 跳转到后台主页
    location.href = '/index.html'
  }
)
})
})

