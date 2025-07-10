//时间格式化
export const formattime = (time: string | number | Date) => {
  const date = new Date(time);
  // 提取各部分并补零
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  // 拼接为标准格式（如：2023-10-27 15:30）
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};

// 处理ip地址
export const encryptIpToPassword = (ip: any) => {
  // 将IP转换为32位整数
  const parts = ip.split('.').map(Number);
  const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
  // 定义字符集 (0-9a-zA-Z)
  const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const base = charset.length;
  // 将整数转换为62进制字符串
  let password = '';
  let num = ipInt >>> 0; // 转换为无符号整数
  // 转换为62进制
  while (num > 0) {
    password = charset[num % base] + password;
    num = Math.floor(num / base);
  }
  // 不足6位时左侧补零
  while (password.length < 6) {
    password = '0' + password;
  }
  // 截取前6位（处理特殊情况，虽然IPv4不会超过6位）
  return password.substring(0, 6);
}

//将返回的流数据转换为url
export const getObjectURL = (file: any) => {
  let url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    try {
      url = window.webkitURL.createObjectURL(file);
    } catch (error) {
      console.log(error);
    }
  } else if (window.URL != undefined) {
    try {
      url = window.URL.createObjectURL(file);
    } catch (error) {
      console.log(error);
    }
  }
  return url;
}

// 计算运行的天数
export const getRuntime = (start: any) => {
  const startDate = new Date(start);
  const now = new Date();
  // 计算时间差（毫秒）
  const timeDiff = now - startDate;
  // 将毫秒转换为天数（1天 = 24小时 * 60分钟 * 60秒 * 1000毫秒）
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
}

// 将歌曲秒数格式化为 mm:ss 字符串
export const formatMusicTime = (seconds: any) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// 解析歌词文本为结构化数组
export const parseLyrics = (lrcText: any) => {
  const lyrics: { time: number; text: string }[] = [];
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/g; // 匹配 [mm:ss.xx]

  // 按行拆分歌词
  const lines = lrcText.split('\n').map(line => line.trim()).filter(line => line);

  for (const line of lines) {
    // 提取所有时间戳（可能有多个，比如重复段落）
    const timeMatches = [...line.matchAll(timeRegex)];
    if (!timeMatches.length) continue; // 无时间戳的行跳过

    // 提取歌词内容（去掉所有时间戳）
    const text = line.replace(timeRegex, '').trim();
    if (!text) continue; // 空文本跳过

    // 处理每个时间戳
    for (const match of timeMatches) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const time = minutes * 60 + seconds + milliseconds / 1000; // 转换为秒

      lyrics.push({ time, text });
    }
  }

  // 按时间戳升序排序（确保播放顺序正确）
  return lyrics.sort((a, b) => a.time - b.time);
}

// 根据当前时间查找对应的歌词索引
export const findLyricIndex = (currentTime: any, lyrics: any) => {
  if (!lyrics || !lyrics.length) return -1;

  // 二分查找最接近的歌词行
  let left = 0;
  let right = lyrics.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (lyrics[mid].time <= currentTime) {
      result = mid;
      left = mid + 1; // 尝试找更晚的歌词行
    } else {
      right = mid - 1;
    }
  }

  return result;
}