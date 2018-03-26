/**
 * Created by admin on 2017/10/17.
 */

////加载图标
//$('head').append('<link rel="stylesheet" href="css/icon-base64.css"/>');

//初始化缩放
equalScaling();

/*在很多页面都会出现的交互效果*/
$(function(){

    //窗口尺寸变化
    window.onresize=function(){
        equalScaling(innerWidth,innerHeight);
        if(carouselSomeFun!==undefined){
            carouselSomeFun();
        }
    };

    //底部导航点击效果
    $('.bottom-nav').on('click','.item',function(){
        Switchover(this,'bottomNav');
    });
    //所有的.input元素，触发获得焦点时，会改变底部导航的定位方式,
    $('.input').on('focus',function(){
        positionChange("static");
    }).on("blur",function(){
        positionChange();
    });
    //左侧遮罩层弹窗
    $('.show-mask').on("click",function(e){
        e.preventDefault();
        hideBodyScroll();
        $('.mask').fadeIn(300).children('.classify-content').addClass('move')
            .end().find('.specification').addClass('move');
        var info=$(this).attr('data-info');
        if(!!info){
            var txt='';
            if(info=="delete"){
                txt="删除订单将不能恢复，确定要删除订单么？"
            }
            if(info=="cancel"){
                txt='取消申请售后，订单将恢复原状态，确定取消吗？';
            }
            $('.alert-txt').text(txt);
            $('.alert-btn').attr('data-state',info).attr('data-index',$(this).parent().parent().index());
        }
    });
    $('.close-mask').on("click touchmove",function(e){
        e.preventDefault();
        showBodyScroll();
        $('.classify-content').removeClass('move');
        $('.specification').removeClass('move');
        $('.mask').fadeOut(300);
        var state=$(this).parent().attr('data-state');
        var index=parseInt($(this).parent().attr('data-index'));
        if(!!state && $(this).hasClass('alert-sure') && index>-1) {
            var tar=$('.mobile-container').children();
            if (state == "delete") {
                tar.eq(index).remove();
            }
            if (state == "cancel") {
                tar.eq(index).find('[data-info="cancel"]').hide().end().find('.gray-pay.b').text('取消售后');
            }
        }
        if($(this).hasClass('alert-sure')){
            var dele=$(this).attr('delete-target');
            if(dele){
                $('[data-info="'+dele+'"]').parent().parent().remove();
            }
        }
    });
    //不阻止默认事件，同时关闭mask
    $('.only-close').on("click", hideMask);
    $('.go-back').on('click',function(e){
        e.preventDefault();
        window.history.go(-1);
    });

    //商品视图切换,因为没法直接更改瀑布流的视图（多了两个DIV元素）
    // 所以是直接在新的容器你产生瀑布流视图的
    $('.switch-view').on('click',function(){
        var target=$(this).find('.icon-base');
        target.toggleClass('active');
        //判断这个icon图的active状态,有的话就是瀑布流，因为默认是普通排列
        // 即时伸展的状态
        var pinter=$('[data-pinterest="product"]');
        if(target.hasClass('active')){
            $('.static-layout').fadeOut(0);
            //判断容器内容，为空才去获取数据生成新元素
            if(pinter.children().length==0){
                Pinter.init(pinter,PinterData,2,'sale');
            }
            pinter.fadeIn(300);
        }else{
            //容器不为空，就直接显示隐藏的切换
            pinter.fadeOut(0);
            $('.static-layout').fadeIn(300);
        }
    });

    /*购物车页面点击事件*/
    //全选按钮
    var checkAll=$('[data-check="all"]');
    var orderSub=$('.gray-order-btn');//提交订单按钮订单
    var infoBtn=$('[data-btn="info"]');//是提交订单和删除按钮
    var deleteBtn=$('.delete-btn');
    //全选按钮
    checkAll.on("click",function(){
        var value=$(this).prop('checked');
        var checkItem=$('[data-check="item"]');
        //如果都没有子选项，那肯定没法全选了是不，
        if(checkItem.length==0){
            //没必要继续了
            value=false;
            $(this).prop('checked',value);
        }
        checkItem.prop('checked',value);
        if(value){
            infoBtn.addClass('check');
        }else{
            infoBtn.removeClass('check');
        }
        //更新总金额
        inputVal();
    });
    //提交订单按钮
    orderSub.on('click',function(){
        var info=$(this).hasClass('check');
        if(info){
            var href=$(this).attr('data-href');
            window.open(href);
        }else{
            alert("请先选择商品!");
        }
    });
    //删除按钮
    deleteBtn.on('click',function(){
        //得到所有选中的
        var checkItem=$('[data-check="item"]');
        checkItem.each(function(){
            var check=$(this).prop('checked');
            if(check){
                $(this).parent().parent().parent().remove();
                //此时也要 在数据库的购物车里更新下
                forInput(checkItem,checkAll,infoBtn);
            }
        });
        //此时也要更新一下全选按钮，如果全删除光了
        if(checkItem.length==0){
            checkAll.prop('checked',false);
            infoBtn.removeClass('check');//没法提交订单了，也没法再删除了
        }
        //更新总金额
        inputVal();
    });

    //购物车页面的编辑按钮
    var showPart=$('[data-show="show"]');
    var hidePart=$('[data-show="hide"]');
    $('.nav-r').on('click',function(){
        var show=$(this).attr('data-show');
        if(show=="redact"){
            //编辑变成完成，进入编辑状态
            $(this).find('.achieve').show().siblings('.redact').hide();
            $(this).attr('data-show',"achieve");
            hidePart.hide();
            showPart.show();
        }else if(show=="achieve"){
            //完成变成编辑，进入完成状态
            $(this).find('.redact').show().siblings('.achieve').hide();
            $(this).attr('data-show',"redact");
            hidePart.show();
            showPart.hide();
            //进入完成状态也需要更新按钮的状态
            forInput($('[data-check="item"]'),$('[data-check="all"]'),infoBtn);
        }
    });
    //单个选项按钮
    $('[data-input="parent"]').on("click",'[data-check="item"]',function(){
        //因为有dom元素的移除，所以每次获取的时候就要写上jquery的选择器，不然操作的还是旧的DOM合集
        forInput($('[data-check="item"]'),checkAll,infoBtn);
    })
        //加号，减号,input值的变化
        .on('input change','.value',function(){
            inputVal();
        });
    $('.mobile-container').on('click','.minus',function(){
        changVal(-1,this);
         })
        .on('click','.plus',function(){
            changVal(1,this);
        });
    $('.mask').on('touchend','.minus',function(){
        changVal(-1,this);
        })
        .on('click','.plus',function(){
            changVal(1,this);
        });

    //加减导致的数值变化
    function changVal(n,that){
        //暂定上限100，下限1
        var max=100,min=1;
        var input=$(that).siblings('input.value');
        var value=parseInt(input.val());
        if(n>0){
            //加号,暂时设定一个上限100
            value++;
            if(value>=max){
                $(that).removeClass('active');
                input.val(max);
            }else{
                $(that).addClass('active');
                input.val(value);
            }
            //点了加号，那就肯定值有一个提升的或等卡死在100，那么就一定可以减
            $(that).siblings('.minus').addClass('active');
        }else if(n<0){
            //减号
            value--;
            if(value<=min){
                $(that).removeClass('active');
                input.val(min);
            }else{
                $(that).addClass('active');
                input.val(value);
            }
            //点了减号，那就肯定值有一个降低的或等卡死在1，那么就一定可以加
            $(that).siblings('.plus').addClass('active');
        }
        //触发input的change事件
        input.trigger('change');
    }

    //页面初次加载数据时，可以调用一次该函数，虽然没什么卵用
    inputVal();

    //订单状态列表点击效果
    $('.order-option,.sort-option').on('click','.item',function(e){
        e.preventDefault();
        //调用方法 列表项点击切换Switchover
        Switchover(this);
    });

    //售后原因弹窗
    $('.pop-up').on('click',function(e){
        $('.after-reason').fadeIn(300).siblings('.mask-item').hide();
    });

    //textarea框
    $('textarea.reset').on('keyup',function(){
        var len=$(this).val().length;
        $(this).parent().find('.info-length').text(len);
    });

    //向左滑动显示隐藏选项
    moveShowItem();

    //添加购物车效果
    var goOn=true;
    $('.mobile-container').on('click',".addCartNum",function(e){
        e.preventDefault();
        if(!goOn)return;
        goOn=false;
        $('.show-txt-number').removeClass('hide').animate({
            'bottom':'300%',
            'opacity':'0'
        },400,'swing',function(){
            $(this).addClass('hide').css({ 'bottom':'100%', 'opacity':'1'});
            var sib=$(this).siblings('.show-content');
            var num1=parseInt(sib.attr('data-number'));
            num1+=1;
            sib.attr('data-number',num1).text(num1);
            goOn=true;
        })
    }).on("scroll",function(){
        //滚动时，触发记录当前滚动位置的方法
        addScrollTop($(this).scrollTop(),"write");
    });

    //分类页面点击、触摸效果
    $('.classify-content').on('click touchstart','.c-content-list',function(e){
        e.preventDefault();
        $(this).addClass('active').siblings('.c-content-list').removeClass('active');
    });

    //利用定时器的函数是在所有函数执行完毕之后才执行的这个特性，来读取当前页面的localStorage
    setTimeout(function(){
        //读取当前页面的localStorage
        if(addScrollTop!==undefined){
            addScrollTop(0,"read");
        }
    },20);

    moveStop('.stopMove');//上下滑动阻止
    moveStop('.stopTop',true);//到达了顶部再往上滑动，阻止

});


//记录下已经发生的滚动，
var bodyScroll=0;
//移除body的overflow:hidden
function showBodyScroll(){
    $('html,body').removeClass('ovfHiden');
    $('.mobile-container').removeClass('fixed');
    $(window).scrollTop(bodyScroll);
}
//加上body的overflow:hidden，使其在遮罩层弹出的时候无法移动
function hideBodyScroll(){
    bodyScroll=$(window).scrollTop();
    $('html,body').addClass('ovfHiden');
    $('.mobile-container').addClass('fixed').css('top',-bodyScroll);

}

//显示遮罩层，这里的方法主要是为过渡遮罩和弹窗提示遮罩
function showMask(content,txt){
    //event.preventDefault();
    var someMask= content?content+"-mask":"mask";
    var mask=createMask(someMask);//生成mask,没有就生成，有就算咯
    var maskC=mask.find('.mask-content');
    switch (content){
        case "loading":
            maskC.removeClass('alert').addClass('loading').html('<img src="images/loading.gif"/>');
            break;
        case "alert":
            maskC.removeClass('loading').addClass('alert').html('<div class="alert-txt red">'+txt+'</div>');
            break;
    }
    mask.fadeIn(300);
    if(!!txt){
        //自动三秒后关闭
        setTimeout(function(){
            hideMask(someMask);
        },3000);
    }
}
//隐藏遮罩层
function hideMask(mask){
    showBodyScroll();
    mask=mask|| "mask";
    $('.'+mask).fadeOut(300);
}
//生成遮罩层
function createMask(txt){
    hideBodyScroll();
    txt=txt|| 'mask';
    var mask=$('.'+txt);
    if(mask.length==0){
        mask=$('<div class="stopMove hide '+txt+'"><div class="mask-shade"></div><div class="mask-content"></div></div>');
        $('body').append(mask);
    }
    return mask;
}

//遮罩：确认按钮
function sureCheck(that){
    event.preventDefault();
    var mask=createMask();//生成mask,没有就生成，有就算咯
    var maskC=$('.mask-content');

    var info=$(that).attr('data-info');
    if(!!info) {
        var txt = '';
        if (info == "delete") {
            txt = "删除订单将不能恢复，确定要删除订单么？"
        }
        if (info == "cancel") {
            txt = '取消申请售后，订单将恢复原状态，确定取消吗？';
        }
        maskC.addClass('alert').html(
            ' <p class="alert-txt">' + txt + '</p>' +
            '<div class="alert-btn">' +
            '<a href="#" class="only-close alert-sure item">确定</a>' +
            '<p class="close-mask alert-cancel item">取消</p>' +
            '</div>'
        );
        mask.fadeIn(300);
    }
}

//提示 删除订单将不能恢复，确定要删除订单么 的弹窗
function showInfo(that,txt){
    event.preventDefault();
    hideBodyScroll();
    txt=txt || "删除订单将不能恢复，确定要删除订单么？";
    var info=$(that).attr('data-info');
    $('.mask').fadeIn(300).find('.alert-txt').text(txt).end().find('.alert-sure').attr('delete-target',info);
}
//列表项点击切换,传入this值
function Switchover(that,part){
    event.preventDefault();
    //只有一个点击效果的切换
    if(part=="bottomNav"){
        $(that).addClass('active').find('.icon-base').addClass('active').end()
            .siblings().removeClass('active').find('.icon-base').removeClass('active');
    }else{
        $(that).addClass('active').siblings(".item").removeClass('active');
    }
}

//底部导航的定位的切换：在input文本框输入文本时，让顶部固定定位的导航变成静态的定位
function positionChange(state){
    if(state=='static'){
        $('.bottom-container').addClass("static");
        $('.mobile-container').removeClass("bottom-padding");
    }else{
        $('.bottom-container').removeClass("static");
        $('.mobile-container').addClass("bottom-padding");
    }
}
//触摸到顶部或者到了底部，就不然它在移动了
function moveStop(target,one){
    var m_start=0,m_move=0;
    $(target).on(
        {
            "touchstart":function(event){
                var touch = event.originalEvent.changedTouches[0];
                //设定初始触摸值
                m_start= touch["pageY"];
            },
            "touchmove":function(event){
                var touch = event.originalEvent.changedTouches[0];
                m_move=touch["pageY"]-m_start;//负数向上，正数向下
                var bool=targetScroll(this,m_move,one);
                if(bool){
                    event.preventDefault();
                }
            }
        }
    );
}

//判断滚动到顶部是否还继续往上移动
function targetScroll(tar,dir,one){
    tar=tar || window;
    var s=$(tar).scrollTop();
    var child=$(tar).children();
    var w_h=0;
    if(one){
        w_h=$(tar).children('.active').height();
    }else{
        child.each(function(){
            w_h+=$(this).height();
        });
    }
    var d_h=$(tar).height();
    if(one){
        if(dir>0 && s<=0){
            return true;
        }
    }else{
        if((dir>0 && s<=0)
            || (dir<0 && parseInt(s+d_h)>=parseInt(w_h))
        ){
            return true;
        }
    }
}

//通用阻止事件，针对移动端滑动问题
function touchMove(parent,child){
    var c_start=0,c_move=0,childTop=0,diff=0,cTrans=0;
    var c=child;
    //初始获取
    $(parent).on({
        "touchstart":function(event){
            var touch = event.originalEvent.changedTouches[0];
            //设定初始触摸值
            c_start= touch["pageY"];
        },
        "touchmove":function(event){
            event.preventDefault();
            var touch = event.originalEvent.changedTouches[0];
            c_move=touch["pageY"]-c_start;//负数向上，正数向下
            var child=$(this).find(c);

            var pHeight=$(this).height();//获取自身高度
            var cHeight=child.height();//子元素的高度
            if(cHeight>pHeight){
                diff=cHeight-pHeight;
                childTop=cTrans+c_move/2;
                child.removeClass('tran-move').css('transform','translateY('+(childTop)+'px)');
            }
        },
        "touchend":function(event){
            childTop=childTop>=0?0:childTop<=-diff?-diff:childTop;
            $(this).find(child).addClass('tran-move').css('transform','translateY('+childTop+'px)');
            cTrans=childTop;
        }
    });
}
touchMove('.moveParent','.moveChild');

//发送ajax
function sendAjax(type,url,data,suc){
    showMask('loading');
    $.ajax({
        type:type,
        url:url,
        data:data,
        success:suc,
        error:function(XMLHttpRequest, textStatus, errorThrown){
            showMask('alert','请求错误：'+textStatus+' '+errorThrown);
        }
    })
}


/*订单详情页面*/
//点击取消售后按钮，作用与待发货订单页面和待收货订单页面
$('.afterSaleBtn').on('click',function(e){
    e.preventDefault();
    var attr=$(this).attr('data-state');
    var that=this;
    showMask('loading');
    var html="";
    if(attr=='cancel'){ //取消售后按钮
        html="申请";
        attr='apply';
    }else if(attr=='apply'){//申请售后按钮
        html="取消";
        attr='cancel';
    }
    //模拟发送请求的场景
    $.ajax({
        type:'post',
        url:'1首页.html',
        data:null,
        success:function(){
            hideMask('loading-mask');
            $(that).text(html+'售后').attr('data-state',attr)
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            hideMask('loading-mask');
            showMask('alert','请求错误：'+textStatus+' '+errorThrown);
        }
    })
});

//等比例缩放
function equalScaling(width,height){
    var initScale=375;
    var limitWidth=768;
    var htmlSize=20;
    var limitSize=26;
    width=width||innerWidth;
    height=height|| innerHeight;
    //width=width>height?height:width;
    //只要小于initScale时，且是竖屏状态
    var newSize=width*htmlSize/initScale;
    newSize=newSize>=limitSize?limitSize:newSize;
    newSize= parseInt(newSize);
    newSize= newSize%2==0?newSize:newSize+1;
    $('html').css('font-size',newSize);
}

//，凡是购物车页面内会导致按钮状态变化，总金额变化，选中状态的更新，都要调用该方法
function inputValState(){
    var value;
    if($('[data-check="item"]').length==0){
        //没必要继续了
        value=false;
        $('[data-check="all"]').prop('checked',value);
        $('[data-btn="info"]').removeClass('check');
    }
    //更新总金额
    inputVal();
}
//购物车总金额的更新
function inputVal(){
    //寻找到data-input="parent"下的input.value
    var input=$('[data-input="parent"]').find('input.value');
    var total=0;
    input.each(function(){
        var count=parseInt($(this).val());
        var price=$(this).parent().siblings('.price').children('span').text();
        price=parseFloat(price).toFixed(2);
        //还要判断是否选中了这个价格
        var check=$(this).parent().parent().parent().siblings('label').children('input.hide');
        if(check.prop('checked')){
            total+=price*count;
        }
    });
    $('[data-val="input"]').text(total.toFixed(2));
}
//按钮的激活和禁止状态
function btnChange(btn,state){
    if(state=='active'){
        btn.addClass('check');
    }else if(state=='verboten'){
        btn.removeClass('check');
    }
}
//遍历input
function forInput(input,all,info){
    var value=true,notChecked=false;
    input.each(function(){
        var check=$(this).prop('checked');
        if(!check){
            value=false;
        }else{
            notChecked=true;
            //选中的状态调用一次更新总金额的函数
            inputVal();
        }
    });
    all.prop('checked',value);
    if(notChecked){
        btnChange(info,'active');
    }else{
        btnChange(info,'verboten');
        //全都没选中
        inputValState();
    }
}
//点击隐藏的删除按钮，移除整个元素，购物车页面和添加地址页面使用
function moveShowItem(){
    var itemStart= 0,itemMove=0,yStart=0,yEnd=0;
    var limit=80;
    var limitY=100;
    $('.item-move-elm').on({
        "touchstart":function(event){
            var touch = event.originalEvent.changedTouches[0];
            //设定初始触摸值
            itemStart= touch["pageX"];
            yStart= touch["pageY"]
        },
        "touchmove":function(event){
            var touch = event.originalEvent.changedTouches[0];
            itemMove=touch["pageX"]-itemStart;
            yEnd=Math.abs(touch["pageY"]-yStart);
            if(itemMove<=-limit && yEnd<=limitY){
                //即表示现需要显示隐藏项
                $(this).addClass('move')
            }else if(itemMove>=limit){
                $(this).removeClass('move')
            }
        }
    },'.item-move-part').on("click",'.item-delete',function(e){
        e.preventDefault();
        //移除父级元素
        $(this).parent().parent().remove();

        //如果是购物车页面
        forInput($('[data-check="item"]'),$('[data-check="all"]'),$('[data-btn="info"]'));
    })
}

//得到域名，路径，设置读取localStorage
function getPath(){
    var origin=location.origin;//来源
    var pathname=location.pathname;//路径
    var host=localStorage.getItem(origin);//得到当前主域名下的localStorage
    return {origin:origin,pathname:pathname,host:host}
}
function addScrollTop(top,model,parent){
    parent='.mobile-container'|| parent;
    var local=getPath();
    var  someObj;
    if(local.host){
        someObj=JSON.parse(local.host);
        var pathName=someObj[local.pathname];
        if(model=="read"){
            if(pathName){
                //如果已存了该页面的key,则读取里面的scrollTop的值
                $(parent).scrollTop(pathName["scrollTop"]);
            }
        }else if(model=="write"){
            if(!pathName){
                someObj[local.pathname]={};
            }
            someObj[local.pathname]["scrollTop"]=top;
        }
    }else{
        //如果localStorage里没有该域名的key
        someObj={};
        someObj[local.pathname]={"scrollTop":top};
    }
    //最终的someObj是有值的时，才保存给localStorage
    if(someObj){
        localStorage.setItem(local.origin,JSON.stringify(someObj));
    }
}

//轮播显示适应屏幕尺寸变化
function carouselSomeFun(){
    if(!!window.carousel){
        carousel.elemWidth=innerWidth>=768?768:innerWidth;
        $(carousel.target).find('li').css("width",carousel.elemWidth).height(carousel.elemWidth*carousel.ratio).find('img').width(carousel.elemWidth);
    }
}