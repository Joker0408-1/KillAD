/*好物推荐*/
let obj = JSON.parse($response.body);

delete obj.data.include_goods
$done({body: JSON.stringify(obj)});
