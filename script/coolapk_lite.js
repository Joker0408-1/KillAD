let obj = JSON.parse($response.body);
delete obj.data.include_goods.
delete obj.data.V9_HOME_TAB_GOODS.
$done({body: JSON.stringify(obj)});
