var Wangwu =  require('./wangwu.amon');
var util=require('util');
//var lisi=  new Lisi();//or new Amon();
function Zhangsan(name){
	Wangwu.call(this);
	this.name=name;
    this.type="ZhangSan";
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
}
//Wangwu.prototype= new Lisi();
util.inherits(Zhangsan,Wangwu);
module.exports= Zhangsan;