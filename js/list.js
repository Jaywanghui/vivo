define(["jquery","jquery-ui","jquery-cookie","parabola"],function($){
    
    //购物车数据及相关操作
    function shopping(){
        $(function(){
            
            sc_num();
            sc_msg();

            $.ajax({
                url:"../data/lists.json",
                success:function(arr){
                    
                    for(var i = 0; i < arr.length; i++){
                        var node = $(`
                            <li>
                                <a href="">
                                    <img src="${arr[i].img}" alt="">
                                </a>
                                <p id = 'name'>${arr[i].name}</p>
                                <p id = 'feature'>${arr[i].feature}</p>
                                <div id = 'price-shop'>
                                    <span>${arr[i].pricermb}</span>
                                    <i id ='${arr[i].id}' class="iconfont add-btn">&#xe61d;</i>
                                </div>
                            </li>
                        `);
                        node.appendTo("#list-ul");
                    }
                },
                error:function(error){
                    alert(error);
                }
            });
            

             //商品列表跳转购物车
             $("#gouwuche .join").click(function(){
                window.open("shopping-trolley.html");
            });





            /*
                购物车商品通过cookie 进行缓存
            */
            $("#list-ul").on("click",".add-btn",function(){
                var id = this.id;
                /* 
                    cookie的存储空间是有限的，只能存储json格式字符串，所以存下面内容就行了
                        1.商品id
                        2.商品数量
                    想存id,又想存数量，而且存储的不只一个商品，所以结构最好是一个商品一个对象，几个商品放在一个数组里，然而cookie无法存数组
                    所以转成jsoni格式的字符串，所以到时候取出来就转成数据结构
                */
                
                    
                
                //1.判断是否第一次添加商品
               var first = $.cookie("goods") == null?true:false;
               if(first){
                     //ECM6拼接字符串，id是字符串需要加引号
                   $.cookie("goods", `[{"id":"${id}","num":1}]`, {
                       expires: 7
                   });    
                   }else{
                       //2.判断是否第一次添加该商品
                       var same = false;//假设没有添加过
                       var cookieStr = $.cookie("goods");
                       var cookieArr = JSON.parse(cookieStr);
                       for(var i = 0; i < cookieArr.length; i++){
                           if(cookieArr[i].id == id){
                               same = true;
                               cookieArr[i].num++;
                               break;
                           }
                       }

                       //3.没有添加过该商品
                       if(!same){
                           var obj = {id:id,num:1};
                           cookieArr.push(obj);
                       }

                       //4.都要存储cookie
                       $.cookie("goods",JSON.stringify(cookieArr),{
                           expires:7
                       });
                   }
                //  alert($.cookie("goods"));
                sc_num();
                sc_msg();
                 ballMove(this);

            })
                
            

             //给右侧的购物车添加移入和移出效果
             $(".sc_right").mouseenter(function(){
                $(this).stop().animate({
                    right:0
                },500)
            }).mouseleave(function(){
                $(this).stop().animate({
                    right:-270
                },500)
            })





                //6抛物线运动的函数
                /* 我们要知道点击谁，然后从小球就从哪里开始出现 */
                function ballMove(node){
                    //传入当前点击的按钮
                    $("#ball").css({
                        left:$(node).offset().left,
                        top:$(node).offset().top,
                        display:"block"
                    })
                    //小球偏移量
                    var X = $(".sc_right .sc_pic").offset().left - $("#ball").offset().left;
                    var Y = $(".sc_right .sc_pic").offset().top - $("#ball").offset().top; 

                    //1.创建抛物线对象
                    var bool = new Parabola({
                        el: "#ball",
                        offset: [X,Y],
                        duration:500,
                        curvature:0.0005,
                        callback:function(){
                            $("#ball").hide();
                        }
                    });
                    bool.start();
                    
                }



                 //7.添加删除按钮
                 $(".clear").click(function(){
                    $.cookie("goods",null);
                    sc_num();
                    sc_msg();
                })


                //8.给右侧的购物车的删除按钮添加事件，点击删除商品数据
                //后添加的节点都用事件委托
                $(".sc_right ul").on("click",".sc_deleteBtn",function(){
                    var id = this.id;
                    /* 
                        删除当前这条商品
                            1.删除当前这条商品的cookie
                            2.页面上显示的标签也要删除
                     */
                     //往父元素找一个最近的li删除
                    $(this).closest("li").remove();
                    //上面这一句只是删除了页面上的节点，但是cookie没删除，所以如下
                    var cookieArr = JSON.parse($.cookie("goods"));
                    for(var i = 0; i < cookieArr.length; i++){
                        if(cookieArr[i].id == id){
                            cookieArr.splice(i,1);
                            break;
                        }
                    }
                    //如果上面数据为0了，直接将cookie删除就行了,如果不为0，再将cookie存回去就行了
                    if(cookieArr.length == 0){
                        $.cookie("goods",null);
                    }else{
                        $.cookie("goods",JSON.stringify(cookieArr),{
                            expires:7,
                        });
                    }
                    //删除时，右侧购物车图片的数量也得跟着变化
                    sc_num();
                })





                //9.实现右侧购物车的商品数量加减
                $(".sc_right ul").on("click",".sc_NumBtn",function(){
                    var id = $(this).closest("li").attr("id");
                    var cookieArr = JSON.parse($.cookie("goods"));
                    for(var i = 0; i < cookieArr.length; i++){
                        if(cookieArr[i].id == id){
                            break;
                        }
                    }

                    if(this.innerHTML == "+"){
                        cookieArr[i].num++;
                        $(this).nextAll("span").html(cookieArr[i].num);
                    }else{
                        if(cookieArr[i].num == 1){
                            alert("数量不能小于1");
                        }else{
                            cookieArr[i].num--;
                            $(this).prevAll("span").html(cookieArr[i].num);
                        }
                    }

                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires:7
                    })
                    sc_num();
                });





                  //5.加载购物车数据
                /* 
                    当时存cookie时只存了id和num,现在还需要商品信息
                    商品信息现在存储在Json格式的字符串里
                    【注】还是通过ajax将数据下载下来，然后通过cookie存储的商品的id，然后通过cookie id判断哪些商品加载在购物车里
                 */






                function sc_msg(){
                    $.ajax({
                        url:"../data/lists.json",
                        success:function(arr){
                            //判断哪些商品被添加在cookie里
                            var cookieStr = $.cookie("goods");
                            if(cookieStr){
                                var cookieArr = JSON.parse(cookieStr);
                                var newArr = [];
                                for(var i = 0 ; i < arr.length; i++){
                                    for(var j = 0; j < cookieArr.length;j++){
                                        if(cookieArr[j].id == arr[i].id){
                                            //将商品数量添加在数据中
                                            arr[i].num = cookieArr[j].num;
                                            newArr.push(arr[i]);
                                        }
                                    }

                                }
                                console.log(newArr);
                                // $(".sc_right ul").html("");
                                $(".sc_right ul").empty();
                                // console.log(newArr);
                                // 通过循环将数据添加到我们右侧购物车的页面
                                //还是在html先照抄网页结构，然后再复制进来

                                for(var i = 0; i < newArr.length; i++){
                                    var node = $(`
                                                    <li class = "li" id ='${newArr[i].id}'>
                                                        <div class="sc_goodsPic">
                                                            <img src="${newArr[i].img}" alt="">
                                                        </div>
                                                        <div class="sc_goodsTitle"></div>
                                                            <p class = "title">${newArr[i].name}</p>
                                                            <p class="price">价格:${newArr[i].pricermb}</p>
                                                            <div class="sc_goodsNum">商品数量:
                                                            <button class = "sc_NumBtn">+</button>
                                                            <span>${newArr[i].num}</span>
                                                            <button class="sc_NumBtn">-</button>
                                                            </div>
                                                        <div class="sc_goodsBtn" id ='${newArr[i].id}'>购买</div>
                                                        <div class="sc_deleteBtn" id ='${newArr[i].id}'>删除</div>
                                                       
                                                    </li>
                                    `)
                                    node.appendTo(".sc_right ul");
                                }
                            }else{
                                $(".sc_right ul").empty();
                            }
                        },
                        error:function(msg){
                            alert(msg);
                        }
                    });
                } 






                //计算购物车的数量
                function sc_num(){
                    var cookieStr = $.cookie("goods");
                    if(cookieStr){
                        var cookieArr = JSON.parse(cookieStr);
                        var sum = 0;
                        for(var i = 0; i< cookieArr.length; i++){
                            sum = sum +cookieArr[i].num;
                        }
                        $(".sc_right .sc_num").html(sum);
                    }else{
                        $(".sc_right .sc_num").html(0);
                    }
                }
        })
    }



    //跳转到商品详情页
    $("#list-ul").on("click","img:eq(1)",function(){
        window.open("../html/details.html");
    })
    return{
        shopping:shopping,
    }
})