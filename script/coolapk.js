let obj = JSON.parse($response.body);
delete obj.data.data.title;
delete obj.data.include_goods;
$done({body: JSON.stringify(obj)});
