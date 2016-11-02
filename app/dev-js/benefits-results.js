;(function(){

    $(document).ready(function(){
        var curTag = Common.queryString('result');
        var txt = {
            yes:{
                title:'恭喜你!',
                des:'几天后，法国娇兰“小黑裙”<br>小样即将来到你的身边。'
            },
            no:{
                title:'很抱歉 <span class="subtitle">精美小黑裙小样已经发完了。</span> ',
                des:'别灰心，继续关注法国娇兰香榭丽舍68<br>号官方微信账号，<br>更多惊喜期待与你分享！'
            }
        };
        if(curTag){
            if(curTag.result=='yes'){
                updateHtml(txt.yes.title,txt.yes.des);
            }else{
                updateHtml(txt.no.title,txt.no.des);
            }

        }

        function updateHtml(title,des){
            $('.title').html(title);
            $('.des').html(des);
        }

    });


})();