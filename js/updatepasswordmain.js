console.log("修改模块加载成功");
/* 
    配置路径
*/
require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "updatepassword":"updatepassword",
    },
    shim:{
       "jquery-cookie":["jquery"],
       "parabola":{
           exports:"_"
       } 
    }
})

// 调用
require(["updatepassword"],function(updatepassword){
    updatepassword.update();
    // login.logindatebase();
});