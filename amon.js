/**
 * Created by Administrator on 14-7-9.
 */

function Amon(){
    var events=require('events');
    this.event=new events.EventEmitter();
    this.name='Amon';
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
            console.log("is handle msg..."+msg);
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
