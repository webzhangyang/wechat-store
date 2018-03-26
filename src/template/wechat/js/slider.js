/**
 * Created by admin on 2017/10/24.
 */
    var data=[iosProvinces,iosCitys,iosCountys];

var slider={
    data:null,
    init:function(data,grandP,touch){
        this.data=data;
        //先更新滑动条的列表
        this.updateElm(data);
        //this.event(grandP,touch);
    },
    event:function(grandP,touch){
        //阻止父级的touchmove事件
        $(grandP).on("touchmove",function(e){
            e.preventDefault();
        });
        //给移动元素的父级写上滑动事件，让子元素移动
    },
    updateElm:function(data){
        for(var i=0;i<data.length;i++){
                for(var r=0;r<data[i].length;r++){
                    var id=data[i][r].id;
                    var value=data[i][r].value;
                    var parentId=data[i][r].parentId;

                }
        }
    },
};

//填充元素的模板
function fillHtml(id,value,parent){

}
slider.init(data);