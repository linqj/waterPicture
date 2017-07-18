/**
 * Created by linqiaojuan on 17-7-18.
 */
window.onload=function(){
    waterfall('main','box');
    //随着用户拖动滚动条加载图片
    var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'}]};
    window.onscroll=function(){
        if(checkScrollSlide()){
            var oParent=document.getElementById('main');
            for(var i=0;i<dataInt.data.length;i++){
               var oBox=document.createElement('div');
                   oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src='../images/'+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
};
function waterfall(parent,box){
    //取出main下的box
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
   //计算整个页面显示的列数
    var oBoxWidth=oBoxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxWidth);
    //设置main的宽度
    oParent.style.width=oBoxWidth*cols+'px';
    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);
            var num=hArr.indexOf(minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.left=oBoxWidth*num+'px';
            oBoxs[i].style.top=minH+'px';
            hArr[num]=minH+oBoxs[i].offsetHeight;
        }
    }
}
//根据class获取元素
function getByClass(parent,className){
    var boxArr=new Array();//获取class为box的元素
    var oElement=parent.getElementsByTagName('*');//获取所有子元素
    for(var i=0;i<oElement.length;i++){
        if(oElement[i].className==className){
            boxArr.push(oElement[i])
        }
    }
return boxArr
}
//检测是否具备加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById('main');
    var oBoxs=getByClass(oParent,'box');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+'px';
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    console.log(lastBoxH);
    return (lastBoxH<scrollTop+height?true:false)
}