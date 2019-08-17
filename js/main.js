console.log("模块加载成功");

/* 
    配置路径
*/
require.config({
    paths:{
        "jquery":"jquery-1.10.1.min",
        "jquery-cookie":"jquery.cookie",
        "parabola":"parabola",
        "index":"index",
    },
    shim:{
       "jquery-cookie":["jquery"],
       "parabola":{
           exports:"_"
       } 
    }
})

//调用
require(["index"],function(index){
    index.slide();
});