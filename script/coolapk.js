let obj = JSON.parse($response.body);
delete obj.data.data.entities;
delete obj.data.include_goods;
$done({body: JSON.stringify(obj)});
