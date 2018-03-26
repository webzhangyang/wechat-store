/**
 * Created by admin on 2017/11/13.
 */
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
//容器的滚动事件——保存滚动值
function containerScroll(con){
    con=window || con;
    $(con).on("scroll",function(){
        addScrollTop($(this).scrollTop(),"write");
    })
}

/*调用函数*/
$(function(){
    //读取滚动值
    setTimeout(function(){
        //利用定时器的函数是在所有函数执行完毕之后才执行的这个特性，来读取当前页面的localStorage
        if(addScrollTop!==undefined){
            addScrollTop(0,"read");
            //如果有滚动条的元素是html或者body或者其他容器.other，则函数的调用方法是
            //addScrollTop(0,"read","html");
            //addScrollTop(0,"read","body");
            //addScrollTop(0,"read",".other");
        }
    },20);
    containerScroll();
});

