let obj = JSON.parse($response.body);
if
  delete obj.message
else
  delete obj.data.include_goods
fi
$done({body: JSON.stringify(obj)});
