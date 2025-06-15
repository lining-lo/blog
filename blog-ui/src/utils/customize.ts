//时间格式化
export const formattime = (time: string | number | Date) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // 显式转换为字符串
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  
  return `${year}.${formattedMonth}.${formattedDay}`;
};
