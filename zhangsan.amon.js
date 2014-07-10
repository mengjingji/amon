var Wangwu =  require('./wangwu.amon');
var util=require('util');

function Zhangsan(name){
	Wangwu.call(this);
	this.name=name;
    if(!name){this.name='Zhangsan.init.noname';}
    this.type="ZhangSan";
    this.description='extend from WangWu;add ability:[save,list].';
    this_=this;
	this.say({time:new Date(),content:{command:"tell",data:{command:"save",data:{entity:{"string:fieldName":'var:fieldValue',"string:fieldName2":'var:fieldValue2'},table:'string:tableName',ds:'object:ds'},method:function(data){
        var msg=this.listen({command:"connectToMysql",data:data.ds});
        if(msg.status===0){
            var conn=msg.result;
            var setString='';
            var valueArr=[];
            for(var key in data.entity){
                if(setString!==''){setString+=','};
                setString+=key+'=?';
                valueArr.push(data.entity[key]);
            }
            var sql= 'INSERT INTO '+data.table+' SET '+setString;
            console.log(sql);
            var query = conn.query(sql, valueArr ,function(error,results){
                if(error){
                    console.log('ClientReady Error:'+error.message);
                    conn.end();
                    return;
                }
                console.log('Inserted:'+results.affectedRows+' rows.');
                console.log('Id inserted:'+results.insertId);
            });
            console.log('save ok');
        }else{
            console.log('ERR!!!!!!!!!!!!!!');
        }
    }}},from:this,to:this});

    this.say({time:new Date(),content:{command:"tell",data:{command:"list",data:{table:'string:tableName',ds:'object:ds'},help:'',method:function(data){
       var caller=this;
        var ms_t={time:new Date(),content:{command:"connectToMysql",data:data.ds},to:this};

        console.log('-------------------2:hash:'+this.hash(ms_t));
        this.say(ms_t);
        console.log('-------------------3');
        this.on('aa',function(conn){
            console.log('-------------------4');
            for(var key in msg){
                console.log(key);
            }
            console.log('------------faf-------bbb');
            if(msg.status===0){
                var conn=msg.result;

                conn.query('SELECT * from '+data.table, function(err, rows, fields) {
                    if (err) {
                        throw err;
                    }
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
                    console.log(" data: "+result);
                    console.log("-----------------------------------11")
                    caller.say({from:caller,to:msgReq.from,content:{command:'reply',data:{src:msgReq,result:result}},time:1});
                    console.log(" by "+this_.name);
                    conn.end();
                });

            }else{
                console.log('ERR!!!!!!!!!!!!!!');
            }
        });

    }}},from:this,to:this});

    this.say({time:new Date(),content:{command:"tell",data:{command:"reply",data:{src:"msgObj:msgReq",result:"obj:result"},method:function(data){
        var caller=this;
            // handle list data
            data.msgReq.from.emit(data.msgReq.from.hash(data.msgReq),data.result,data.msgReq);
    }}},from:this,to:this});
}
util.inherits(Zhangsan,Wangwu);
module.exports= Zhangsan;