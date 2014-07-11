var Wangwu =  require('./wangwu.amon');
var util=require('util');

function Zhangsan(name){
	Wangwu.call(this);
	this.name=name;
    if(!name){this.name='Zhangsan.init.noname';}
    this.type="ZhangSan";
    this.description='extend from WangWu;add ability:[save,list].';
    this_=this;
	this.say({time:new Date(),content:{command:"tell",data:{command:"save",data:{entity:{"string:fieldName":'var:fieldValue',"string:fieldName2":'var:fieldValue2'},table:'string:tableName',ds:'object:ds'},method:function(msg){
        var caller=this;
        this.say({content:{command:"connectToMysql",data:msg.content.data.ds},random:Math.random()},function(conn){


            var setString='';
            var valueArr=[];
            for(var key in msg.content.data.entity){
                if(setString!==''){setString+=','};
                setString+=key+'=?';
                valueArr.push(msg.content.data.entity[key]);
            }
            var sql= 'INSERT INTO '+msg.content.data.table+' SET '+setString;
            console.log(sql);
            var query = conn.query(sql, valueArr ,function(error,results){
                if(error){
                    console.log('ClientReady Error:'+error.message);
                    var m={to:msg.from,content:{command:'reply',data:{src:msg,result:{status:1,insertId:0}}},random:Math.random()};
                    caller.say(m);
                    conn.end();
                    return;
                }

                console.log('save ok');
                var m={to:msg.from,content:{command:'reply',data:{src:msg,result:{status:0,insertId:results.insertId}}},random:Math.random()};
                caller.say(m);
            });
            conn.end();

        });

    }}},from:this,to:this});

    this.say({time:new Date(),content:{command:"tell",data:{command:"list",data:{table:'string:tableName',ds:'object:ds'},help:'',method:function(msg){
       var caller=this;
        this.say({content:{command:"connectToMysql",data:msg.content.data.ds}},function con(conn){
                conn.query('SELECT * from '+msg.content.data.table, function(err, rows, fields) {
                    if (err) {
                        this_.say({to:msg.from,content:{command:'reply',data:{src:msg,result:{status:1,e:err,list:null}}} });
                        //throw err;
                    }else{
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
                        //console.log(" data: "+result);

                        this_.say({to:msg.from,content:{command:'reply',data:{src:msg,result:{status:0,data:rows}}} });

                    }
                    conn.end();
                });


        });



    }}},from:this,to:this});


}
util.inherits(Zhangsan,Wangwu);
module.exports= Zhangsan;