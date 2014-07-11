var Amon=require('./amon');
var Lisi=require('./lisi.amon');
var WangWu=require('./wangwu.amon');
var ZhangSan=require('./zhangsan.amon');

var amon=new Amon('amon');
var lisi=new Lisi('lisi');
var wangwu=new WangWu('WangWu');
var zhangsan=new ZhangSan('zhangsan');

//zhangsan.say({content:{command:"save",data:{entity:{user_name:'zhangsan',question_content:'3'},table:'t_crm_question'}}},function(result){
    //console.log("++++++++++++:status="+result.status)
    //console.log("++++++++++++:insertId="+result.insertId)
//});
//zhangsan.listen({command:"list",data:{table:'t_crm_question'},isEcho:true});

/**/
lisi.say({to:zhangsan,content:{command:"list",data:{table:'baidu'}}},function (result){
    if(result.status===0){
        var rows=result.data;
        var result = '{\n';
        for(var i = 0; i < rows.length; i++){
            result += '[';
            result += '{';
            var row='';
            for(var key in rows[i]){
                if(typeof(rows[i][key])==='function')continue;
                if(row!='')row+=',';
                row += key+':' + rows[i][key] ;
            }
            result+=row;
            result += '}';
            result += '],\n';
        }
        result += '}';
        zhangsan.log(result);
    }else{
        console.log("error:"+result.e.message)
    }


    //console.log('seccc////////////////////////////////////////////////////');

});


zhangsan.say({content:{command:"makeEduDictTree",data:{source:"wenku",object:"dictTree_t"},method:function(msg){
    //todo
    //this.log(msg.content);
    this.say({to:msg.from,content:{command:'reply',data:{src:msg,result:null}}});
}}},function(result){
    console.log('eee')

});







