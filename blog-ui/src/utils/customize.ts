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
export const getObjectURL = (file:any) => {
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