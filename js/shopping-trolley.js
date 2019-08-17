define(["jquery","jquery-cookie"],function($){
    //添加节点及获取cookie
    function shophtml(){
        $(function(){
            sc_msg();
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
    
                            $(".tabel .tr").html("");
                          
    
                           
                            
                            // console.log(newArr);
                            // 通过循环将数据添加到我们右侧购物车的页面
                            //还是在html先照抄网页结构，然后再复制进来
                            var sumprice = null;
                            var sumnum = null;
                        
                            for(var j = 0; j < newArr.length; j++){
                                var num = newArr[j].num;
                                var price = newArr[j].pricermb.slice(1);
                                var pricermb = num *price;
                                sumprice = sumprice + pricermb;
                                sumnum = sumnum + num;
                                var node = $(`
                                <tr class="tr">
                                    <td><input type="checkbox"></td>
                                    <td><img src="${newArr[j].img}" alt=""></td>
                                    <td>${newArr[j].name}</td>
                                    <td>无</td>
                                    <td>
                                        <span id = '${newArr[j].id}' class = 'sc-numbtn'>+</span>
                                        <span id = 'count'>${num}</span>
                                        <span id = '${newArr[j].id}' class = 'sc-numbtn'>-</span>
                                    </td>
                                    <td>￥${pricermb}.00</td>
                                    <td class = "deletebtn" id = '${newArr[j].id}'>删除</td>
                                </tr>
                                `)
                                node.appendTo(".tabel");
                            }

                         
                            $(".total").html("￥" + sumprice +".00");
                            $(".b").html(sumnum);
                        }else{
                            $(".table").empty();
                        }
                    },
                    error:function(msg){
                        alert(msg);
                    }
                });
            }
            

            //删除商品数据
            $(".tabel").on("click",".deletebtn",function(){
                var id = this.id;
                //往父元素找一个最近的tr删除
                var c = confirm("您确定要删除此商品吗?");
                if(c == true){
                    $(this).closest("tr").remove();
                }

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

            })

            //购物车数量的加减
            $(".tabel").on("click",".sc-numbtn",function(){
                // var id = $(this).closest("li").attr("id");
                var id = this.id;
                var cookieArr = JSON.parse($.cookie("goods"));
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        break;
                    }
                }

                if(this.innerHTML == "+"){
                    cookieArr[i].num++;
                    $(this).next("span").html(cookieArr[i].num);
                }else{
                    if(cookieArr[i].num == 1){
                        alert("数量不能小于1");
                    }else{
                        cookieArr[i].num--;
                        $(this).prev("span").html(cookieArr[i].num);
                    }
                }

                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires:7
                })
                 sc_msg();
               
            });

              //继续购物跳转
              $(".span-right").click(function(){
                window.open("product_list.html");
            });

           //清空购物车
             $("#btn-clear").click(function(){
                $.cookie("goods",null);
                $(".tabel .tr").html("");
                $("#accounts .total").html("￥0.00");
                $("#accounts .b").html("0");
            })  
        })
    }
    return{
        shophtml:shophtml,
    }
})