
define(["jquery","jquery-ui","jquery-cookie"],function($){
    //首页下拉动画
    // headerUsername.getUsername();

    var urls = window.location.search.substring(1);
   if(urls){
        $("#headerBox #header #header-user").html("欢迎回来" + urls);
            $("#headerBox #header #header-user").css({
                color:"skyblue",
                paddingTop:"7px",
            });
   }
    
    function slide(){
       
        $(function(){
           $("#navBox").on("mouseenter",".box",function(){
                var s = $(this).index()-1
                if(s <8){
                    $("#navBox section").stop().animate({
                        height:310,  
                    },500)
    
                    $("#navBox section").css("display","block");  
                }else{
                    $("#navBox section").css("display","none");
                }

               
            })

            $("#navBox").mouseleave(function(){
                 $("#navBox section").stop().animate({
                    height:0,
                },500)
           })


            $("#navBox").on("mouseenter",".box",function(){
               
                $("#navBox ul").stop().animate({
                    height:0,
                },0);
                var s = $(this).index()-2;
                
                $(`#navBox #iqoo ul:eq(${s})`).stop().animate({
                    height:310
                },500)
            })
        })        
    }


    //首页banner滚动
    function roll(){
        $(function(){
            var iNow = 0; //代表现在是第几张图片在显示
            var timer = null;
            var aBtns = $("#bannerBox").find("ol").find("li");
            $("#bannerBox ol").on("click","li",function(){
                iNow = $(this).index();
				tab();
            })
            //启动定时器让他自动切换
            timer = setInterval(function(){
                iNow++;
                tab();
                // document.title = iNow;
            }, 2000);

            $("#bannerBox").mouseenter(function(){
                clearInterval(timer);
            }).mouseleave(function(){
                timer = setInterval(function(){
                    iNow++;
                    tab();
                    
                }, 2000);
            })

            //封装一个切换图片和切换按钮的函数
            function tab(){
                aBtns.attr("class", '').eq(iNow).attr("class", 'active');
                if(iNow == aBtns.size()){
                    //当下标=5的时候，说明是最后一张图片
                    aBtns.eq(0).attr("class", 'active');
                }



                $("#bannerBox #banner-ul").animate({top: -iNow * 523}, 500, function(){
                    //判断是否是最后一张图片
                    if(iNow == aBtns.size()){
                        iNow = 0;
                        $("#bannerBox #banner-ul").css("top", 0);
                    }
                });
            }



        })
    }

    //侧边栏滑入出现
    function sideBar(){
        $(function(){
            $("#sidebar").on("mouseenter","li",function(){
                $("#sidebarBox section").eq($(this).index()).css("display","block");

                if($("#sidebarBox section").eq($(this).index()).css("display","block")){
                    $("#sidebarBox section").eq($(this).index()).mouseenter(function(){
                        $(this).css("display","block");
                    }).mouseleave(function(){
                        $(this).css("display","none");
                    })
                }else{
                    $("#sidebarBox section").eq($(this).index()).css("display","none")
                }

            })

            $("#sidebar").on("mouseleave","li",function(){
                $("#sidebarBox section").eq($(this).index()).css("display","none")
            })
        })
    }



    //下载contentTop数据
    function contentTop(){
        $(function(){
            $.ajax({
                url:"../data/contentTop.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var node = $(
                            ` <li><img src="${arr[i].img}" alt=""></li>
                            `
                        )
                        node.appendTo('#contentBox #content #con-top');
                    }
                },
                error:function(error){
                    alert(error);
                }
            })
        
        })



    }


    //抢购轮播
    function rush(){
        $(function(){
            
            var i = 0;
            
            $("#goo-left").click(function(){
                if(i >= 4){
                    i = 4;
                }

                i--;

                if(i == 3){
                    $("#goo-right").css("opacity","1");
                }

               

                if(i <= 0){
                    $("#goo-left").css("opacity","0.2");
                }else{
                    $("#goo-left").css("opacity","1");
                }
               

                if(i <= -1){
                    $("#rush-goo").find("#rush-good").css("left","0");
                }else{
                    
                    $("#rush-goo").find("#rush-good").stop(true).animate({left:-302.5*i},500);
                }
               
            })


            $("#goo-right").click(function(){
                i++;
                
                if(i <= 0){
                    i=1;
                }else{
                    $("#goo-left").css("opacity","1");
                }


                if(i >= 4){
                    $("#goo-right").css("opacity","0.2");
                }

                if(i >= 5){
                    $("#rush-goo").find("#rush-good").css("left","-1210");
                }else{
                    $("#rush-goo #rush-good").stop().animate({left:-302.5*i},500);
                }   
            })
        })
    }


    //抢购倒计时
    function countTime(){
        $(function(){
            var timer = setInterval(function(){
                var endtime = new Date(2019,7,18,20,00).getTime();
                var nowtime = new Date().getTime();
                var time = (parseInt(endtime - nowtime));

                //得到天数
                var day = doubleNum(parseInt(time / 1000 / 60 / 60 / 24));
                //得到取整后天数毫秒数
                var dayms = day * 1000 * 60 * 60 * 24;  
                //得到小时的总毫秒数
                 var hours = time - dayms;
                 //得到小时
                 var hour = doubleNum(parseInt(hours / 60 / 60 / 1000));
                //得到取整后天数和小时的总毫秒数
                var minutems = hour * 60 * 60 * 1000 + dayms;
                //得到分钟总毫秒数
                var minutes = time - minutems;
                var minute = doubleNum(parseInt(minutes / 60 /1000));
                //得到取证后天数和小时和分钟的总秒数
                var secondms = minute * 60 * 1000 + minutems;
                var seconds = time - secondms;
                var second = doubleNum(parseInt(seconds / 1000));
                
               
                $("#time-day").html(day);
                $("#time-hour").html(hour);
                $("#time-minute").html(minute);
                $("#time-second").html(second);
                
            },1000);

            
        })
    }

           //单数变双数
    function doubleNum(num){
        if(num < 10){
            return "0" +num;
        }else{
            return num;
        }
    }
   


    //下载rush的数据
    function rushdata(){
        $(function(){
            $.ajax({
                url:"../data/rush.json",
                success:function(arr){
                    for(var i = 0; i < arr.length ;i++){
                        var node = $(`
                            <li>
                                <a id = "prod-a" href="">
                                    <img id = 'kill' src="${arr[i].kill}" alt="">
                                    <img id="prod-img" src="${arr[i].img}" alt="">
                                </a>
                                <div id = 'prod-info'>
                                    <p id = 'prod-name'>${arr[i].name}</p>
                                    <p id = 'prod-desc'>${arr[i].desc}</p>
                                    <div id = 'price'>
                                        <span id = 'new-price'>${arr[i].newprice}</span>
                                        <span id = 'old-price'>${arr[i].oldprice}</span>
                                    </div>
                                </div>
                            </li>
                        `)
                        node.appendTo("#rush-good");
                    }
                },
                error:function(error){
                    alert(error);
                }
            });
        })
    }



    function prefectures(){
        $(function(){
            $.ajax({
                url:"../data/prefecture.json",
                success:function(arr){
                    for(var i = 0; i < arr.length;i++){
                        var node = $(
                            `
                            <li>
                                <a href="">
                                    <img src="${arr[i].img}" alt="">
                                </a>
                                <p id = 'name'>${arr[i].name}</p>
                                <p id = 'feature'>${arr[i].feature}</p>
                                <p id = 'pricermb'>${arr[i].pricermb}</p>
                            </li>
        
                            `
                        );
                        node.appendTo("#prefecture-good");
                    }
                },
                error:function(error){
                    alert(error);
                }
            })
        })
    }


    //加载iphone数据
    function iphones(){
        $(function(){
            $.ajax({
                url:"../data/iphone.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var node = $(`
                            <li>
                                <a href=""><img src="${arr[i].img}" alt=""></a>
                                <p id = 'name'>${arr[i].name}</p>
                                <p id = 'feature'>${arr[i].feature}</p>
                                <p id = 'pricermb'>${arr[i].pricermb}</p>
                            </li>
                        `);
                        node.appendTo("#iphone-good");
                    }
                },
                error:function(error){
                    alert(error);
                }
            })
        })
    }



    //加载parts数据
    function parts(){
        $(function(){
            $.ajax({
                url:"../data/parts.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var node = $(`
                        <li>
                            <a href="">
                                <img src="${arr[i].img}" alt="">
                            </a>
                            <p id = 'name'>${arr[i].name}</p>
                            <p id = 'feature'>${arr[i].feature}</p>
                            <p id = 'pricermb'>${arr[i].pricermb}</p>
                        </li>
                        `);
                        node.appendTo("#parts-good");
                    }
                },
                error:function(arr){
                    alert(arr);
                }
            });
        })
    }



    //下载侧边栏的数据
    function sidebars(){
        $(function(){
            $.ajax({
                url:"../data/sidebar.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var node1 = $(`
                            <li>
                                <a href="#">${arr[i].name}</a><span class="iconfont">${arr[i].icon}</span>  
                            </li>
                        `);
                        node1.appendTo("#sidebar");

                        
                        if(i == 0){
                            var node2 = $(`
                            <section id = "side">
                                <article id = 'category-details'> 
                                    <p id = 'category-title'></p>
                                    <ul id = 'category-sub'></ul>
                                    <ul id = 'category-product'></ul>
                                </article>
                            </section>    
                            `);
                        }else{
                            var node2 = $(`
                            <section id = "side">
                                <article id = 'category-details'> 
                                    <p id = 'category-title'></p>
                                    <ul id = 'category-product'></ul>
                                </article>
                            </section>    
                            `);
                        }
                       
                        
                        var topchild = arr[i].topchild;
                        for(var j = 0; j < topchild.length; j++){
                            var node3 = $(`
                                <span id = 'side-top-left'>${topchild[j].titleleft}</span>
                                <span id = 'side-top-right'>${topchild[j].titleright}<i class="iconfont">&#xe629;</i></span>
                            `);
                            node3.appendTo(node2.find(" #category-details p"));    
                        }
                        
                        
                        var centerchild = arr[i].centerchild;
                        if(i == 0){
                            for(var k = 0; k < centerchild.length; k++){
                                var node4 = $(`
                                    <li>
                                        <a href = "">
                                            <img src="${centerchild[k].img}" alt="">
                                        </a>
                                    </li>
                                `);
                                node4.appendTo(node2.find("#category-details #category-sub"));
                            }
                        }


                       var bottomchild = arr[i].bottomchild;
                       for(var l = 0 ; l < bottomchild.length; l++){
                           var s = bottomchild[l].icon;
                           if(s){
                                var node5 = $(`
                                <li>
                                    <img src="${bottomchild[l].img}" alt="">
                                    <i class = "iconfont">${bottomchild[l].icon}</i>
                                    <span>${bottomchild[l].desc}</span>
                                </li>
                                `);
                           }else{
                                var node5 = $(`
                                <li>
                                    <img src="${bottomchild[l].img}" alt="">
                                    <span>${bottomchild[l].desc}</span>
                                </li>
                                `);
                           }
                            node5.appendTo(node2.find("#category-product"));
                       }
                       node2.appendTo("#sidebarBox");
                    }
                   
                   
                },
                error:function(error){
                    alert(error);
                }
            });
        })
    }

    //下载数据nav
    function navs(){
        $(function(){
            $.ajax({
                url:"../data/nav.json",
                success:function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var node = $(`
                        <a class = "iqo box" href="">${arr[i].title}</a>

                        `);
                        node.appendTo(".nav");

                        var node2 = $(`
                                <ul id="ul1"></ul>
                        `);
                        node2.appendTo('#iqoo');
                        
                        var childli = arr[i].childli;
                        if(childli){
                            // alert(1)
                            for(var j = 0; j < childli.length; j++){
                               // alert(1);
                                if(childli[j].news){
                                   // alert(${childli[j].img});
                                   //console.log(childli[j].img);
                                    var node3 = $(`
                                        <li>
                                            <a id = 'product-des' href="">
                                                <img src="${childli[j].img}" alt="">
                                                
                                                <p id = 'product-name'>${childli[j].name}</p>
                                                <p id = 'product-icon'>${childli[j].news}</p>
                                            </a>
                                        </li>
                                    `);
                                    node3.appendTo(node2);
                                }else{
                                    var node3 = $(`
                                        <li>
                                            <a id = 'product-des' href="">
                                                <img src="${childli[j].img}" alt="">
                                                <p id = 'product-name'>${childli[j].name}</p>
                                            </a>
                                        </li>
                                    `);
                                    node3.appendTo(node2);
                                }
                            }
                            var childspan = arr[i].childspan;
                            for(var k = 0; k < 1;k++){
                                var node4 = $(`
                                    <div id = 'product-span'>
                                        <a href="">
                                            <i class="iconfont">&#xe61f;</i>
                                            <span>${childspan[k].namea}</span>
                                        </a>
                                         <a href="">
                                             <i class="iconfont">&#xe691;</i>
                                             <span>${childspan[k].nameb}</span>
                                        </a>
                                    </div>
                                `);
                                node4.appendTo(node2);
                            }
                        }
                    
                    }


                },
                error:function(error){
                    alert(error);
                }
            });
        })
    }


    //content-top效果
    $("#content #con-top").on("mouseenter","li",function(){
        $(this).css("marginTop","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
    }).on("mouseleave","li",function(){
        $(this).css("marginTop","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })


    //热卖效果
    $("#prefecture-good").on("mouseenter","li",function(){
        $(this).css("marginTop","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
    }).on("mouseleave","li",function(){
        $(this).css("marginTop","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })

    //精品手机效果
    $("#iphone-good").on("mouseenter","li",function(){
        $(this).css("marginTop","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
    }).on("mouseleave","li",function(){
        $(this).css("marginTop","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })


    //精品配件
    $("#parts-good").on("mouseenter","li",function(){
        $(this).css("marginTop","-2px");
        $(this).css("boxShadow","10px 10px 10px #ccc");
    }).on("mouseleave","li",function(){
        $(this).css("marginTop","0");
        $(this).css("boxShadow","0 0 0 #ffffff");
    })


    //进行跳转手机商品列表
    $("#con-top").on("click","li:first",function(){
        window.open("./html/product_list.html");
    });
    //跳转购物车
    $("#header").on("click","#header-shop",function(){
        window.open("./html/shopping-trolley.html");
    });
    //跳转登录
    $("#header").on("click","#header-login",function(){
        window.open("./html/login.html");
    });
    $("#header").on("click","#header-register",function(){
        window.open("./html/register.html");
    });

    return{
        slide:slide,
        roll:roll,
        sideBar:sideBar,
        contentTop:contentTop,
        rush:rush,
        rushdata:rushdata,
        prefectures:prefectures,
        iphones:iphones,
        parts:parts,
        sidebars:sidebars,
        navs:navs,
        countTime:countTime,
        //  getUsername:getUsername,
    }
})
