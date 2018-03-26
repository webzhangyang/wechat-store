/**
 * Created by admin on 2017/10/17.
 */
/*通过产生多个列的DIV，是这些DIV平行排列，在DIV内部进行块级内容填充，形成瀑布流*/
//此处是对纯CSS瀑布流布局的内容的补充，即它没办法按一行一行的方式排列
var PinterData=[
    {img:'images/t4.png',txt:'EDDY弹簧避震 弹簧避震 弹簧避震 适用于一起系列 正品改装短弹簧',nowPrice:99.00,oldPrice:99.00,index:0},
    {img:'images/t3.png',txt:'正品改装短弹簧 EDDY弹簧避震 弹簧避震 弹簧避震 适用于一起系列 ',nowPrice:99.00,oldPrice:99.00,index:1},
    {img:'images/t2.png',txt:'弹簧避震 EDDY弹簧避震 弹簧避震 适用于一起系列 正品改装短弹簧',nowPrice:99.00,oldPrice:99.00,index:2},
    {img:'images/t5.png',txt:'适用于一起系列 EDDY弹簧避震 弹簧避震 弹簧避震 正品改装短弹簧',nowPrice:99.00,oldPrice:99.00,index:3},
    {img:'images/t4.png',txt:'适用于一起系列 EDDY弹簧避震 弹簧避震 弹簧避震 正品改装短弹簧',nowPrice:99.00,oldPrice:99.00,index:3},
    {img:'images/t3.png',txt:'适用于一起系列 EDDY弹簧避震 弹簧避震 弹簧避震 正品改装短弹簧',nowPrice:99.00,oldPrice:99.00,index:3},
];
var Pinter={
    column:null,//瀑布流的列数
    container:null,
    data:null,
    init:function(con,data,col,show){
        if(!con || !data)return;//只要目标容器或者数据不存在，就不要继续了，返回
        this.container=con;
        this.data=data;
        this.column=!!col?col:2;
        this.showTxt=show;
        this.colContainer(con,this.column);
        //此处更改数据中的key值！！！
        this.WaterFall(data,"img","txt","nowPrice","oldPrice","index");//此处更改数据中的key值！！！
        //此处更改数据中的key值！！！
        //this.event();

    },
    //注册事件
    event:function(con){

    },
    //生产需要的列数子容器
    colContainer:function(con,col){
        var html='';
        for(var i=0;i<col;i++){
            html+='<div class="rec-d-row water-col" data-index="'+i+'" ></div>'
        }
        con.html(html);
    },
    //生成一个瀑布块
    WaterFall:function(data,img,txt,newPrice,oldPrice,index){
        var html='';
        //$(this.container).empty();//先清空已有的内容？？
        for(var i=0;i<data.length;i++){
            html='<div class="row-detail water-detail" data-index="'+data[i][index]+'">' +
                    '<a href="#">' +
                        '<div class="row-d-img detail-img">' +
                            '<img src="'+data[i][img]+'" alt=""/>' +
                        '</div>' +
                        '<p class="row-d-text">'+data[i][txt]+'</p>' +
                    '</a>' +
                    '<div class="row-d-info">' +
                        '<div class="info-l">' +
                            '<p class="now-price">￥<span class="span">'+data[i][newPrice]+'</span></p>' +
                            '<p class="old-price">￥<span>'+data[i][oldPrice]+'</span></p>' +
                        '</div> ' ;
                    if(this.showTxt=="sale"){
                        html+='<p class="info-r  l-small">月销售<span>20</span>件</p>';
                    }else if(this.showTxt=='cart' || !this.showTxt){
                        html+='<a class="info-r addCartNum" href="#" >' +
                                    '<i class="icon-base i-car-add"></i></a>';
                    }
              html+='</div></div>';
            //判断该数据应该在哪个列表里
            var num=i % this.column;
            $(this.container).children().eq(num).append(html);
        }
    }
};
