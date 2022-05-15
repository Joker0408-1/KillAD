let obj = JSON.parse(magicJS.response.body);
   delete obj.data;
$done({body: JSON.stringify(obj)});
