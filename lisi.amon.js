var Amon =  require('./amon');
var util=require('util');
function Lisi(name){
	Amon.call(this);
	this.name=name;
    this.name=name;
    this.description='extend from Amon;add ability:[connectToMysql].';
    if(!name){this.name='LiSi.init.noname';}
    this.type="LiSi";
    this.ds_default={
        host:'localhost',
        port:3310,
        user:'root',
        database:'crm',
        password:'srttest'
    };


	this.say({time:new Date(),content:{command:"tell",data:{command:"connectToMysql",data:{
        host:'string:host',
        port:'number:port',
        user:'string:userName',
        database:'string:databaseName',
        password:'string:password'
    },method:function(ds){
		var mysql = require('mysql');
        if(!ds)ds=this.ds_default;
		var conn = mysql.createConnection(ds);
		console.log('good conneted ok');
        this.say({from:this,to:''});
		//return conn;
	}}},form:this,to:this});

	this.say({time:new Date(),content:{command:"tell",data:{command:"help",data:{},method:function(data){}}},form:this,to:this});
}
util.inherits(Lisi,Amon);
module.exports= Lisi;