//父级   获取什么clsss
function getByClass(oParent,sClass){
    if(oParent.getElementsByCalssName){
        return oParent.getElementsByCalssName(sClass);
    } else {
        var result = [];
        var aEle = oParent.getElementsByTagName("*");
        for(var i = 0; i < aEle.length; i++){
            
            var _aTmp = aEle[i].className.split(" ");
            
            if(findInArr(_aTmp,sClass)){
                result.push(aEle[i]);
            }
        }
        return result;
    }
}


function findInArr(arr,n){
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == n){
            return true;
        }
    }
    return false;
}



