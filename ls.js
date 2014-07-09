var Zs=require('./zs');
var util=require('util');
function Ls(name){
    Zs.call(this);
    this.type='Ls';
    this.name=name;
}
util.inherits(Ls,Zs);

module.exports=Ls;
