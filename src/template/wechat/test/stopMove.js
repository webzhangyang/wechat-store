/**
 * Created by admin on 2017/11/8.
 */
//判断滚动到顶部是否还继续往上移动
function tarMove(tar){
    var m_start=0,m_move=0;
    var tarParent=$(tar);

    tarParent.on(
        {
            "touchstart":function(event){
                var touch = event.originalEvent.changedTouches[0];
                //设定初始触摸值
                m_start= touch["pageY"];
            },
            "touchmove":function(event){
                var touch = event.originalEvent.changedTouches[0];
                m_move=touch["pageY"]-m_start;//负数向上，正数向下

                var tarParentMove=$(this).scrollTop();//目标元素父级的滚动距离
                var tarHeight=0;//目标元素的高度，一般都比父级的大
                var child=$(this).children();
                child.each(function(){
                    tarHeight+=$(this).height();
                });
                var tarParentHeight=$(this).height();//目标元素父级的高度

                if(m_move>0 && tarParentMove<=0){
                    //已经到达顶部，还要往上滑动，阻止默认行为
                    event.preventDefault();
                }else if(m_move<0 && tarParentMove>=tarHeight -tarParentHeight){
                    //已经到达底部，还要往上滑动，阻止默认行为
                    event.preventDefault();
                }
            }
        }
    );
}

function allStopMove(tar){
    $(tar).on("touchmove",function(e){
        e.preventDefault();
    })
}
tarMove('.containerStopMove');//上下滑动阻止
allStopMove('.allStopMove');//滑动阻止

////阻止长按事件
document.addEventListener("contextmenu", function(event){
    event.preventDefault();//相当于禁止了默认的右键行为
});