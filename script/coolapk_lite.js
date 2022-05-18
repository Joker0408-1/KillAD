let obj = JSON.parse($response.body);
delete obj.data.detailSponsorCard
$done({body: JSON.stringify(obj)});
