var jsonData = {1:关注,2:头条,3:话题,4:快讯,5:酷图,6:新机,7:教程,8:酷品,9:汽车,10:美化,11:热榜,12:问答};
delete jsonData.8;
console.log(jsonData);
$done({body: JSON.stringify(obj)});
