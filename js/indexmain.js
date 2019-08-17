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
        "index":"index",
        "headerUsername":"headerUsername"
    },
    shim:{
       "jquery-cookie":["jquery"],
       "parabola":{
           exports:"_"
       } 
    }
})

//调用
require(["index",],function(index){
    index.slide();
    index.roll();
    index.sideBar();
    index.contentTop();
    index.rush();
    index.rushdata();
    index.prefectures();
    index.iphones();
    index.parts();
    index.sidebars();
    index.navs();
    index.countTime();  
    // index.getUsername();
    
});