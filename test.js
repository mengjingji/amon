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

/*
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
 */


zhangsan.say({command:"makeEduDictTree",data:{source:"wenku",object:"dictTree_t"},method:function(msg){
    var fields=[
        {id:101,name:'学段',code:'stage',parentId:0},
        {id:102,name:'学客',code:'subject',parentId:0},
        {id:103,name:'教材版本',code:'version',parentId:0},
        {id:104,name:'年级',code:'grade',parentId:0}
    ];
    for(var i=0;i<fields.length;i++){
        console.log(fields[i]['code']);
        var a=fields[i]['code'];
        zhangsan.say({content:{command:"save",data:{entity:fields[i],table:'dictTree_copy'}}},function(result,src){
            if(result.status==0){
                var parentId=src.content.data.entity.id;
                var entity=src.content.data.entity;
                zhangsan.say({command:'sql',data:{parentId:parentId,field:entity,sql:'select '+entity.code+' from baidu group by '+entity.code+';'}},function(rows,src){
                    //zhangsan.say({command:'showRs',data:{rs:rows}});
                    for(var j=0;j<rows.length;j++){
                        //console.log(rows[j][a])
                        console.log(rows[j]);
                        console.log(src.content.data.field.code);
                        var entity={id:0,name:0,code:0,parentId:0};
                        entity.id=parentId*1000+1+j;
                        entity.name=rows[j][src.content.data.field.code];
                        entity.code=null;
                        entity.parentId=src.content.data.parentId;
                        console.log(entity);
                        zhangsan.say({content:{command:"save",data:{entity:entity,table:'dictTree_copy'}}},function(result,src){

                        });

                    }
                })
            }
        });
    }
    //this.log(msg.content);
    this.say({to:msg.from,content:{command:'reply',data:{src:msg,result:null}}});
}},function(result){
    console.log('eee')

});







