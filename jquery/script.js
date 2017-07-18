var dataInt={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'}]};
$(window).on('load',function(){
    waterfall();
    $(window).on('scroll',function(){
        if(checkScrollSlide()){
            $.each(dataInt.data,function(key,value){
                var oBox=$('<div>').addClass('box').appendTo($('#main'));
                var oPic=$('<div>').addClass('pic').appendTo($(oBox));
               $('<img>').attr('src',"../images/"+$(value).attr('src')).appendTo($(oPic));
            });
            waterfall();
        }
    })

});
function waterfall(){
  var $boxs=$('#main>div');
  var w=$boxs.eq(0).outerWidth();
  var cols=Math.floor($(window).width()/w);
  $('#main').width(cols*w);
  var hArr=[];
    $boxs.each(function(index,value){
        var h=$boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }else{
            var minH=Math.min.apply(null,hArr);
            var minIndex=$.inArray(minH,hArr);
            $(value).css({
                    'position':'absolute',
                    'top': minH+'px',
                    'left': minIndex * w + 'px'
        });
            hArr[minIndex]+=h;
        }
    });
}
function checkScrollSlide(){
    var $boxs=$('#main>div');
    var $lastBox=$boxs.last();
    var lastBoxDis=$lastBox.offsetTop;
    var scrollTop=$(window).scrollTop();
    var documentH=$(window).height();
    console.log(lastBoxDis);
    return (lastBoxDis<scrollTop+documentH?true:false);
}
