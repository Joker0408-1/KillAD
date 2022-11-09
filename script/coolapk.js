let obj = JSON.parse($response.body);
if (obj.hasOwnProperty("data")) {
delete obj.data.include_goods
}
$done({ body: JSON.stringify(bodyObj) });

