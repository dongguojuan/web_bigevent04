$(function(){
    // 初始化页面
    var layer=layui.layer
    initArtCateList()
    function initArtCateList() {
       $.ajax({
           method:"get",
           url:"/my/article/cates",
           success: function (res) {
               if(res.status !==0) return layer.msg(res.message)
               var str =template('tpl_cate',res)
               $('tbody').html(str)
           }
       }) 
    }
    // 2.添加文章事件
    var indexAdd=null
    $('#btnAdd').on('click',function () {
     indexAdd=  layer.open({
            type:1,
            title: '添加文字分类',
            content: $('#dialog_add').html(),
          });     
        
    })
    //3. 提交文章分类添加(事件委托) 把弹出框里的内容提交给后台然后重新渲染页面
    $('body').on('submit',"#form_add",function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg(res.message)
                   
                }
                initArtCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })
    //4.编辑
    var form=layui.form
    var indexEdit=null
    $('tbody').on('click',".btn-edit",function () {
        indexEdit=  layer.open({
            type:1,
            title: '修改文字分类',
            area:["500px","250px"],
            content: $('#dialog_edit').html(),
          });  
          var Id=$(this).attr('data-id') 
            //4.2 
            $.ajax({
                method:"GET",
                url:"/my/article/cates/" + Id,
                success:function(res){
                    if(res.status!==0) return  layer.msg(res.message);
                   form.val('form_edit',res.data)
                
                }
            })
        
    })
    // 5.提交编辑信息 渲染页面
    $('body').on('submit',"#form_edit",function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/updatecate",
            data: $(this).serialize(),
            success:function(res){
                if(res.status!==0)return layer.msg(res.message)
                layer.msg(res.message)
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 6.删除功能
    $('tbody').on("click",".btn_delete",function(){
        var id= $(this).attr('data-id')
        layer.confirm('是否确定删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:"get",
                url:"/my/article/deletecate/"+id,
                success:function (res) {
                    if(res.status!==0) return layer.msg(res.message)
                    layer.msg(res.message)
                    initArtCateList()
                }
            })
            layer.close(index);
          });
    })



})