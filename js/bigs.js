/* 遵从AMD规范 */
define(["jquery","jquery-cookie"],function($){
   
        function big(){
            //放大镜
            $("#small").mouseenter(function(){
                $("#big,#mark").show();
            }).mouseleave(function(){
                $("#big,#mark").hide();
                $("#small").css("border","0");
            }).mousemove(function(ev){

                var l = ev.pageX - $(this).offset().left - 129;
                var t = ev.pageY - $(this).offset().top - 129;
                if(l <= 0){
                    l = 0;
                }
                if(l >= 257.5){
                    l = 257.5;
                }
                if(t <= 0){
                    t = 0;
                }
                if(t >= 257.5){
                    t = 257.5;
                }

                $("#mark").css({
                    left: l,
                    top: t
                })


                $("#big img").css({
                    left: -2 * l,
                    top: -2 * t
                })
            })
        }

         //滑入下面的任意一张图片，上面也跟着更换
         function imghover(){
            $(function(){
                $("#spec-item").on("mouseenter","img",function(){
                    $("#small img").css("display","none")
                    .eq($(this).index()).css("display","block");

                $("#big img").attr("src",this.src);
                })
                 
            })
        }

        //轮播
        function  carousel(){
            var timer = null;
           $("#parts-l").click(function(){
            $("#parts-r").css("color","#666666");
                $("#parts-l").css("color","black");
               clearInterval(timer);
               timer = setInterval(function(){
                if($("#frame-ul").position().left < 0){
                    $("#frame-ul").css({
                        // -1012
                        left:$("#frame-ul").position().left + 60
                        // left:-1012,
                    });
                }else{
                    clearInterval(timer);
                }
               },30)
           });

           /* 点击轮播 */
           $("#parts-r").click(function(){
            //    alert(1);
            $("#parts-l").css("color","#666666");
            $("#parts-r").css("color","black");
            clearInterval(timer);
            timer = setInterval(function(){
                if($("#frame-ul").position().left >= -1010){
                    $("#frame-ul").css({
                        // -1012
                        left:$("#frame-ul").position().left - 60
                        // left:-1012,
                    });
                }else{
                    clearInterval(timer);
                }
               },30)
           });

        }

        /* 滑入轮播 */
        $("#frame-ul").on("mouseover","li",function(){
            // $(this).css("height","300");
            $(this).css("marginTop","-1px");
            $(this).css("boxShadow","5px 5px 3px #ccc");
        })
        $("#frame-ul").on("mouseout","li",function(){
            $(this).css("marginTop","0");
            $(this).css("boxShadow","0 0 0 #ffffff");
        })


            //滑动手机固定
        function fixphone(){
            $(window).scroll(function(){
                var Y = $(document).scrollTop();
                if(Y >= 141 && Y <= 1520){
                    $("#prod-container-left").css("position","fixed");
                    // $("#big").css("position","fixed");
                    $("#prod-container-left").css({
                        top:30,
                    })
                    //  $("#big").css({
                        // top:30,
                        // left:0,
                       
                    // })
                  
                }else if(Y > 1520){
                    $("#prod-container-left").css("position","absolute");
                    $("#prod-container-left").css({
                        top:1300,
                        // left:0
                    });
                    // $("#big").css("position","absolute");
                    // $("#big").css({
                    //     top:1300,
                    // });
                }else{
                    $("#prod-container-left").css("position","static")
                    // $("#big").css("position","absolute");
                }

            })
        }


       

        /* conmmentFix */
        function commentFix(){
            $(window).scroll(function(){
                //浏览器的滚动高度
                var y = document.body.scrollTop||document.documentElement.scrollTop;
                //2602
                //浏览器的高度(含滚动)
                // var s = document.body.clientHeight ||document.documentElement.clientHeight;

                //元素的高度
                // var comment = document.getElementById("commentBox").offsetHeight;
                
                // var h = s - comment - comment;
                // console.log(h);
                if(y >= 2602){
                    $("#commentBox").css("position","fixed");
                    $("#commentBox").css({
                        top:0,
                        
                    })
                }else{
                    $("#commentBox").css("position","static");
                }

            })
        }
    
        //选项卡js
        function options(){
            $("#commentBox #comment li").click(function(){
                $("#commentBox #comment li").attr("class","");
                $(this).attr("class", 'active');

                $("#informationBox #information div").css("display","none")
                .eq($(this).index()).css("display","block");
            })
        }



        //加入购物车的功能
        function addshop(){
            $(function(){
                // var name = $("#skuName").html();
                // var price = $("#totalprice").html();
                // var count = $("#countnum #count").html();


        
                //实现商品数量的加减
                var i = 1;
                $("#countnum").on("click","#sum",function(){
                    
                    if(this.innerHTML == "+"){
                        i++;
                        $("#countnum #count").html(i);
                    }else{
                        if(i == 1){
                            alert("数量不能小于1");
                        }else{
                           i--;
                            $("#countnum #count").html(i);
                        }
                    }

                });



                //加入购物车存cookie
                $("#shopping-cart").click(function(){
                    var id = "iphone2";
                    var first = $.cookie("goods") == null?true:false;
                    if(first){
                        //ECM6拼接字符串，id是字符串需要加引号
                        $.cookie("goods", `[{"id":"${id}","num":${i}}]`, {
                            expires: 7
                    });    
                    }else{
                        
                        //2.判断是否第一次添加该商品
                         var same = false;//假设没有添加过
                         var cookieStr = $.cookie("goods");
                         var cookieArr = JSON.parse(cookieStr);
                        
                        for(var j = 0; j < cookieArr.length; j++){
                            if(cookieArr[j].id == id){
                                same = true;
                                cookieArr[j].num = cookieArr[j].num + i;
                                break;
                            }
                        }

                         //3.没有添加过该商品
                        
                        if(!same){  
                            alert(2);
                            var obj = {id:id,num:`${i}`};
                            cookieArr.push(obj);
                        }

                        //4.都要存储cookie
                        $.cookie("goods",JSON.stringify(cookieArr),{
                           expires:7
                        });
                        alert("加入成功");
                     }
                });

                //进入购物车
                $("#shopping-purchase").click(function(){
                    window.open("./shopping-trolley.html");
                });
            })
        }

    return{
        big:big,
        // fix:fix
        carousel:carousel,
        commentFix:commentFix,
        fixphone:fixphone,
        options:options,
        imghover:imghover,
        addshop:addshop,
    }
})