define(["jquery","jquery-cookie"],function($){
    function getUsername(){
        
            var cookieStr = $.cookie("username");
            // alert(cookieStr);
            if(cookieStr){
                $("#headerBox #header #header-user").html("欢迎回来" + cookieStr);
                $("#headerBox #header #header-user").css({
                    color:"skyblue",
                    paddingTop:"7px",
                });
            }
        
    }
    return{
        getUsername:getUsername,
    }
})