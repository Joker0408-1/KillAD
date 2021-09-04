const nicknames = [
  "(讲|聊|微|电|電|剪|观|说|照|野|泡|探|猎)影",
  "影(视|剪|院|探|评)",
  "剧(场|社)",
  "(迷|神|扒|侃|看|追|撩|热血|说|好)剧",
  "(撩|说|看|探)(大?)片",
  "解说",
  "剪(辑|剧|刀)",
  "(混|夜|渣|爱)剪",
  "电视[^台]*$",
  "(购物|豪|说|讲|二手|估)车",
  "车(饰|友|俱乐部)",
  "团(建|购)",
  "(追|明)星",
  "(卖衣|西)服",
  "服(务商|装)",
  "(男|女|童)装",
  "(吃|百)货",
  "吃.*成都",
  "网红",
  "手游",
  "游戏",
  "综艺",
  "工艺品",
  "打工",
  "配音",
  "培训",
  "娱乐",
  "乐园",
  "PM",
  "编程|教学",
  "公司|品牌",
  "文化传媒",
  "探房",
  "房产",
  "机械制造",
  "健身",
  "相亲会",
  "减重|瘦了|美食",
  "求婚策划",
  "策划师",
  "穿搭",
  "格斗",
  "(运|训练)营",
  "装修",
  "珠宝",
  "粉丝团",
  "商(贸|业)",
  "整形",
  "贸易",
  "外卖|批发",
  "直销|销售|厂家|家政|劳务",
  "测(试|一测)",
]

const customVerifyNames = [
  "娱(乐|评)",
  "((?!三农).)*自媒体",
  "贸易",
  "明星",
  "观影",
  "机械制造",
  "公司",
  "维修",
  "网络科技",
  "百货",
  "影评",
]

const descNames = [
  "娱乐圈",
  "男装",
  "(电视|好)剧",
  "工作室",
  "女装",
  "剧场",
  "剪辑",
  "带货",
  "观影",
  "影视",
]

const signatureNames = [
  "剪辑",
  "明星视频",
  "出租",
  "中介",
  "西装",
  "二手",
  "网红",
]

const anchorNames = [
  "烧烤",
  "火锅",
  "测(一?)测",
  "购物",
  "团购",
  "电影",
  "食品|折扣",
  "教学",
]

const nicknamePattern = new RegExp(nicknames.join("|"), 'mi')
const customVerify = new RegExp(customVerifyNames.join("|"), 'mi')
const descPattern = new RegExp(descNames.join("|"), 'mi')
const signaturePattern = new RegExp(signatureNames.join("|"), 'mi')
const anchorPattern = new RegExp(anchorNames.join("|"), 'mi')



const enabled_live = false; // 开启直播推荐，默认关闭

try {
  let body = $response.body.replace(/\"room_id\":(\d{2,})/g,'"room_id":"$1"');
  let obj = JSON.parse(body);
  if (obj.data) obj.data = filter_data(obj.data);
  if (obj.aweme_list) obj.aweme_list = filter_aweme_list(obj.aweme_list);
  if (obj.aweme_detail) obj.aweme_detail = filter_aweme_detail(obj.aweme_detail);
  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log(`douyin.js: ${e.message}, ${e.stack}`)
  $done({});
}

function is_block_content(aweme) {
  let author = aweme.author
  if (!author) {
    return false
  }

  if (author.nickname && nicknamePattern.test(author.nickname)) {
    console.log(`Nickname: ${author.nickname}`)
    return true
  }
  
  if (author.signature && signaturePattern.test(author.signature)) {
    console.log(`Signature: ${author.signature}`)
    return true
  }

  if (author.custom_verify && customVerify.test(author.custom_verify)) {
    console.log(`Custom verify: ${author.custom_verify}`)
    return true
  }
  
  if (aweme.desc && descPattern.test(aweme.desc)) {
    console.log(`Desc: ${aweme.desc}`)
    return true
  }
  
  if (aweme.anchor_info) {
    if (aweme.anchor_info.title) {
      console.log(`aweme.anchor_info.title: ${aweme.anchor_info.title}`)
    }
    if (aweme.anchor_info.title_tag) {
      console.log(`aweme.anchor_info.title_tag: ${aweme.anchor_info.title_tag}`)
    }
    
    if (anchorPattern.test(aweme.anchor_info.title) || anchorPattern.test(aweme.anchor_info.title_tag) || anchorPattern.test(aweme.anchor_info.extra)) {
      return true
    }
  }
  
  if (aweme.mix_info && (descPattern.test(aweme.mix_info.mix_name) || descPattern.test(aweme.mix_info.desc))) {
    console.log(`mix_name=${aweme.mix_info.mix_name}, mix_desc=${aweme.mix_info.desc}`)
    return true
  }

  return false
}

function filter_data(data) {
  if (data && data.length > 0) {
    let i = data.length;
    while (i--) {
      let element = data[i].aweme;
      if (element.images) filter_images(element.images);
      if (element.video) filter_videos(element);
    }
  }
  return data;
}

function filter_aweme_list(aweme_list) {
  if (aweme_list && aweme_list.length > 0) {
    let i = aweme_list.length;
    while (i--) {
      let element = aweme_list[i];
      if (element.is_ads == true || is_block_content(element)) {
        aweme_list.splice(i, 1);
      } else if (element.images) {
        filter_images(element.images);
      } else if (element.video) {
        filter_videos(element);
      } else {
        if (!enabled_live) aweme_list.splice(i, 1);
      }
    }
  }
  return aweme_list;
}

function filter_aweme_detail(aweme_detail) {
  if (aweme_detail.images) filter_images(aweme_detail.images);
  if (aweme_detail.video) filter_videos(aweme_detail);
  return aweme_detail;
}

function filter_images(images) {
  let j = images.length;
  while (j--) {
    images[j].download_url_list = images[j].url_list;
  }
  return images;
}

function filter_videos(videos) {
  videos.status.reviewed = 1;
  videos.video_control.allow_download = true;
  videos.video_control.prevent_download_type = 0;
  delete videos.video.misc_download_addrs;
  const play_url = videos.video.play_addr;
  videos.video.download_addr = play_url;
  videos.video.download_suffix_logo_addr = play_url;
  return videos;
}
