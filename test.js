var Amon=require('./amon');
var Lisi=require('./lisi.amon');
var WangWu=require('./wangwu.amon');
var ZhangSan=require('./zhangsan.amon');

var amon=new Amon('amon');
var lisi=new Lisi('lisi');
var wangwu=new WangWu('WangWu');
var zhangsan=new ZhangSan('zhangsan');

//zhangsan.listen({command:"save",data:{entity:{user_name:'zhangsan',question_content:'3'},table:'t_crm_question'}});
//zhangsan.listen({command:"list",data:{table:'t_crm_question'},isEcho:true});

var msg={to:zhangsan,content:{command:"list",data:{table:'t_crm_question'},isEcho:true} };
amon.say(msg,function(data){


});
/*
amon.once(amon.hash(msg),function(data){

})
*/

