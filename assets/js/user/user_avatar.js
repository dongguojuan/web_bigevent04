$(function(){
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 2.上传
$('#chuan').on('click',function(){
    $('#file').click()
})
$('#file').on('change',function(e){
    var filelist = e.target.files
  if (filelist.length === 0) {
    return layer.msg('请选择照片！')
  }

  // 1. 拿到用户选择的文件
  var file = e.target.files[0]
  // 2. 将文件，转化为路径
  var imgURL = URL.createObjectURL(file)
  // 3. 重新初始化裁剪区域
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域

})
// 4.渲染
  $('#queding').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')

    $.ajax({
        method:"post",
        url:"/my/update/avatar",
        data:{
            avatar:dataURL,
        },
        success:function(res){
            if(res.status!==0) return layui.layer.msg("更换头像失败")
            window.parent.getUserInfo()
        }
    })
  })

})