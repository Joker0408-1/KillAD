let obj = JSON.parse($response.body);
delete obj.message
delete obj.data.include_goods
$done({body: JSON.stringify(obj)});
