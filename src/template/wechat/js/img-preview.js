/**
 * Created by admin on 2017/10/25.
 */
    //H5 API做上传图片预览
/*
* html元素
 <div class="permit-img">
    <!--图片的表单name暂时都是images FormData中key是唯一的，但是同一个value可以有很多-->
 <div class="img-item select-img"></div>
 </div>
* */


window.URL = window.URL || window.webkitURL;
function handleFiles(obj) {
    var files = obj.files;
    var limit=5;
    var len=files.length;
    var parent=$(obj).parent();
    if(len>limit-1){
        parent.hide();
    }else{
        parent.show();
    }
    if(window.FileReader){
        //opera不支持createObjectURL/revokeObjectURL方法。我们用FileReader对象来处理
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function(e){
            var img=new Image();
            img.src = this.result;
            parent.prepend(img);
        };
    }else{
        alert('您的设备不支持图片预览！');
    }
}

//添加图片 每个图片都是一个input的值，name都是images
$('.select-img').on('click',function(e){
    var parent=$(this).parent();
    var someLen=parent.children().length;
    var limit=5;
    var $label=$('<label class="img-item">' +
        '<span class="delete-img">&times;</span>' +
        '<input type="file" class="hide img-input" accept="image/*" name="images"/>' +
        '</label>');
    if(someLen>limit){
        e.preventDefault();
        alert('请注意，只能上传'+limit+'张图片！');
    }else{
        $(this).parent().prepend($label);
        $label.trigger('click');
    }
    if(someLen>limit-1){
        $(this).hide();
    }else{
        $(this).show();
    }
});

//提交按钮
$('.pic-submit').on('click',function(e){
    e.preventDefault();
    //使用H5的FormData对象
    var form = new FormData($("#pictures")[0]);
    $.ajax({
        url:"some-addr",
        type:"post",
        data:form,
        processData:false,
        contentType:false,
        success:function(data){
            console.log("over..");
        },
        error:function(e){
            alert("提交失败");
        }
    });
});

//放大图片//删除数据//change事件
$('.permit-img').on('click','.img-item',function(e){
    var tar=e.target;
    var limit=5;
    if($(tar).hasClass('delete-img')){
        e.preventDefault();
        $(this).remove();
        var len=$(this).parent().length;
        if(len<=limit){
            $('.select-img').show();
        }else{
            $('.select-img').hide();
        }
    }else if(tar.tagName=='IMG'){
        e.preventDefault();
        showMask();
        var img=$(tar).clone();
        $('.big-img-show').fadeIn(300).html(img).siblings('.mask-item').hide();
    }
}).on('change','.img-input', function(){
    handleFiles(this);
});
