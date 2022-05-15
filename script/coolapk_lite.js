let obj = JSON.parse($response.body);
delete obj.data.categoryInfo;
delete obj.data.include_goods;
$done({body: JSON.stringify(obj)});
