var Amon =  require('./amon');
var util=require('util');
//var amon=  new Amon();//or new Amon();
function Lisi(name){
	Amon.call(this);
	this.name=name;
    this.type="LiSi";
    var this_=this;

	this.listen({command:"tell",data:{command:"connectToMysql",data:{
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

	this.listen({command:"tell",data:{command:"help",data:{
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
util.inherits(Lisi,Amon);
module.exports= Lisi;