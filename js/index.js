window.onload = function(){
    var oBox   = document.getElementById("box");
    var oPage = document.getElementById("page");
    var aPage = oPage.children; //每一页
    var aBtn = document.getElementById("nav_ol").children;
    var oWrite = document.getElementById('writeword');//打字机
    

    var bScroll  = true;  //初始化状态，可以滚动
    var windowH =  document.documentElement.clientHeight;//获取窗口高度
    oBox.style.height = windowH  + "px";

    // 设置每一页的高度
    for( var i = 0; i< aPage.length; i++){
        aPage[i].style.height = windowH  + "px";
    }

    var iNow = 0; //当前屏
    //点击在右侧换屏
    for( var i = 0; i < aBtn.length ; i++){
        (function(index){
            aBtn[i].onclick = function(){
                for( var i = 0; i < aBtn.length ; i++){
                    sideNav(index);
                    aBtn[i].className = "";
                }
                this.className = "active";
                //oPage.style.top = -index*windowH + "px";
                move(oPage,{top:-index*windowH},{ duration:"1000",
                    complete:function(){
                        bScroll = true;
                    }
                });

            };
        })(i);
    }
    //滚轮
    window.onscroll = window.onresize = function(){
        windowH = document.documentElement.clientHeight;
        for(var i = 0;i < aPage.length; i++){
            aPage[i].style.height = windowH + 'px';
        }
    };

    addMouseWheel(oPage,function(bDown){
        if(!bScroll) return;
        bScroll = false;
        if(bDown){
            iNow++;
            if(iNow == aPage.length){
                iNow = 0;
            }
            sideNav(iNow);  
        }else{
            iNow--;
            if(iNow <= 0){
                iNow = 0;
            }
            sideNav(iNow); 
        }
    })



    //封装滚轮事件
    function addMouseWheel(obj,fn){
        //添加事件
        if(window.navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){//ff
            obj.addEventListener("DOMMouseScroll",fnWheel,false);
        }else{
            obj.onmousewheel = fnWheel;
        }

        function fnWheel(ev){
            var oEvent  =ev || event;
            var bDown  = true;

            if(oEvent.wheelDelta){
                bDown = oEvent.wheelDelta>0 ?false : true;
            }else{
                bDown = oEvent.detail >0 ?true : false;
            }

            typeof fn == "function" && fn(bDown);
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        }
    }

    function sideNav(index){
        for(var i = 0; i < aBtn.length; i++){
            aBtn[i].className = '';
        }
        aBtn[index].className = 'active';
        
        move(oPage,{top:-iNow*windowH},{
            complete:function(){
                bScroll = true;
            }});
        
    }

   

//一打字机
    (function(){
        var writeStr = '欢迎访问Zengfengyan的个人网站，因为喜欢这项工作，所以一直努力的走在这条路上...';
        for(var i=0;i<writeStr.length;i++){
            var oSpan = document.createElement('span');
            oSpan.innerHTML = writeStr.charAt(i);
            oWrite.appendChild(oSpan);
        }
        var i=0;
        var timer = null;
        var aSpan = oWrite.children;
        //alert(aSpan.length);
        timer = setInterval(function(){
            aSpan[i].className = "active";
            i++;
            if(i == aSpan.length){
                clearInterval(timer);
            }
        },100)
    })();






// 3D圆环
    var oUl = document.getElementById("ul1");
    var aLi = oUl.children;
    var len = aLi.length;
    var bLeft = bTop = bRight = bBottom = false;
    
    //d = 360/len*index;
    for(var i = 0; i < len; i++){
        aLi[i].style.transition = "1s all ease " + (len-i)*200 + "ms";
        var d = 360/len*i;
        aLi[i].style.transform = "rotateY("+d+"deg) translateZ(350px)";     
    }
    var y = 0;//y轴角度
    var x = 150;//x轴角度
    
    //甩
    var speedX = 0;
    var speedY = 0;
    var lastX = 0;
    var lastY = 0;
    var count = 0;
    
    var timer = null;
    
    document.onmousedown = function(ev){ 
        clearInterval(timer);
        var disX = ev.clientX - y;
        var disY = ev.clientY - x;
        document.onmousemove = function(ev){ 
         
            y = ev.clientX - disX;
            x = ev.clientY - disY;
            
            //限定范围
            if(x > 600){
                x = 600;
            } else if(x < -600){
                x = -600;
            }
            
            oUl.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)";
            
            //算速度
            speedX = x - lastX;
            speedY = y - lastY;
            lastX = x;
            lastY = y;
             
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null; 
            clearInterval(timer);
            timer = setInterval(function(){
                
                x += speedX;
                y += speedY;
                
                speedX *= 0.95;
                speedY *= 0.95;
                
                if(Math.abs(speedX)<1){
                    speedX = 0;
                }
                if(Math.abs(speedY)<1){
                    speedY = 0;
                }
                
                if(speedX == 0 && speedY == 0){
                    clearInterval(timer);
                }
                
                //限定范围
                if(x > 600){
                    x = 600;
                } else if(x < -600){
                    x = -600;
                }
                
                oUl.style.transform = "perspective(800px) rotateX("+-x/10+"deg) rotateY("+y/10+"deg)";
                
            },30);
        };   
        return false;
    };


    //九格
    (function(){
        var oUl = document.getElementById("ul12");//九格
        var aLi = oUl.children;
        var len = aLi.length;//格子的个数
        for(var i = 0; i < aLi.length; i++){
            lagou(aLi[i]);
        }
        
        //lagou(aLi[0]);
        function getDir(oEvent,obj){
            
            var x=oEvent.clientX-obj.offsetLeft-obj.parentNode.offsetLeft-obj.offsetWidth/2;
            var y=obj.offsetHeight/2+obj.offsetTop+obj.parentNode.offsetTop-oEvent.clientY;

            //换成角度，然后除以90度，得到4个方向
            // 0 左边 1 下  2 右  3 上 
            return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4; 
        }
        
        function lagou(obj){
        
            obj.onmouseover = function(ev){

                var oEvent = ev || event;
                var n = getDir(oEvent,this);
                var oSpan = this.children[0].children[1];
             
                var oFrom = oEvent.fromElement || oEvent.relatedTarget;
                if(obj.contains(oFrom)){
                    return;
                }
                
                switch(n){
                    case 0://左边
                        oSpan.style.left = "-200px";
                        oSpan.style.top = "0";
                        break;
                    case 1://下边
                        oSpan.style.left = "0";
                        oSpan.style.top = "200px";
                        break;
                    case 2://右边
                        oSpan.style.left = "200px";
                        oSpan.style.top = "0";
                        break;
                    case 3://上边
                        oSpan.style.left = "0";
                        oSpan.style.top = "-200px";
                        break;
                } 
                move(oSpan,{left:0,top:0});
            };
            
            obj.onmouseout = function(ev){
                var oEvent = ev || event;
                
                var n = getDir(oEvent,this);
                var oSpan = this.children[0].children[1];
                 
                var oTo = oEvent.toElement || oEvent.relatedTarget;
                if(obj.contains(oTo)){
                    return;
                }
                
                switch(n){
                    case 0://左边 
                        move(oSpan,{left:-200,top:0});
                        break;
                    case 1://下边 
                        move(oSpan,{left:0,top:200});
                        break;
                    case 2://右边 
                        move(oSpan,{left:200,top:0});
                        break;
                    case 3://上边 
                        move(oSpan,{left:0,top:-200});
                        break;
                } 
            };
        }
    })();

    //收放
    //布局转换

    var aPos = [];
    for( var i = 0; i <len; i++){
        aPos[i] = { left:aLi[i].offsetLeft,top:aLi[i].offsetTop};
        aLi[i].style.left = aPos[i].left + "px";
        aLi[i].style.top = aPos[i].top + "px";
    }

    for( var i = 0; i <len; i++){
        aLi[i].style.position = "absolute";
        aLi[i].style.margin = "0";
    }

    
    



};







