function gotoPin(e){var o=document.getElementsByClassName("pin");Common.addClass(o[e],"current")}(function(){var e=(navigator.userAgent.toLowerCase(),{hasClass:function(e,o){return o=o||"",0==o.replace(/\s/g,"").length?!1:new RegExp(" "+o+" ").test(" "+e.className+" ")},addClass:function(e,o){var n=this;n.hasClass(e,o)||(e.className=""==e.className?o:e.className+" "+o)},removeClass:function(e,o){var n=this;if(n.hasClass(e,o)){for(var s=" "+e.className.replace(/[\t\r\n]/g,"")+" ";s.indexOf(" "+o+" ")>=0;)s=s.replace(" "+o+" "," ");e.className=s.replace(/^\s+|\s+$/g,"")}},queryString:function(){for(var e={},o=window.location.search.substring(1),n=o.split("&"),s=0;s<n.length;s++){var i=n[s].split("=");if("undefined"==typeof e[i[0]])e[i[0]]=decodeURIComponent(i[1]);else if("string"==typeof e[i[0]]){var t=[e[i[0]],decodeURIComponent(i[1])];e[i[0]]=t}else e[i[0]].push(decodeURIComponent(i[1]))}return e},msgBox:function(e,o){o?$("body").append('<div class="ajaxpop msgbox minwidthbox"><div class="loading">'+e+"</div></div>"):$("body").append('<div class="ajaxpop msgbox"><div class="loading"><div class="icon-loading"></div>'+e+"</div></div>")},errorMsg:{add:function(e,o){for(var n in e.childNodes){if("error"==e.childNodes[n].className)return e.childNodes[n].textContent=o,!0;if(n==e.childNodes.length-1){var s=document.createElement("div");s.textContent=o,s.className="error",e.appendChild(s)}}},remove:function(e){for(var o in e.childNodes)if("error"==e.childNodes[o].className)return void e.childNodes[o].parentNode.removeChild(e.childNodes[o])}},alertBox:{add:function(e){$("body").append('<div class="alertpop msgbox"><div class="inner"><div class="msg">'+e+'</div><div class="btn-alert-ok">关闭</div></div></div>')},remove:function(){$(".alertpop").remove()}},popupBox:{add:function(e,o){$(".wrapper").append('<div class="msgbox popup '+(o?o:"")+'"><div class="inner"><div class="msg">'+e+'</div><div class="btn-close">关闭</div></div></div>')},remove:function(){$(".popup").remove()}},qrcodeBox:{add:function(e){$("body").append('<div class="qrcodebox popup msgbox"><div class="inner"><div class="msg">'+e+'</div><div class="btn-close">关闭</div></div></div>')},remove:function(){$(".qrcodebox").remove()}},overscroll:function(e){e.addEventListener("touchstart",function(){var o=e.scrollTop,n=e.scrollHeight,s=o+e.offsetHeight;0===o?e.scrollTop=1:s===n&&(e.scrollTop=o-1)}),e.addEventListener("touchmove",function(o){e.offsetHeight<e.scrollHeight&&(o._isScroller=!0)}),document.body.addEventListener("touchmove",function(e){e._isScroller||e.preventDefault()})},gotoBookingPage:function(e,o){window.location.href="online-booking.html?servicefirst="+e+"&servicesecond="+o}});this.Common=e}).call(this),$(document).ready(function(){$(document).on("click",".btn-alert-ok",function(){$(this).parent().parent().remove()}),$("body").on("touchstart",".btn-close",function(){$(this).parent().parent().remove()})});