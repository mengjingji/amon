var ZhangSan=require('./zhangsan.amon');
var zhangsan=new ZhangSan('zhangsan');

zhangsan.listen({command:"save",data:{entity:{a:1,b:2},table:'t1',ds:'ds1'},help:'',method:function(data){
    var msg=this.listen({command:"connectToMysql",data:{
        host:'localhost',
        port:3310,
        user:'root',
        database:'crm',
        password:'srttest'
    }});

    if(msg.status===0){
        var conn=msg.result;
        conn.query('SELECT * from t_crm_question', function(err, rows, fields) {
            if (err) {
                throw err;
            }
            var data = '{\n';
            for(var i = 0; i < rows.length; i++){
                data += '[';
                data += '{';
                data += 'ID:' + rows[i].id+',' ;
                data += 'title:' + rows[i].recordor_account +',' ;
                data += 'contents:' + rows[i].question_content ;
                data += '}';
                data += '],\n';
            }
            data += '}';
            console.log(" data: "+data);
            console.log(" by "+zhangsan.name);
            conn.end();
        });

    }else{

        console.log('ERR!!!!!!!!!!!!!!');
    }




}});

zhangsan.listen({command:"save",data:{entity:{a:1,b:2}},isEcho:true});
zhangsan.listen({command:"save1",data:{entity:{a:1,b:2}},isEcho:true});