sys = require("util")

fs = require("fs")

var jsdom = require("jsdom"),
      window = jsdom.jsdom().createWindow();

fs.readFile(process.argv[2],function(err,data){

        if(err) throw err;

obj = eval('('+data+')')

        sys.puts(obj.page);
		for(i in obj.replies){
			var item=obj.replies[i];
			var line=item.userName+":"+item.content;
			line+='\n'+'留言时间：'+item.time;
			line+='\n'+'--------------';
			//$('#result').html($('#result').html()+'\n'+line);
			sys.puts(line);
		}
		/*
		$.each(data.replies,function(idx,item){
			if(idx==0){
				return true;//同countinue，返回false同break
			}
			var line=item.userName+":"+item.content;
			line+='\n'+'留言时间：'+item.time;
			line+='\n'+'--------------';
			$('#result').html($('#result').html()+'\n'+line);
		
		});
		*/

});
