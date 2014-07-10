var util = require("util");
var events = require("events");
var env=[];
env['event']=new events.EventEmitter();
env['event'].on('broadcast',function(msg){
    if(typeof (msg)==='object'){
        if(msg.to){
            msg.to.emit('listen',msg);
        }
    }else{
        console.log('fei fa broadcast!!');
    }

});

var Amon=function (name){
    //console.log('init begin...');
    events.EventEmitter.call(this);
	if(name)this.name=name;else this.name='amon';
	this.commandHandler={};
    this_=this;
    this.env=env;
    this.env.push(this);
    this.on('reply',function(msg,data){


    });
    this.hash=function(obj){
        var str='';
        if(typeof (obj)==='object'){
            for(var key in obj){
                str+=''+key+obj[key];
            }
        }else{
            str=""+obj;
        }
        prime=key=str;
        str=str+"";
        var h = 0, off = 0;
        var len = str.length;

        for(var i = 0; i < len; i++){
            h = 31 * h  + str.charCodeAt(off++);
            if(h>0x7fffffff || h<0x80000000){
                h=h & 0xffffffff;
            }
        }
        return h+'';
    }
    this.say=function(msg,callback){
        if(typeof (callback)==='function'){
            console.log('*************************'+this.hash(msg));
            this.once('aa',callback);
        }else{
            //this.hash(msg)
        }
        if(typeof (msg)==='object'){
            if(msg.to){
                msg['from']=this;
                msg['time']=new Date();
                this.env['event'].emit('broadcast',msg);
                //msg.to.emit('listen',msg);
            }else{
                throw new Error('msg have must has "to" field! ');
            }
        }else{
            console.log('unkonw msg type:'+msg);
        }

    };
    this.on("listen",function(msg){
        if(typeof(msg)==='object'){
            console.log('------------------------')
            console.log(this.name);
            console.log('------------------------')
            this.listen(msg);
        }else{
            console.log("unknow msg:"+msg);
        }
    });

	this.listen=function(msg){
		if(typeof(msg)==='object'){
			if(msg.isEcho)this.log(msg);
			var command=msg.content.command;
			if(this.hasCommand(command)){
				this.doCommand(command,msg.content.data);
				//return {status:0,result:result};
			}else if(command==='tell'){
				var data=msg.content.data;
				this.commandHandler[data.command]=data.method;
				console.log(this.name+' teach me command:'+data.command+',have learn.');
			}else if(msg.content.method){
				this.commandHandler[command]=msg.content.method;
				console.log(this.name+' tell me command:'+command+',have learn.');
				this.doCommand(command,msg.content.data);
				//return {status:0,result:result};
			}else{
				console.log('unkown command:'+command+'!!!!!!!!!!!!!!!!!!!!!!!!!!!');
			}
		}else{
			console.log('the language is know !!!');
		}
	};
    this.reply=function(){

    }
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

