$(function(){function e(){var e=!0,n=document.getElementById("input-name"),t=document.getElementById("input-mobile"),o=document.getElementById("input-address");return n.value?Common.removeClass(n.parentElement,"error"):(Common.addClass(n.parentElement,"error"),e=!1),t.value?Common.removeClass(t.parentElement,"error"):(Common.addClass(t.parentElement,"error"),e=!1),o.value?Common.removeClass(o.parentElement,"error"):(Common.addClass(o.parentElement,"error"),e=!1),!!e}function n(){var n=$(".btn-submit-gbform"),t=!0;n.on("touchstart",function(n){if(n.preventDefault(),e()){if(!t)return;t=!1;var o=document.getElementById("input-name").value,m=document.getElementById("input-mobile").value,r=document.getElementById("input-address").value;$.ajax({url:"/api/info",type:"POST",dataType:"json",data:{name:o,mobile:m,address:r},success:function(e){t=!0,1==e.code?Common.alertBox.add("您已提交成功"):Common.alertBox.add(e.msg)}})}})}$(".btn-get").on("click",function(){window.location.href="form-getbenefits.html"}),n()});