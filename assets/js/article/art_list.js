$(function () {
    var layer=layui.layer
    var form=layui.form

    var q={
        pagenum:1,//页码值
        pagesize:2,//每页显示多少条数据
        cate_id:"",//文章分类的 Id
        state:"",//文章的状态，可选值有：已发布、草稿
    }
    // 时间过滤
    function parZero(n) {
        return n>9? n:"0"+n
    }
    // 格式化时间
    template.defaults.imports.dataFormat=function (dtstr) {
        var dt =new Date(dtstr)
        var yy=dt.getFullYear()
        var mm=parZero(dt.getMonth()+1)
        var dd=parZero(dt.getDate())

        var hh=parZero(dt.getHours())
        var ff= parZero(dt.getMinutes())
        var ss=parZero(dt.getSeconds())
        return yy+"-"+mm+"-"+dd+"  "+hh+":"+ff+":"+ss
    }
    initTable()
    function initTable() {
        $.ajax({
            method:"get",
            url:"/my/article/list",
            data:q,
            success:function (res) {
              if(res.status !==0) return  layer.msg(res.message)
              var str=template("tpl_table",res)
              $('tbody').html(str)
              yema(res.total)
            }
        })
    }
    // 渲染下拉框中的分类
    initcate()
    function initcate() {
        $.ajax({
            method:"GET",
            url:"/my/article/cates",
            success:function (res) {
                if(res.status !==0) return layer.msg(res.message)
                var str=template("tpl_cate",res)
                $('[name="cate_id"]').html(str)
                // 在form里动态生成的元素 需要用laui的form.render()方法重新渲染
                form.render()
            }

        })
    }
    // 监听form的提交事件 删选功能
    $("#form_search").on('submit',function (e) {
        e.preventDefault()
        var cate_id=$('[name="cate_id"]').val()
        var state=$('[name="state"]').val()
        q.cate_id=cate_id
        q.state=state
        $.ajax({
            method:"get",
            url:"/my/article/list",
            data:q,
            success:function (res) {
                if(res.status!==0) return layer.msg(res.message)
                // layer.msg(res.message)
                initTable()
            }
        })
    })


    // 分页功能
    var laypage = layui.laypage;
  
   function yema(total) {
        //执行一个laypage实例
    laypage.render({
        elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
        count:total  ,//数据总数，从服务端得到
        limit: q.pagesize,//
        curr:q.pagenum,//页码值 起始页
        limits:[2,3,5,10],
        layout:["count","limit",'prev', 'page', 'next',"skip"],
        jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            q.pagenum=obj.curr
            q.pagesize=obj.limit
            //首次不执行
            if(!first){
              //do something
              initTable()
            }
          }
      });
   }

// 删除功能
$('tbody').on("click",".btn_delete",function(){
    var id = $(this).attr("data-id")
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method:"get",
            url:"/my/article/delete/" + id,
            success:function (res) {
                if(res.status !==0) return  layer.msg(res.message) 
                layer.msg(res.message) 
                if($('tbody tr').length==1 && q.pagenum>1 ) q.pagenum--
                initTable()
            }
    
        })
        layer.close(index);
      });
   
})


















})