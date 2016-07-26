/*All the api collection*/
Api = {
    isLogin:function(callback){
        $.ajax({
            url:'/api/islogin',
            type:'POST',
            dataType:'json',
            success:function(data){
                return callback(data);
            }
        });
    },
    getKeycode:function(obj,callback){
        $.ajax({
            url:'/api/check',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });
    },
    //mobile checknum  code
    submitAll:function(obj,callback){
        $.ajax({
            url:'/api/submit',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });
    },
    //mobile code
    submitWithoutChecknum:function(obj,callback){
        $.ajax({
            url:'/api/submit2',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });
    },
    //    api/getredpacket
    //返回 code 为1 已关注用户红包直接到账
    //返回 code 为2 未关注用户弹出二维码
    getRedpacket:function(obj,callback){
        $.ajax({
            url:'/api/getredpacket',
            type:'POST',
            dataType:'json',
            data:obj,
            success:function(data){
                return callback(data);
            }
        });
    },
    serviceJson:[
        {
            title:'水疗会所',
            //type:[{name:'test'},{name:'RDV 美妆'},{name:'美妆课堂'},{name:'RDV 护理'},{name:'导游服务'},{name:'购物助理'}],
        },{
            title:'VIP服务',
            type:[{name:'香水邀约'},{name:'妆容打造'},{name:'美妆课堂'},{name:'护肤预约'},{name:'店铺参观'},{name:'私人顾问'}]
        },{
            title:'定制服务',
            type:[{name:'丝带配选'},{name:'刻字服务'}]
        },{
            title:'Le 68餐厅',
            //type:['']
        }
    ],



};