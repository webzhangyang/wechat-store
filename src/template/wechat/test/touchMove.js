/**
 * Created by admin on 2017/11/7.
 */
var myMove=function(target,custom){
    this.min=0;
    if(custom){
        this.target=$(target);
        this.height=this.target.height();//目标元素的高度
        this.vesselH=this.target.parent().height();//容器的高度
        this.topMove=this.target.scrollTop();

    }else{
        this.height=$('body').height();//目标元素的高度
        this.vesselH=innerHeight;//容器的高度
        this.topMove=$(window).scrollTop();//已产生的滚动
        this.target=$('html');
    }

    this.event=function(){
        //获取元素初始的滚动距离
        var start=0,move=0,that=this;
        var top=-that.topMove;
        $(target).on({
            "touchstart":function(event){
                var touch = event.originalEvent.changedTouches[0];
                //设定初始触摸值
                start= touch["pageY"];
                $(this).removeClass('c3-move');
                that.height=$(this).height();
                that.max=that.vesselH<that.height?that.height-that.vesselH:0;
                top=parseFloat($(this).attr('data-top')) || 0;
                console.log(that.min,top,that.max);
            },
            "touchmove":function(event){
                console.log(event);
                event.preventDefault();
                var touch = event.originalEvent.changedTouches[0];
               move=touch["pageY"]-start;
                //得到偏移值
                move+=top;
                move=parseInt(move*1.2);
                //赋值给目标元素使其位移
                //$(this).css({'transform':'translateY('+move+'px)'});
                $(that.target).scrollTop(move);
            },
            "touchend":function(event){
                top=decide(this,move,that.min,that.max);//记录下发生的位移值
                $(this).attr('data-top',top);
            }
        })
    };
    //判定元素的位移，使其位移值Y轴小于最小值，大于最大值0，
    function decide(tar,top,min,max){
        top=top>=max?max:top<=min?min:top;
        $(tar).addClass('c3-move').scrollTop(top);
        return top;
    }
};