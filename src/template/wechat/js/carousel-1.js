/**
 * Created by admin on 2017/10/12.
 */
/**
 * Created by admin on 2017/10/11.
 */
/*轮播的JS*/

//模拟AJAX发送成功的回调得到的数据
var img=[
    {'images':'images/ab-brand.jpg','img_href':'#brand',index:0},
    //{'images':'images/ab-us.jpg','img_href':'#us',index:1},
    //{'images':'images/dt-search.jpg','img_href':'#search',index:2},
];

var img2=[
    {'images':'images/test1.jpg','img_href':'#brand',index:0},
    {'images':'images/ab-us.jpg','img_href':'#us',index:1},
    {'images':'images/dt-search.jpg','img_href':'#search',index:2}
];


var carousel={
    imgArr:null,//轮播图片数组
    target:null,//目标移动元素ul
    small:null,//小列表
    timer:null,//定时器
    goMove:true,//允许动画继续进行
    moveValue:20,//触摸判断，左右移动起码有20px的距离，才让移动
    elemWidth:0,//元素的宽度，方便设定li的宽度
    dataIndex:'',//数据数组给出标识下标的key
    dataTab:'',//图片名字，标签
    time:3000,//轮播时间间隔
    limit:768,//容器最大宽度限制768

    ratio:375/375, //显示图片的比例

    init:function(vessel,target,small,img,index,tab){/* vessel容器 初始函数 参数是想要安放轮播的容器，默认使用ul>li的html结构*/
        if(img===undefined || vessel===undefined || target===undefined){
            alert('暂时无轮播图片');
            return;
        }
        /*执行各种函数，不在此处定义各种函数*/
        this.imgArr=img;//赋值图片数组
        this.target=target;//赋值目标容器,
        this.small=small?small:null;
        this.dataIndex=index;
        this.elemWidth=vessel.width();
        this.dataTab=tab;
        /*判断是否为首页轮播*/
        if(target.attr('id')=="list"){
            this.ratio=160/375;
        }
        this.updateHtml(img);//首次赋值
        //判断，当数据长度大于1时才注册时间，启动定时器
        if(img.length>1){
            this.eventFunc(vessel);//首次注册事件
            this.myTimer();//启动定时器
        }


    },
    /*注意，要让左右移动均支持PC端和移动端 mousemove mousedown mouseup**/
    //来回轮播的原理就是操作数组的元素的排序，再赋值给容器vessel，然后再启动动画效果
    eventFunc:function(tar){
        //为目标容器注册事件
        //触摸滑动事件
        var _start=0,_move,initMove=0,_yStart=0,_yMove;
        tar.on({
            "touchstart":function(event){
                //清除定时器
               // event.preventDefault();
                window.clearTimeout(carousel.timer);

                var touch = event.originalEvent.changedTouches[0];
                //设定初始触摸值
                _start = touch["pageX"];
                _yStart= touch["pageY"];
                //得到初始左移值
                initMove=parseInt($(this).css('marginLeft'));
            },
            "touchmove":function(event){
                event.preventDefault();
                var touch = event.originalEvent.changedTouches[0];
                _move=touch["pageX"]-_start;
                _yMove=touch["pageY"]-_yStart;

                //得到偏移值，和左移动值相加，得到最后元素应该偏移的值
                _move+=initMove;
                if(_move>carousel.moveValue+initMove){
                    //右滑
                    carousel.moveRight();
                }else if(_move<-carousel.moveValue+initMove){
                    //左滑
                    carousel.moveLeft();
                }

            },
            "touchend":function(event){
                //var touch = event.originalEvent.changedTouches[0];
                //滑动结束后解绑，避免滑动错乱
            },
            "mouseover":function(){
                //清除定时器,鼠标进入
                window.clearTimeout(carousel.timer);
            },
            "mouseout":function(){
                //启动定时器，鼠标出去
                carousel.myTimer();
            }
        });
        //给小的列表注册点击事件
        if(!!this.small){
            this.small.on("click",'li',function(){
                //清除定时器
                window.clearTimeout(carousel.timer);
                //获得点击的li的下标
                var tarindex=$(this).index();
                var nowIndex=$(this).parent().children('.active').index();
                var len=tarindex-nowIndex;

                if(len>0){
                    carousel.moveLeft(len);
                }else if(len<0){
                    carousel.moveRight(len);
                }
            })
        }
    },
    //定时器
    myTimer:function(){
        this.timer=setTimeout(function(){
            carousel.moveLeft();
        },this.time);
    },
    moveLeft:function(move){
        //清除定时器
        window.clearTimeout(carousel.timer);
        //先使元素左移动，动画结束后，操作数组，剪切，再赋值
        if(carousel.goMove==false)return;
        carousel.goMove=false;
        move=!!move?move:1;
        this.target.animate({
                marginLeft:-move*carousel.elemWidth
            },
            300*move,
            'swing',
            function(){
                for(var i=0;i<move;i++){
                    var array=carousel.imgArr;
                    var first=array.shift();
                    array.push(first);
                    //更新视图
                    carousel.updateHtml(array);
                }
                $(this).css('marginLeft',0);
                carousel.goMove=true;
                //启动定时器
                carousel.myTimer();
            }
        )
    },
    moveRight:function(move){
        //清除定时器
        window.clearTimeout(carousel.timer);
        //先将数组末尾部分的提到前边，更新视图，在启动动画
        if(carousel.goMove==false)return;
        carousel.goMove=false;
        move=!!move?move:-1;
        for(var i=0;i<-move;i++){
            var array=carousel.imgArr;
            var first=array.pop();
            array.unshift(first);
            //更新视图
            carousel.updateHtml(array);
        }
        //先设定空一块给要右移的放，在启动动画
        this.target.css({
            marginLeft:carousel.elemWidth*move
        }).animate({
                marginLeft:'0'
            },
            300*-move,
            'swing',function(){
                carousel.goMove=true;
                 carousel.myTimer();//启动定时器
            }
        )
    },
    updateHtml:function(img){
        /*可定制*/
        var html='',someKey='images',someTab='img_href',someIndex='index',someList='',tarIndex=parseInt(img[0][someIndex]);
        for(var i=0;i<img.length;i++){
            /*可定制*/
            if(i==0){
                html+='<li class="active" data-index='+img[i][someIndex]+'><a href="'+img[i][someTab]+'"><img src='+img[i][someKey]+' alt="图片暂缺"/></a></li>';

            }else{
                html+='<li data-index='+img[i][someIndex]+'><a href="'+img[i][someTab]+'"><img src='+img[i][someKey]+' alt="图片暂缺"/></a></li>';
            }
            if(i==tarIndex){
                someList+='<li class="active"></li>';
            }else{
                someList+='<li></li>';
            }

        }
        //得到数组第一位的元素的index值，即为active 的下标

        this.target.html(html).width(img.length*carousel.elemWidth).children('li').width(carousel.elemWidth).height(carousel.elemWidth*carousel.ratio);//给目标容器赋值,同时设定容器的宽度
        if(!!this.small){
            this.small.html(someList); //.children().eq(tarIndex).addClass('active');
        }

    }
};
