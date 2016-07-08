function gotoPin(i) {
	var $pin = document.getElementsByClassName('pin');
	Common.addClass($pin[i],'current');
}
;(function(){
	var ua = navigator.userAgent.toLowerCase();
	var Common = {
		//obj has type,url
		hasClass:function(ele,newclass){
			newclass = newclass || '';
			if (newclass.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
			return new RegExp(' ' + newclass + ' ').test(' ' + ele.className + ' ');
		},
		addClass:function(ele,newclass){
			var self = this;
			if (!self.hasClass(ele, newclass)) {
				ele.className = ele.className == '' ? newclass : ele.className + ' ' + newclass;
			}
		},
		removeClass:function(ele,newclass){
			var self = this;
			if (self.hasClass(ele, newclass)) {
				var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
				while (newClass.indexOf(' ' + newclass + ' ') >= 0) {
					newClass = newClass.replace(' ' + newclass + ' ', ' ');
				}
				ele.className = newClass.replace(/^\s+|\s+$/g, '');
			}
		},
		queryString:function(){

			var query_string = {};
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
				var pair = vars[i].split("=");
				// If first entry with this name
				if (typeof query_string[pair[0]] === "undefined") {
					query_string[pair[0]] = decodeURIComponent(pair[1]);
					// If second entry with this name
				} else if (typeof query_string[pair[0]] === "string") {
					var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
					query_string[pair[0]] = arr;
					// If third or later entry with this name
				} else {
					query_string[pair[0]].push(decodeURIComponent(pair[1]));
				}
			}
			return query_string;

		},
		goHomepage:function(){
			gotoPin(0);
		},
		msgBox:function(msg,long){
			if(long){
				$('body').append('<div class="ajaxpop msgbox minwidthbox"><div class="loading">'+msg+'</div></div>');
			}else{
				$('body').append('<div class="ajaxpop msgbox"><div class="loading"><div class="icon-loading"></div>'+msg+'</div></div>');
			}
		},
		errorMsg : {
			add:function(ele,msg){

				for(var i in ele.childNodes){
					if(ele.childNodes[i].className == 'error'){
						ele.childNodes[i].textContent = msg;
						return true;
					}else{
						if(i==ele.childNodes.length-1){
							var newDiv = document.createElement('div');
							newDiv.textContent = msg;
							newDiv.className = 'error';
							ele.appendChild(newDiv);
						}
					}
				}
			},
			remove:function(ele){

				for(var i in ele.childNodes){
					if(ele.childNodes[i].className == 'error'){
						ele.childNodes[i].parentNode.removeChild(ele.childNodes[i]);
						return;
					}
				}
			}
		},
		alertBox:{
			add:function(msg){
				$('body').append('<div class="alertpop msgbox"><div class="inner"><div class="msg">'+msg+'</div><div class="btn-alert-ok">关闭</div></div></div>');
			},
			remove:function(){
				$('.alertpop').remove();
			}
		},
		popupBox:{
			add:function(msg){
				$('.wrapper').append('<div class="msgbox popup"><div class="inner"><div class="msg">'+msg+'</div><div class="btn-close">关闭</div></div></div>');
			},
			remove:function(){
				$('.popup').remove();
			}
		},
		qrcodeBox:{
			add:function(msg){
				$('body').append('<div class="qrcodebox popup msgbox"><div class="inner"><div class="msg">'+msg+'</div><div class="btn-close">关闭</div></div></div>');
			},
			remove:function(){
				$('.qrcodebox').remove();
			}
		},
		overscroll:function(el) {
			el.addEventListener('touchstart', function() {
				var top = el.scrollTop
					, totalScroll = el.scrollHeight
					, currentScroll = top + el.offsetHeight
				//If we're at the top or the bottom of the containers
				//scroll, push up or down one pixel.
				//
				//this prevents the scroll from "passing through" to
				//the body.
				if(top === 0) {
					el.scrollTop = 1
				} else if(currentScroll === totalScroll) {
					el.scrollTop = top - 1
				}
			});
			el.addEventListener('touchmove', function(evt) {
				//if the content is actually scrollable, i.e. the content is long enough
				//that scrolling can occur
				if(el.offsetHeight < el.scrollHeight)
					evt._isScroller = true
			});
			document.body.addEventListener('touchmove', function(evt) {
				//In this case, the default behavior is scrolling the body, which
				//would result in an overflow.  Since we don't want that, we preventDefault.
				if(!evt._isScroller) {
					evt.preventDefault()
				}
			});
		},

	};

	this.Common = Common;

}).call(this);


$(document).ready(function(){

	$(document).on('click','.btn-alert-ok',function(){
		$(this).parent().parent().remove();
	});

});