var Ls=require('./ls');
var util=require('util');
function Ww(name){

    Ls.call(this);
    this.type='Ww';
    this.name=name;

}
util.inherits(Ww,Ls);
var ww2=new Ww('ddd');
var ww2=new Ls('sss');
var ww=new Ww('Wang Wu');
ww.hi();
ww.say({msg:'dddd',to:'zs',response:function(msg){

}});
console.log(ww.env.length);
console.log(ww2.type);
module.exports=Ww;
