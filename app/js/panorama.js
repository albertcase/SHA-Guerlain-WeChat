(function(){var a=function(){this.selectedItem=0};a.prototype={init:function(){var a=this;a.bindEvent();var t=setTimeout(function(){$(".tips").hide(1e3),clearTimeout(t)},3e3)},bindEvent:function(){var a=this;Common.popupBox.add('<p class="pop-content">通过全景图感受娇兰香榭丽舍68号,门店、中层楼、水疗中心、Le 68,餐厅的视觉体验，探索娇兰之家的奥秘。</p>',"panorama-pop");var t=$(".panorama img");a.centerImg(t),a.touchTo()},centerImg:function(a){var t=$(window).width(),n=a.width(),o=t-n,r=0,e=Math.floor(t/2-n/2),i=Math.floor(t/2-n/2),m=Math.floor(o/45);if(a.css({"-webkit-transform":"translateX("+i+"px)","-moz-transform":"translateX("+i+"px)","-o-transform":"translateX("+i+"px)",transform:"translateX("+i+"px)"}),window.DeviceOrientationEvent){window.addEventListener("deviceorientation",function(t){var n=t.gamma;e=i+m*n,o>e?e=o:e>r&&(e=r),$(".top").html(e),a.css({"-webkit-transform":"translateX("+e+"px)","-moz-transform":"translateX("+e+"px)","-o-transform":"translateX("+e+"px)",transform:"translateX("+e+"px)"})},!1)}else alert("Not supported.")},touchTo:function(a){}},"function"==typeof define&&define.amd?define(function(){return a}):this.panorama=a}).call(this),$(document).ready(function(){Common.queryString().id?$("#panorama img").attr("src","/app/images/panorama/panorama-"+Common.queryString().id+".jpg"):$("#panorama img").attr("src","/app/images/panorama/panorama-1.jpg"),$(".panorama img").on("load",function(){var a=new panorama;a.init()})});