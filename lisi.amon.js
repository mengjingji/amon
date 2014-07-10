var Amon =  require('./amon');
var util=require('util');
//var amon=  new Amon();//or new Amon();
function Lisi(){
	Amon.call(this);
	for(var i in Lisi){
		this[i]=Lisi[i];
	}
	for(var i in Lisi.prototype){
		//this[i]=Lisi.prototype[i];
	}
	this.name='lisi';
	this.jjjj="jjj";
	this.fun=function (){};
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
	var this_=this;
	this.listen({command:"save",data:{entity:{a:1,b:2},table:'t1',ds:'ds1'},help:'',method:function(data){
		

		var msg=this.listen({command:"connectToMysql",data:{
			host:'localhost',
			user:'root',
			database:'nodejs',
			password:'yiyi',
			port:3306
		}});

		if(msg.status===0){
			var conn=msg.result;
			conn.query('SELECT * from news', function(err, rows, fields) {
			console.log('==2=================================');
			if (err) {
				console.log('==3================================='+err);
				throw err;
			}
			var data = '';
			console.log('==4================================');
			for(var i = 0; i < rows.length; i++){

				data += '<p>' + 'ID£º' + rows[i].id + '</p>';
				data += '<p>' + 'title£º' + rows[i].title + '</p>';
				data += '<p>' + 'contents£º' + rows[i].content + '</p>';
				data += '<hr>';
				console.log('===================================');
			}
			
			console.log(data+"0000000000000000000 by "+this_.name);
			for(var key in this){
				//console.log(key);
			}
			//res.send(data);
			conn.end();
	 
		});	
			
		}else{

			console.log('ERR!!!!!!!!!!!!!!');
		}

		


	}});
	
	//return this;
}
//Lisi.prototype= new Amon();
util.inherits(Lisi,Amon);
//var lisi=new Lisi();






//lisi.listen({command:"save",data:{entity:{a:1,b:2}},isEcho:true});
//lisi.listen({command:"save",data:{entity:{a:1,b:2}},isEcho:true});

module.exports= Lisi;