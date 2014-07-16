var util=require('util');
var events=require('events');
var event=new events.EventEmitter();
var Amon=require('./amon');
var Lisi=require('./lisi.amon');
var WangWu=require('./wangwu.amon');
var ZhangSan=require('./zhangsan.amon');
var EventProxy = require('eventproxy');

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

/*
zhangsan.say({command:"makeEduDictTree",data:{source:"baidu",object:"dictTree_copy"},method:function(msg){
    var fields=[
        {id:101,name:'学段',code:'stage',parentId:0},
        {id:102,name:'学客',code:'subject',parentId:0},
        {id:103,name:'教材版本',code:'version',parentId:0},
        {id:104,name:'年级',code:'grade',parentId:0}
    ];
    for(var i=0;i<fields.length;i++){
        console.log(fields[i]['code']);
        var a=fields[i]['code'];
        zhangsan.say({content:{command:"save",data:{entity:fields[i],table:msg.content.data.object,source:msg.content.data.source}}},function(result,src){
            if(result.status==0){
                var parentId=src.content.data.entity.id;
                var entity=src.content.data.entity;
                zhangsan.say({command:'sql',data:{object:src.content.data.table,parentId:parentId,field:entity,sql:'select '+entity.code+' from '+src.content.data.source+' group by '+entity.code+';'}},function(rows,src){
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
                        zhangsan.say({content:{command:"save",data:{entity:entity,table:src.content.data.object}}},function(result,src){

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
*/
var ds={
    host:'localhost',
    port:3310,
    user:'root',
    database:'wenku_spider',
    password:'srttest'
};
var mysql = require('mysql');
function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}
x=0;
var category={};
function makeCategoryAndChapterTree(){
    var conn = mysql.createConnection(ds);
    var sql="select stage from baidu group by stage";
    //console.log(util.inspect(conn,true,7));
    //return;
    conn.query(sql,function(err,rows,fields){
        for(var i=0;i<rows.length;i++){
             stage=rows[i]['stage'];

            category[stage]={};
            //console.log(category);

            (function(stage){
                console.log('1111:'+stage);
                var sql="select subject from baidu where stage='"+stage+"' group by subject";
                var conn = mysql.createConnection(ds);
                conn.query(sql,function(err, rows, fields){
                    if(err){console.log(conn);throw err;};
                    for(var j=0;j<rows.length;j++){
                        var subject=rows[j]['subject'];
                        category[stage][subject]={};
                        event.emit("subject",category,stage,subject);
                    }
                    //console.log('----------------------------------------------')
                });
                conn.end();
            }).call(this,stage);
        }

    });

    conn.end();

}

event.on('unit',function(args/*category,stage,subject,version,grade,unit*/){
    var category=args[0];
    var stage=args[1];
    var subject=args[2];
    var version=args[3];
    var grade=args[4];
    var unit=args[5];
    var sql="select lesson from baidu where stage='"+stage+"' and subject='"+subject+"' and version='"+version+"' and grade='"+grade+"' and unit='"+unit+"' group by lesson";
    console.log(sql)
    //addQueue();
    var conn = mysql.createConnection(ds);
    console.log(util.inspect(conn,true,4));
     conn.query(sql,function(err,rows,fields){
         if(err) {console.error(err.code);console.error(conn); throw err;}
         for(var n=0;n<rows.length;n++){
             var lesson=rows[n]['lesson'];
             category[stage][subject][version][grade][unit][lesson]={};
             console.log(stage+'-'+subject+'-'+version+'-'+grade+'-'+unit+'-'+lesson);
             handleQueue();
             //console.log(category);
         }

     });
    conn.end();
});
event.on('grade' ,function(args/*category,stage,subject,version,grade*/){
    var category=args[0];
    var stage=args[1];
    var subject=args[2];
    var version=args[3];
    var grade=args[4];
    var sql="select unit from baidu where stage='"+stage+"' and subject='"+subject+"' and version='"+version+"' and grade='"+grade+"' group by unit";
    console.log(sql)
    var conn = mysql.createConnection(ds);

    conn.query(sql,function(err,rows,fields){
        for(var m=0;m<rows.length;m++){
            var unit=rows[m]['unit'];
            category[stage][subject][version][grade][unit]={};
            //event.emit("unit",category,stage,subject,version,grade,unit);
            var task={event:event,emit:'unit',args:[category,stage,subject,version,grade,unit]};
            addQueue(task);
            x++;
            //console.log(x+":"+stage+'-'+subject+'-'+version+'-'+grade+'-'+unit)
        }
        handleQueue();
        //event.emit("unit",category,stage,subject,version,grade,unit);

    });
    conn.end();
});
event.on('version',function(args){
    var category=args[0];
    var stage=args[1];
    var subject=args[2];
    var version=args[3];
    var sql="select grade from baidu where stage='"+stage+"' and subject='"+subject+"' and version='"+version+"' group by grade";
    //console.log(sql)
    var conn = mysql.createConnection(ds);
    conn.query(sql,function(err,rows,fields){
        for(var l=0;l<rows.length;l++){
            var grade=rows[l]['grade'];
            category[stage][subject][version][grade]={};
            //var task={event:event,emit:'grade',args:[category,stage,subject,version,grade]};
            console.log(":"+stage+'-'+subject+'-'+version+'-'+grade)
            //addQueue(task);
        }
        //event.emit('grade',category,stage,subject,version,grade);
        //handleQueue();
    });
    conn.end();
});
event.on('subject',function(category,stage,subject){
    var sql="select version from baidu where stage='"+stage+"' and subject='"+subject+"' group by version";
    //console.log(sql);

    var conn = mysql.createConnection(ds);
    conn.query(sql,function(err,rows,fields){
        if(err)throw err;
        for(var k=0;k<rows.length;k++){
            var version=rows[k]['version'];
            category[stage][subject][version]={};
            //var task={event:event,emit:'version',args:[category,stage,subject,version]};
            //addQueue(task);
            event.emit("version",[category,stage,subject,version]);
        }
        //handleQueue();
    });
    conn.end();
});

var queue=[];
function addQueue(obj){
    queue.push(obj);
}
function handleQueue(){
    if(queue.length>0){
        var obj=queue.shift();
        obj.event.emit(obj.emit,obj.args);
    }
}

//makeCategoryAndChapterTree();
//handleQueue();


function selectAll(){
    var conn=mysql.createConnection(ds);
    conn.query("select * from baidu limit 10",function(err,rows,fields){
        for(var i=0;i<rows.length;i++){
            updateCategory(rows[i]);
        }
    });
    conn.end()
}
selectAll();
function updateCategory(row){
    console.log(row.stage);
    //看学段有没有,没有插入一条学段;
    //在学段下看学科有没有,没有插入一条学科;
    //在学科下看教材版本有没有,没有插入一条教材版本;
    //在教材版本下,看年级有没有,没有插入一条;
    getDictByName(row.stage);


}
var ep = new EventProxy();
function  getDictByName(name){
    var conn=mysql.createConnection(ds);
    conn.query("select * from dictTree_copy where name='"+name+"'",function(err,rows,fields){
        //rows[0].
        ep.emit('getDictByName', rows);
    })
    conn.end();
}

ep.all('tpl', 'data', function (tpl, data) {
    // 在所有指定的事件触发后，将会被调用执行
    // 参数对应各自的事件名
});










