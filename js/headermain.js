console.log("模块加载成功1");

/* 
    配置路径
*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "jquery-ui":"jquery-ui.min",
        "parabola":"parabola",
        "index":"index",
        "headerUsername":"headerUsername",
    },
    shim:{
       "jquery-cookie":["jquery"],
       "parabola":{
           exports:"_"
       } 
    }
})

//调用
require(["index","headerUsername"],function(index,headerUsername){
    index.slide();
    index.navs();
    headerUsername.getUsername();

});