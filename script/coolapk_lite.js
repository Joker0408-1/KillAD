let obj = JSON.parse($response.body);
delete obj.data.entities;
delete obj.entities.pic;
$done({body: JSON.stringify(obj)});
