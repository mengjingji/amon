var util = require("util");
var events = require("events");
var Amon=function (name){
    //console.log('init begin...');
    events.EventEmitter.call(this);
	if(name)this.name=name;else this.name='amon';
	this.commandHandler={};
    //this_=this;

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
				console.log(this.name+' teach me command:'+data.command+',have can do.');
			}else if(msg.method){
				this.commandHandler[command]=msg.method;
				console.log(this.name+' tell me command:'+command+',have can do.');
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
}
util.inherits(Amon, events.EventEmitter);
module.exports= Amon;

