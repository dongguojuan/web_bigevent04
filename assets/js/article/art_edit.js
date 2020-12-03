$(function () {
    // alert(location.search.split("=")[1])
    function initForm() {
        var id = location.search.split("=")[1];

        $.ajax({
            method: "get",
            url: "/my/article/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val("form-edit", res.data)
                //  tinymce赋值设置内容：tinyMCE.activeEditor.setContent(“需要设置的编辑器内容”)
                tinyMCE.activeEditor.setContent(res.data.content)
                if (!res.data.cover_img) {
                    return layer.msg("用户未曾上传头像")
                }
                var newImgURL = 'http://ajax.frontend.itheima.net '+ res.data.cover_img;
                $image
                    .cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', newImgURL)  // 重新设置图片路径
                    .cropper(options)        // 重新初始化裁剪区域
            }

        })

    }
    var layer = layui.layer
    var form = layui.form

    initcate()
    function initcate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var str = template("tpl_pub", res)
                $('[name="cate_id"]').html(str)
                form.render()
                initForm()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $("#xfm").on("click", function () {
        $("#xfmbtn").click()
    })

    //  4.选择图片
    $("#xfmbtn").on("change", function (e) {
        // 拿到用户选择的文件
        var file = e.target.files[0]
        if (file == undefined) return;
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    var state = "已发布"
    $("#caogao").click(function () {
        state = "草稿"
    })

    $("#form_pub").on("submit", function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append("state", state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob)
                $.ajax({
                    method: "post",
                    url: "/my/article/edit",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) return layer.msg(res.message)
                        layer.msg("修改文章成功")
                        setTimeout(function () {
                            window.parent.document.getElementById("list").click()
                        }, 1500)
                    }
                })
            })

    })



})