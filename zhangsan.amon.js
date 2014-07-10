var Wangwu =  require('./wangwu.amon');
var util=require('util');
//var lisi=  new Lisi();//or new Amon();
function Zhangsan(){
	Wangwu.call(this);
	for(var i in Wangwu){
		this[i]=Wangwu[i];
	}
	for(var i in Wangwu.prototype){
		//this[i]=Wangwu.prototype[i];
	}
	this.name='zhangsan';
	this.listen({command:"tell",data:{command:"save2",data:{
			host:'string',
			user:'string',
			database:'string',
			password:'string',
			port:'number'
		},method:function(data){
			var mysql = require('mysql');
			var conn = mysql.createConnection(data);
			console.log('good conneted ok,by '+this.name);
			return conn;
			
	}}});
	
	//return this;	
}
//Wangwu.prototype= new Lisi();
util.inherits(Zhangsan,Wangwu);
var zhangsan=  new Zhangsan();
//wangwu.a();
//wangwu.b();






zhangsan.listen({command:"save",data:{entity:{a:1,b:2}},isEcho:true});
zhangsan.listen({command:"save1",data:{entity:{a:1,b:2}},isEcho:true});
//zhangsan.listen({command:"save2",data:{entity:{a:1,b:2}},isEcho:true});

module.exports= Zhangsan;