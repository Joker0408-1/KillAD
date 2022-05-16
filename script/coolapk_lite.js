let obj = JSON.parse($response.body);
delete obj.data.entities.categoryInfo
$done({body: JSON.stringify(obj)});
