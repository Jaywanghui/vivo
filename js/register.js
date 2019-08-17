define(["jquery"],function($){
    function register(){
        $(function(){
            var i = false;
            var j = false;
            var k = false;
            var t = false;
            //正则判断手机号        
            $("#phone_number").blur(function(){
                var oValue = this.value;
                if(oValue.length != 11){
                    $("#inner-box #message1").html("请输入有效的手机号");
                    $("#inner-box #message1").css({
                        display:"block",
                        color:"red",
                    });
                }else{
                    if(/^1[^46]\d{9}$/.test(oValue)){
                        $("#inner-box #message1").html("手机号验证成功");
                        $("#inner-box #message1").css({
                            display:"block",
                            color:"green",
                        });
                        i = true;
                    }else{
                        $("#inner-box #message1").html("手机号验证失败");
                        $("#inner-box #message1").css({
                            display:"block",
                            color:"red",
                        });
                    }
                }
            })
            
            //正则判断密码
            $("#pass").blur(function(){
                var oValue = this.value;
                if(oValue.length < 6 || oValue.length > 16){
                    $("#inner-box #message2").html("密码长度不正确");
                    $("#inner-box #message2").css({
                        display:"block",
                        color:"red",
                    });
                }
            })

            //验证密码强度
            $("#pass").keyup(function(){
                var oValue =this.value; 
                if(oValue.length > 5){
                    
                    $("#boxhe b").css({
                        display:"block",
                    })
                    //先让所有的颜色变灰
                    $("#inner-box #boxhe b").css("backgroundColor","grey");

                    if(/^[0-9]+$/.test(oValue) || /^[a-z]+$/.test(oValue) || /^[A-Z]+$/.test(oValue)){
                        $("#inner-box #boxhe b:eq(0)").css("backgroundColor","green");
                        $("#inner-box #message2").html("密码格式正确");
                        $("#inner-box #message2").css({
                            display:"block",
                            color:"green",
                        });
                        j = true;
                    }else if(/[a-z]+/.test(oValue) && /[A-Z]+/.test(oValue) && /\d+/.test(oValue)){
                        $("#inner-box #boxhe b:eq(2)").css("backgroundColor","green");
                        $("#inner-box #message2").html("密码格式正确");
                        $("#inner-box #message2").css({
                            display:"block",
                            color:"green",
                        });
                        j = true;
                    }else{
                        
                        $("#inner-box #boxhe b:eq(1)").css("backgroundColor","green");
                        $("#inner-box #message2").html("密码格式正确");
                        $("#inner-box #message2").css({
                            display:"block",
                            color:"green",
                        });
                        j = true;
                    }
                }
            })
            //判断新密码
            $("#newpass").blur(function(){
                if((this.value == $("#pass").val()) && this.value != ''){ 
                   $("#inner-box #message3").html("通过,密码一致");
                   $("#inner-box #message3").css({
                        display:"block",
                        color:"green",
                    });
                    k = true;
                }else{
                    $("#inner-box #message3").html("密码不一致");
                    $("#inner-box #message3").css({
                        display:"block",
                        color:"red",
                    });
                }
            })
           
            //连接数据库
            $("#register-btn").click(function(){
                
                if($("input").is(":checked")){
                    t = true;
                }
                if(i == true && j == true && k == true && t == true){
                    $.ajax({
                        type:"post",
                        url:"../php/register.php",
                        data:{
                            username:$("#phone_number").val(),
                            password:$("#pass").val(),
                            addtime:(new Date()).getTime()
                        },
                        success:function(result){
                            if(result == "注册成功"){
                                alert(result);
                                window.open("./login.html");
                            }else if(result == "手机号已被注册过"){
                                alert(result);
                            }else{
                                alert("注册失败");
                            }
                        },
                        error:function(msg){
                            // alert(msg);
                        }        
                    });
                }else{
                    alert("请完成注册的验证,再尝试注册");
                }
            })














        })
    }
    return{
        register:register,
    }
})