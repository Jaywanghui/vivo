define(["jquery","jquery-cookie"],function($){
    //正则验证帐号密码 
    
    function verify(){
        $(function(){

            //判断手机号
            var i = false;
            var j = false;
            $("#phone-box").blur(function(){
                var oValue = this.value;
                if(oValue.length != 11){
                    $("#accounts #message").html("手机号长度不正确");
                    $("#accounts #message").css({
                        display:"block",
                        color:"red",
                    });
                }else{
                    if(/^1[^46]\d{9}$/.test(oValue)){
                       
                        i = true;
                    }else{
                        $("#accounts #message").html("手机号验证失败");
                        $("#accounts #message").css({
                            display:"block",
                            color:"red",
                        });
                    }
                }
                
            })


            //跳转到注册页面
            $("#register-btn").click(function(){
                window.open("../html/register.html");
            })
            //判断密码
            $("#pwd-box").blur(function(){
                var oValue = this.value;
                if(oValue.length < 6 || oValue.length >18){
                    $("#accounts #message").html("密码验证失败");
                    $("#accounts #message").css({
                        display:"block",
                        color:"red",
                    });
                }else{
                   
                    j = true;
                }
            })



            //连接数据库
            $(".login-btn").click(function(){
                 
                 if(i == true && j == true){  
                    $.ajax({
                   
                        type:"post",
                        url:"../php/login.php",
                        data:{
                            
                            username:$("#phone-box").val(),
                            password:$("#pwd-box").val()
                        },
                        success:function(result){
                            if(result == "登录成功"){
                                $.cookie("username",`${$("#phone-box").val()}`,{
                                    expires: 7
                                });
                                var con = confirm("是否修改密码?");
                                if(con){
                                    window.open("./updatepassword.html?" + $("#phone-box").val());
                                }else{ 
                                    alert("登录成功");
                                    window.open("../index.html?" + $("#phone-box").val());
                                }
                                
                            }else{
                                alert("用户名或密码有错误");
                            }
                        },
                        error:function(msg){
                            alert(msg);
                        }        
                    });
                }else{
                    alert("请完成登录验证,再尝试登录");
                }  
            })
        })
    }




    
   



     return{
         verify:verify,
        //  logindatebase:logindatebase,
     }
})