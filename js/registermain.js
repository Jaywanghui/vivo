console.log("register模块加载成功");

require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "register":"register",
    },
})

// 调用
require(["register"],function(register){
    register.register();
});