let obj = JSON.parse($response.body);
delete obj.data.entities
$done({body: JSON.stringify(obj)});
