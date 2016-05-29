window.onload = function(){
    var oBox = document.getElementById("box");
    var oWrite = document.getElementById('writeword');//打字机
    var oUl = document.getElementById("ul12");//九格
    var aLi = oUl.children;
    var len = aLi.length;//格子的个数
    var oMassge = document.getElementById("masage");//个人信息
    var oTop = document.getElementById("top");//top

    
     


//一打字机
    (function(){
        var writeStr = '欢迎访问Zengfengyan的个人网站，发现自己爱上了前端，所以一直努力走在前端的路上...';
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


    //九格
    (function(){
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

    //收
    var oChange = document.getElementById("change");
    
    var timer = null;
    oChange.onclick = function(){
        var i = 0;
        clearInterval(timer);
        timer = setInterval(function(){
            
            
            (function(index){
                move(aLi[i],{left:oChange.offsetLeft-400,top:oChange.offsetTop-oChange.offsetHeight,width:0,height:0,opacity:0},{
                    
                    complete:function(){
                        //alert(index);
                        if(index == len - 1){
                            //alert("运动完成！");
                            //放出来
                            var i = index;
                            
                            clearInterval(timer);
                            timer = setInterval(function(){
                                
                                move(aLi[i],{left:aPos[i].left,top:aPos[i].top,width:150, height:150,opacity:1});
                                i--;
                                if(i == -1){
                                    clearInterval(timer);
                                }
                            },100);
                            
                            
                                
                        }
                    }
                        
                });
            })(i);
            
            i++;
            
            if(i == len){
                clearInterval(timer);
            }
        },100);
    };


    
     





    //top
    var isIE6 = window.navigator.userAgent.indexOf("MSIE 6") != -1;
    if(isIE6){
        window.onscroll = window.onresize = function(){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var clientH = document.documentElement.clientHeight;
            var top = scrollTop + clientH - oTop.offsetHeight;
            oTop.style.top = top + "px";
        };
    }
    oTop.onclick = function(){
        //scrollTop  获取 设置
        
        moveScroll(0,500);
        return false;   
    };
    
    var timer = null;
    function moveScroll(iTarget,time){
        //起点
        var start = document.documentElement.scrollTop || document.body.scrollTop;
        //距离
        var dis = iTarget - start;
        //次数
        var count = Math.round(time/30);
        
        var n = 0;
        clearInterval(timer);
        timer = setInterval(function(){
            n++;
            var a = 1 - n/count;
            var cur = start + dis*(1 - a*a*a);
            document.documentElement.scrollTop = cur;
            document.body.scrollTop = cur;
            
            if(n == count){
                clearInterval(timer);   
            }
        },30);
    }
    





};