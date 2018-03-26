/**
 * Created by admin on 2017/11/8.
 */

$(function(){
    loadImg(".showMoreImg");
});
function loadImg(tar){
    var allParent=$('.container');
    allParent.on('scroll',function(){
        //判断，当滚动到底部时，就加载最近的一个目标元素的子级里的图片
        var sTop=$(this).scrollTop();//父级元素的滚动
        var vHeight=parseFloat($(this).css('height'));//视口的高度
        var tarPar=$(tar).parent();
        var tpHeight=tarPar.height(); //目标元素直接父级的高度
        if(sTop+vHeight>=tpHeight){//滚动到底部了
            //所有p元素的合集
            var child=$(tar).children();
            //循环这些元素
            for(var i=0;i<child.length;i++){
               //得到第i个元素
                var someP=$(tar).children().eq(i);
                //得到里面的img元素
                var img=someP.find('img');
                //获得该元素的偏移
                if(img.length>0){
                    var offTop=img.offset().top;//目标元素的偏移
                    var src=img.attr('src');
                    if(!src){
                        if(offTop-sTop<=vHeight){
                            img.attr('src',img.attr('data-url'));
                            break;
                        }
                    }
                }
            }
        }

    })
}