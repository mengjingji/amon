var Wangwu =  require('./wangwu.amon');
var util=require('util');

function Zhangsan(name){
	Wangwu.call(this);
	this.name=name;
    if(!name){this.name='Zhangsan.init.noname';}
    this.type="ZhangSan";
    this.description='ability:add [save,list] method.';
    this_=this;
	this.listen({command:"tell",data:{command:"save",data:{entity:{"string:fieldName":'var:fieldValue',"string:fieldName2":'var:fieldValue2'},table:'string:tableName',ds:'object:ds'},method:function(data){
        var msg=this.listen({command:"connectToMysql",data:data.ds});
        if(msg.status===0){
            var conn=msg.result;
            var sql="insert into "+data.table;
            var fields='';
            var values='';
            for(var key in data.entity){
                if(fields!==''){fields+=','}
                if(values!==''){values+=','}
                fields+=key;
                var value=data.entity[key];
                if(typeof (data.entity[key])=== 'string'){
                    value="'"+value+"'";
                }
                values+=value;
            }
            sql+='('+fields+') values('+values+');';
            conn.query(sql);
            console.log(sql);
            console.log('save ok');
        }else{
            console.log('ERR!!!!!!!!!!!!!!');
        }
    }}});

    this.listen({command:"tell",data:{command:"list",data:{table:'string:tableName',ds:'object:ds'},help:'',method:function(data){
       var msg=this.listen({command:"connectToMysql",data:data.ds});
        if(msg.status===0){
            var conn=msg.result;
            conn.query('SELECT * from '+data.table, function(err, rows, fields) {
                if (err) {
                    throw err;
                }
                var data = '{\n';
                for(var i = 0; i < rows.length; i++){
                    data += '[';
                    data += '{';
                    for(var key in rows[i]){
                        if(typeof(rows[i][key])==='function')continue;
                        data += key+':' + rows[i][key]+',' ;
                    }
                    data += '}';
                    data += '],\n';
                }
                data += '}';
                console.log(" data: "+data);
                console.log(" by "+this_.name);
                conn.end();
            });

        }else{
            console.log('ERR!!!!!!!!!!!!!!');
        }
    }}});
}
util.inherits(Zhangsan,Wangwu);
module.exports= Zhangsan;