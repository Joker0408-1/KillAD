let obj = JSON.parse($response.body);
let arr = ['include_goods'];
let index = arr.indexOf('include_goods');
delete obj.data.include_goods
$done({body: JSON.stringify(obj)});
