var Lisi =  require('./lisi.amon');
var util=require('util');
function Wangwu(name){
	Lisi.call(this);
	this.name=name;
    this.type="WangWu";
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
}
util.inherits(Wangwu,Lisi);
module.exports= Wangwu;