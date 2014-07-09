var Amon=require('./amon');
var util=require('util');
function Zs(name){
    Amon.call(this);
    this.type='Zs';
    this.name=name;
}
util.inherits(Zs,Amon);

module.exports=Zs;
