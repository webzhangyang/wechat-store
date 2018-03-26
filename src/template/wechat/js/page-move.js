/**
 * Created by admin on 2017/10/20.
 */
//上拉出现商品描述,模拟数据
var data= {
    txt:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget odio',
    img:[
        "images/t3.png",
        "images/t2.png",
        "images/t5.png"
    ]
};
//填充函数
function fillHtml(data,txt,img){
    var html='';
    html+='<div class="detail-text">'+data[txt]+'</div>';
    var da=data[img];
    html+='<div class="detail-img">';
    for(var i=0;i<da.length;i++){
        html+='<img src='+da[i]+' alt="图片暂缺"/>'
    }
    html+='</div>';
    return html;
}
//特定的返回按钮
function skip(show){
    if(show.index()==1){
        show.removeClass('nav-top-p').find('.nav').removeClass('fixed');
    }
    show.slideUp(300,function(){
        $(this).removeClass('active').parent().scrollTop(1);
    }).prev().addClass('active').slideDown(300);
}
$(function(){
    var page1=$('.product-page1');
    var page2=$('.product-page2');

    $('.go-top').on('click',function(){
        skip(page2);
    });

    var target=page2.children('.page2-content');
    //对比自身高度与 滚动距离和容器高度的和  的大小
    if(target.html()==''){
        target.html(fillHtml(data,'txt','img'));
    }
    //$('.page2-content').html(fillHtml(data,'txt','img'));

    getPageIndex(".pageShowModel",".pageItem",".pageShowModel",0)
});



function getPageIndex(parentName,childName,scrollCon,index){
    index=index || 0; //想设置为显示的页面块
    scrollCon= scrollCon || window; //滚动的容器
    var limit=90;
    $(parentName).children(childName).removeClass('active').eq(index).addClass('active');

    //为父级绑定滚动和触摸事件
    var moveDown=false,moveUp=false,start=0,move=0,moveNow=0,elmMove=-limit;
    $(parentName).on({
        "scroll":function(){
            var scrollTop=$(this).scrollTop();//滚动的距离
            var conHeight=$(this).height();//容器的高度
            //当前显示出来的页面块的高度
            var activeHeight=$(this).children('.active').height();
            if(scrollTop>=parseInt(Math.abs(activeHeight-conHeight))){
                //当滚动的距离到达底部或者超过底部了
                moveDown=true;//可以往下滑动切换页面块了
                moveUp=false;
            }
            if(scrollTop<=0){
                //当滚动的距离到达底部或者超过顶部了
                moveUp=true;
                moveDown=false;
            }
            //nav条滚动时变固定定位
            var active=$(this).children('.active');
            if(active.index()==1){
                $(active).addClass('nav-top-p').find('.nav').addClass('fixed');
            }else{
                $(this).children().removeClass('nav-top-p').find('.nav').removeClass('fixed');
            }
        },
        "touchstart":function(event){
            var touch = event.originalEvent.changedTouches[0];
            start= touch["pageY"];
            if($(this).index()==1){
                $(this).find('.nav').addClass('fixed');
            }
        },
        "touchmove":function(event){
            var touch = event.originalEvent.changedTouches[0];
            moveNow=touch["pageY"]-start;
            if( moveNow<=-limit && moveDown){
                //显示松手提示
                var info=$('.product-switch');
                var newTxt=info.attr('data-go');
                info.find('.txt').text(newTxt);
                //允许继续移动？？
            }

        },
        "touchend":function(event){
            var touch = event.originalEvent.changedTouches[0];
            move=touch["pageY"]-start;//负数向上滑动，正数向下滑动
            var html=$('.loading-img');
            var info=$('.product-switch');
            if( move<=-limit && moveDown){

                //翻页中间效果
                info.find('.txt').hide().end().find('.loading-img').show();
                html.show();
                //显示一个过渡效果，1s后关闭，可在这时候进行下个页面的加载
                var that=this;
                setTimeout(function(){
                    info.find('.txt').show().text(info.attr('data-do')).end().find('.loading-img').hide();

                    //隐藏当前页面块，向下滑动，显示下一个页面块
                    showOrHide($(that).children(childName+'.active'),"down",childName);
                    moveDown=false;
                },1000);

            }else{
                info.find('.txt').show().text(info.attr('data-do')).end().find('.loading-img').hide();
            }
            if(move>=limit  && moveUp){
                //隐藏当前页面块，向下滑动，显示下一个页面块
                showOrHide($(this).children(childName+'.active'),"up",childName);
                moveUp=false;
            }
        }
    })
}
function showOrHide(nowTarget,direction){
    if(direction=="up"){
        if(nowTarget.prev().length>0){

            if(nowTarget.index()==1){
                nowTarget.removeClass('nav-top-p').find('.nav').removeClass('fixed');
            }

            nowTarget.slideUp(300,function(){
                $(this).removeClass('active').parent().scrollTop(1);
            }).prev().addClass('active').slideDown(300);
        }

    }else if(direction=="down"){
        if(nowTarget.next().length>0){
            nowTarget.slideUp(300,function(){
                $(this).removeClass('active').parent().animate({scrollTop:0},100,'swing');
            }).next().addClass('active').slideDown(300);
        }
    }
}

