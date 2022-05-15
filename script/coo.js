let obj = JSON.parse(magicJS.response.body);
   if(obj.data.length>3){
   delete obj.data[0];
   delete obj.data[3];
         }
   body = JSON.stringify(obj);
         } catch (err) {
   magicJS.logError(`屏蔽热搜出现异常：${err}`);
         }
   break;
$done({body: JSON.stringify(obj)});
