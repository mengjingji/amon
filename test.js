var ZhangSan=require('./zhangsan.amon');
var zhangsan=new ZhangSan('zhangsan');

//zhangsan.listen({command:"save",data:{entity:{user_name:'zhangsan',question_content:'2'},table:'t_crm_question'}});
zhangsan.listen({command:"list",data:{table:'t_crm_question',ds:null},isEcho:true});
