let obj = JSON.parse($response.body);
delete obj.data.include_goods;
delete obj.data.title[酷品];
$done({body: JSON.stringify(obj)});
