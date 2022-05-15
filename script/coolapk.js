let obj = JSON.parse($response.body);
delete obj.data.categoryInfo
$done({body: JSON.stringify(obj)});
