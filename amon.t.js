/**
 * Created by Administrator on 14-7-9.
 */
var env=[];
function Amon(name){
    var events=require('events');
    this.event=new events.EventEmitter();
    this.type='Amon';
    this.name='amon';
    if(name)this.name=name;
    this.env=env;
    this.env.push(this);
    var this_=this;

    this.event.on("say",function(msg){
        if(typeof(msg)==='object'){
            console.log(this_.name+' get msg:');
            console.log('{');
            for(var key in msg){
                console.log('"'+key+'":'+msg[key]);
            }
            console.log('}');
        }else{
            console.log(''+msg);
        }
        if(typeof (msg)==='object'){
            console.log("is handle msg begin..."+msg);
            for(var i=this_.env.length-1;i>=0;i--){
                console.log('my type:'+this_.env[i].type);
                console.log('my name:'+this_.env[i].name);
            }
            console.log("is handle msg end..."+msg);
        }else{
            console.log("unknow msg:"+msg);
        }
        console.log("say恭喜,处理完毕!");
    });
    this.hi=function(){
        console.log('hi');
    }
    this.say=function(msg){
        this.event.emit('say',msg);
    }

}
module.exports=Amon;
