console.log("模块加载成功");

/* 
    配置路径
*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "jquery-ui":"jquery-ui.min",
        "parabola":"parabola",
        "list":"list",
    },
    shim:{
       "jquery-cookie":["jquery"],
       "parabola":{
           exports:"_"
       } 
    }
})

//调用
require(["list"],function(list){
    list.shopping();
});