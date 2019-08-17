console.log("login模块加载成功");
/* 
    配置路径
*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "jquery-ui":"jquery-ui.min",
        "parabola":"parabola",
        "login":"login",
    },
    shim:{
       "jquery-cookie":["jquery"],
       "parabola":{
           exports:"_"
       } 
    }
})

// 调用
require(["login"],function(login){
    login.verify();
    // login.logindatebase();
});