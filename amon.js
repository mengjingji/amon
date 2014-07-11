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
        console.error('fei fa broadcast!!');
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
    this.env[this.name]=this;
    this.callbackMap={};


    this.get=function(name){
        for(var i=0;i<this.env.length;i++){
            if(name===this.env[i].name)return this.env[i];
        }
    }
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
        var caller=this;
        if(typeof (msg)==='object'){
            if(!msg.content){
                var msg_={};
                msg_.content=msg;
                msg=msg_;
            }

            if(!msg.to)msg['to']=this;
            if(!msg.time)msg['time']=new Date();
            if(!msg.random)msg['random']=Math.random();
            if(typeof (callback)==='function'){
                //caller.once(msg.random,callback);
                if(callback)this.callbackMap[msg.random]=callback;
            }
            if(msg.to){
                if(!msg.from)msg['from']=this;
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
            this.listen(msg);
        }else{
            console.log("unknow msg:"+msg);
        }
    });

	this.listen=function(msg){
		if(typeof(msg)==='object'){
			if(msg.isEcho)this.log(msg);
			var command=msg.content.command;
            //this.log(msg.content);
			if(this.hasCommand(command)){
				//this.doCommand(command,msg.content.data);
				this.doCommand(command,msg);
				//return {status:0,result:result};
			}else if(command==='tell'){
				var data=msg.content.data;
				if(data.method){
                    this.commandHandler[data.command]=data.method;
                    console.log(this.name+' teach me command:'+data.command+',have learn.');
                }else{
                    console.warn('tell me command: '+data.command,' , but no method,do nothing instead!')
                }

			}else if(msg.content.method){
				this.commandHandler[command]=msg.content.method;
				console.log(this.name+' tell me command:'+command+',have learn.');
				//this.doCommand(command,msg.content.data);
				this.doCommand(command,msg);
				//return {status:0,result:result};
			}else{
				console.error('unkown command:'+command+'!!!!!!!!!!!!!!!!!!!!!!!!!!!');
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
    this.say({time:new Date(),content:{command:"tell",data:{command:"reply",data:{src:"msgObj:msgReq",result:"obj:result"},method:function(msg){
        //msg.content.data.src.from.emit(msg.content.data.src.random, msg.content.data.result, msg.content.data.src);
        var srcMsg=msg.content.data.src;
        var result=msg.content.data.result;
        var msgCallback=this.callbackMap[srcMsg.random];
        if(msgCallback)msgCallback.call(this,result,srcMsg);
    }}},from:this,to:this});
	//console.log('init end...');
}
util.inherits(Amon, events.EventEmitter);
module.exports= Amon;

