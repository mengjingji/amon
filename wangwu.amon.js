var Lisi =  require('./lisi.amon');
var util=require('util');
//var lisi=  new Lisi();//or new Amon();
function Wangwu(){
	Lisi.call(this);
	for(var i in Wangwu){
		this[i]=Wangwu[i];
	}
	for(var i in Wangwu.prototype){
		//this[i]=Wangwu.prototype[i];
	}
	this.name='wangwu';
	this.name2='zhangsan';
	this.listen({command:"tell",data:{command:"save1",data:{
			host:'string',
			user:'string',
			database:'string',
			password:'string',
			port:'number'
		},method:function(data){
			var mysql = require('mysql');
			var conn = mysql.createConnection(data);
			console.log('good conneted ok');
			return conn;
			
	}}});
	
	//return this;	
}
//Wangwu.prototype= new Lisi();
util.inherits(Wangwu,Lisi);
//var wangwu=  new Wangwu();
//wangwu.a();
//wangwu.b();






//wangwu.listen({command:"save",data:{entity:{a:1,b:2}},isEcho:true});
//wangwu.listen({command:"save1",data:{entity:{a:1,b:2}},isEcho:true});

module.exports= Wangwu;