/**
 * Created by admin on 2017/10/30.
 */
var bodyScroll=0;

//控制body定位的
function showBodyScroll(){
    $('html,body').removeClass('ovfHiden');
    $('.mobile-container').removeClass('fixed');
    $(window).scrollTop(bodyScroll);
}
function hideBodyScroll(){
    bodyScroll=$(window).scrollTop();
    $('html,body').addClass('ovfHiden');
    $('.mobile-container').addClass('fixed').css('top',-bodyScroll);

}
//控制加载中图的
function showLoad(time){
    var body=$('body');
    var load=body.children('.loading-mask'),html;
    if(load.length==0){
        html=$('<div class="stopMove hide loading-mask"><div class="mask-shade"></div><div class="loading mask-content"><img src="images/loading.gif"/></div></div>');
        body.append(html);
    }else if(load.length==1){
        html=load;
    }
    var timer=300;
    html.fadeIn(timer);
    if(time>0){
        //自动三秒后关闭
        setTimeout(function(){
            hideLoad(timer);
        },time);
    }
}
function hideLoad(timer){
    timer=timer || 0;
    $('body').children('.loading-mask').fadeOut(timer);
}
//控制自定义alert的
function myAlert(txt,time,delayed){
    var body=$('body');
    var  html=$('<div class="stopMove hide myMask"><div class="mask-shade"></div><div class="mask-content alert"><div class="alert-txt red">'+txt+'</div></div></div>');
    body.append(html);
    html.show();
    hideBodyScroll();
    time=time || 3000;
    closeAlert(delayed,time-300)
}
function closeAlert(delayed,time){
    showBodyScroll();
    time=time||3000;
    if(delayed){
        //自动三秒后关闭
        setTimeout(function(){
            $('.myMask').animate({opacity:0},300,'swing',function(){
                showBodyScroll();
                $(this).remove();
            })
        },time-300);
    }else{
        $('.myMask').animate({opacity:0},300,'swing',function(){
            showBodyScroll();
            $(this).remove();
        })
    }
}
