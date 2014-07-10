var express = require('express');
var Amon=function (){
	//console.log('init begin...');
	for(var i in Amon){
		//console.log(i);
		//console.log(Amon[i]);
		this[i]=Amon[i];
	}
	for(var i in Amon.prototype){
		//console.log(i);
		//console.log(Amon[i]);
		//this[i]=Amon.prototype[i];
	}
	//console.log(Amon.prototype);
	//console.log(Amon.__proto__);
	//console.log(Amon.call);
	//console.log(Amon.apply);
	//console.log(Amon.arguments);
	this.name='amon';
	this.jjjj=";;;;jjj";
	this.commandHandler={};
	this.listen=function(msg){		
		
		if(typeof(msg)==='object'){
			if(msg.isEcho)this.log(msg);
			var command=msg.command;
			if(this.hasCommand(command)){
				var result= this.doCommand(command,msg.data);
				return {status:0,result:result};

			}else if(command==='tell'){
				var data=msg.data;
				this.commandHandler[data.command]=data.method;
				console.log(this.name+'告诉的操作方法已经记忆'+data.command);			
			}else if(msg.method){
				this.commandHandler[command]=msg.method;
				console.log(this.name+'指定的默认的操作方法已经记忆'+command);
				var result= this.doCommand(command,msg.data);
				return {status:0,result:result};
			}else{
				console.log('unkown command:'+command+'!!!!!!!!!!!!!!!!!!!!!!!!!!!');
			}
		}else{
			console.log('the language is know !!!');
		}
	};
	this.hasCommand=function(command){
		for(var key in this.commandHandler){
			if(key===command)return true;
		}
		return false;
	}
	this.doCommand=function(command,data){
		console.log('do command begin:'+command);
		var handler=this.commandHandler[command];
		//var result= (handler)(data);
		var result= handler.call(this,data);
		console.log('do command end:'+command);
		return result;
		
	};
	this.log=function(msg){
		if(typeof(msg)==='object'){
			//console.log(JSON.stringify(msg));
			var code='{';
			var isFirst=true;
			for(var i in msg){		
				if(isFirst){isFirst=false;}else{code+=',';}
				code+='"'+i+'":';
				//console.log(typeof(msg[i]));
				if(msg[i] instanceof  Array){
					code+='['+msg[i]+']';
				}else if(typeof(msg[i])==='string'){
					code+='"'+msg[i]+'"';
				}else{
					code+=''+msg[i];
				}
				
			}
			code+='}';
			console.log(code);
		}else{
			console.log(''+msg);
		}
		
	}
	//console.log('init end...');
	//return this;
}

Amon.a=function (){
	console.log('call a:'+ this.name);
}
Amon.a2=function (){
	console.log('call a:'+this.name);
}
//Amon.prototype=new express();
Amon.prototype.b=function (){
	console.log('call b:'+this.name);
}

module.exports= Amon;


//Amon.a();
//console.log('jjjjjjjjjjjjjjjjjj');