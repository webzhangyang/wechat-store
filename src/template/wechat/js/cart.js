/**
 * Created by admin on 2017/10/30.
 */
 /*判断参数，以此来显示隐藏底部导航条*/

//读取链接地址中的参数，way,
var way=location.search;
way=way.substr(1);
//判断way
var index=way.indexOf('way');
if(index<0){
    //默认为从底部导航进入
    openPage();
}else{
    var wayArr=way.split('=');
    console.log(wayArr);
    var wayInfo=false;
    for(var i=0;i<wayArr.length;i++){
        if(wayArr[i]=='way'){
            openPage(wayArr[i+1]);
            break;
        }
    }
}

function openPage(way){
    var nav=$('[data-open="nav"]');
    var btn=$('[data-open="btn"]');
    var goBackBtn=$('[data-back="btn"]');
    if(!way || way=='nav'){
        nav.show();
        btn.hide();
        goBackBtn.removeClass('go-back');
    }else if(way=='btn'){
        nav.hide();
        btn.show();
        goBackBtn.addClass('go-back');
    }
}