let obj = JSON.parse($response.body);
delete obj.data.entities;
delete obj.entities.entities.pic;
$done({body: JSON.stringify(obj)});
