/**
 * Created by lenovo on 2017/5/22.
 */
// 这是封装了一个 $函数 实现了 获取id class 以及tagName功能
function $(selector,parent){

    parent = parent || document;

    //将选择器 截取第一个字符 用来后续判断
    var firstChar = selector.charAt(0);

    if(firstChar=="#"){
        return document.getElementById(selector.substring(1));//"#div"
    }else if(firstChar=="."){

        // 从整个页面中 获取 所有的标签
        var allEles = parent.getElementsByTagName("*");
        // 用来存 含有这个类的标签们
        var arr = [];
        // 循环所有的标签 把每一个标签 的class 转换成数组
        for(var i=0;i<allEles.length;i++){
            var arrClassName =  allEles[i].className.split(" ");
            // 循环数组  看看每一项是否有和我要找的类相同
            for(var j=0;j<arrClassName.length;j++){
                if(arrClassName[j]==selector.slice(1)){
                    arr.push(allEles[i]);
                    break;
                }
            }
        }
        return arr ;
    }else{
        return parent.getElementsByTagName(selector);
    }
}

// 封装了一个获取第一个子节点的兼容性函数
function first(ele){
    var firstEle =  ele.firstElementChild||ele.firstChild;
    if(!firstEle||firstEle.nodeType!=1){
        return null;
    }else{
        return firstEle;
    }
}
// 封装了一个获取前一个兄弟节点的兼容性函数
function prev(ele){
    var prevEle = ele.previousElementSibling || ele.previousSibling;
    if(!prevEle||prevEle.nodeType!=1){
        return null;
    }else{
        return prevEle;
    }
}

function next(ele){
    var nextEle = ele.nextElementSibling|| ele.nextSibling;
    if(!nextEle||nextEle.nodeType!=1){
        return null;
    }else{
        return nextEle;
    }
}

function last(ele) {
    var lastEle = ele.lastElementChild || ele.lastChild;
    if (!lastEle || lastEle.nodeType != 1) {
        return null;
    } else {
        return lastEle;
    }
}

function getStyle(obj,attr){
    return  obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

//封装了一个添加类的函数
function addClass(obj,myClass){
    //如果没有类 使用直接添加类的方式
    if(obj.className==""){
        obj.className=myClass;
    }else{
        //进来里面 说明 它原来有类
        // 将它的类 转化成数组
        var arrClassName = obj.className.split(" ");
        //调用数组的查找方法 返回索引
        var _index = arrIndexOf(arrClassName,myClass);
        // 判断索引是否为-1 说明没找到 则加进去
        if(_index==-1){
            obj.className+=" "+myClass;
        }
    }
}
// 用于数组查找的小函数
function arrIndexOf(arr,myClass){
    //循环数组 进行比较 如果找到 返回对应下标
    for(var i=0;i<arr.length;i++){
        if(arr[i]==myClass){
            return i;
        }
    }
    // 经过循环 之后说明没找到 则返回-1
    return -1;
}
//封装一个移除class的函数
function removeClass(obj,myClass){
    if(obj.className!=""){
        // 将标签上的class 转成数组
        var arrClassName = obj.className.split(" ");
        // 调用数组查找方法 返回一个索引
        var _index = arrIndexOf(arrClassName,myClass);//[xixi, cc, haha, hehe, abc]
        if(_index!=-1){
            // 如果不等于-1
            // 将类的数组 通过删除方法去删除那一项
            arrClassName.splice(_index,1);
            // 将删除那一项之后的数组重新通过join方法 转换回字符串 赋给标签的class
            obj.className = arrClassName.join(" ");
        }
    }
}