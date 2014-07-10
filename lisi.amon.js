var Amon =  require('./amon');
var util=require('util');
function Lisi(name){
	Amon.call(this);
	this.name=name;
    this.name=name;
    this.description='ability:add connectToMysql method.';
    if(!name){this.name='LiSi.init.noname';}
    this.type="LiSi";
    this.ds_default={
        host:'localhost',
        port:3310,
        user:'root',
        database:'crm',
        password:'srttest'
    };


	this.listen({command:"tell",data:{command:"connectToMysql",data:{
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
		return conn;
	}}});

	this.listen({command:"tell",data:{command:"help",data:{},method:function(data){}}});
}
util.inherits(Lisi,Amon);
module.exports= Lisi;