var Lisi =  require('./lisi.amon');
var util=require('util');
function Wangwu(name){
	Lisi.call(this);
	this.name=name;
    this.description='';
    if(!name){this.name='WangWu.init.noname';}
    this.type="WangWu";
}
util.inherits(Wangwu,Lisi);
module.exports= Wangwu;