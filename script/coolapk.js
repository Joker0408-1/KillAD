let obj = JSON.parse($response.body);
delete obj.data.extra_pic;
delete obj.data.extra_title;
delete obj.data.extraDataArr;
delete obj.data.include_goods;
delete obj.data.extra_entities;
delete obj.data.detailSponsorCard;
$done({body: JSON.stringify(obj)});
