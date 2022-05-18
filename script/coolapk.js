let obj = JSON.parse($response.body);
delete obj.data.include_goods;
delete obj.data.extra_entities;
$done({body: JSON.stringify(obj)});
