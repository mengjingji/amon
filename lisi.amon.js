var Amon =  require('./amon');
var util=require('util');
function Lisi(name){
	Amon.call(this);
	this.name=name;
    this.name=name;
    this.description='extend from Amon;add ability:[connectToMysql].';
    if(!name){this.name='LiSi.init.noname';}
    this.type="LiSi";
    this_=this;
    this.ds_default={
        host:'localhost',
        port:3310,
        user:'root',
        database:'wenku_spider',
        password:'srttest'
    };


	this.say({time:new Date(),content:{command:"tell",data:{command:"connectToMysql",data:{
        host:'string:host',
        port:'number:port',
        user:'string:userName',
        database:'string:databaseName',
        password:'string:password'
    },method:function(msg){
        var ds=msg.content.data;
		var mysql = require('mysql');
        if(!ds)ds=this.ds_default;
		var conn = mysql.createConnection(ds);
		console.log('good conneted ok');
        this.say({to:msg.from,content:{command:'reply',data:{src:msg,result:conn} }});

	}}},form:this,to:this});

	this.say({time:new Date(),content:{command:"tell",data:{command:"help",data:{},method:function(data){}}},form:this,to:this});
    var zhangsan=this;
    zhangsan.say({command:"tell",data:{command:"sql",data:{sql:"string:sql"},method:function(msg){
        zhangsan.say({command:'connectToMysql'},function(conn){
            conn.query(msg.content.data.sql,function(err, rows, fields){
                zhangsan.say({command:'reply',data:{src:msg,result:rows}});
            });
            conn.end();
        });
    }}});
    zhangsan.say({command:"tell",data:{command:"showRs",data:{rows:"object:rows"},method:function(msg){
        var rows=msg.content.data.rs;
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
    }}});

}
util.inherits(Lisi,Amon);
module.exports= Lisi;