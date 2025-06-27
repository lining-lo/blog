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
