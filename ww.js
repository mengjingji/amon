var Ls=require('./ls');
var util=require('util');
function Ww(){
    Ls.call(this);
}
util.inherits(Ww,Ls);

var ww=new Ww();
ww.hi();
ww.say({msg:'dddd',to:'zs'});
module.exports=Ww;
