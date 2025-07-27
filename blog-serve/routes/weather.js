const axios = require('axios');
const useragent = require('useragent');

// 高德 API Key（请替换为你的实际密钥）
const GAODE_IP_KEY = "d73db34078a3a7e336de27eec33e6a64"; // 高德IP key
const GAODE_WEATHER_KEY = "d73db34078a3a7e336de27eec33e6a64"; // 高德 天气key


/**
 * 获取客户端 IP（优化：处理IPv4映射和本地IP）
 */
function getClientIp(req) {
  // 处理代理转发的IP
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    // 取第一个公网IP（过滤内网IP）
    for (const ip of ips) {
      if (!ip.startsWith('10.') && !ip.startsWith('192.168.') && !ip.startsWith('172.')) {
        return ip;
      }
    }
  }

  // 处理直接连接的IP
  let remoteIp = req.connection.remoteAddress || '';
  // 处理IPv4映射地址（如 ::ffff:123.123.123.123）
  if (remoteIp.startsWith('::ffff:')) {
    remoteIp = remoteIp.slice(7);
  }

  // 本地开发时用测试公网IP（避免127.0.0.1无法定位）
  const localIps = ['127.0.0.1', '::1'];
  return localIps.includes(remoteIp) ? '202.102.192.68' : remoteIp;
}


/**
 * 调用高德 IP 定位 API（带详细日志）
 */
async function getLocation(ip) {
  const url = `https://restapi.amap.com/v3/ip?ip=${ip}&key=${GAODE_IP_KEY}`;
  try {
   //  console.log(`[IP定位] 请求URL: ${url}`); // 打印完整URL，确认Key和IP
    const response = await axios.get(url, { timeout: 8000 });
    const data = response.data;
    // console.log(`[IP定位] 高德返回原始数据: ${JSON.stringify(data)}`); // 关键日志

    if (data.status === "1" && data.adcode) {
      return {
        success: true,
        ip,
        country: data.country || "未知",
        province: data.province || "未知",
        city: data.city || "未知",
        adcode: data.adcode
      };
    } else {
      console.error(`[IP定位] 失败原因: ${data.info || '未知'}，错误码: ${data.infocode || '无'}`);
      return {
        success: false,
        message: `IP定位失败: ${data.info || '未知错误'}`,
        errorCode: data.infocode
      };
    }
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
    console.error(`[IP定位] 请求失败: ${errorMsg}`);
    return {
      success: false,
      message: `网络错误: ${error.message}`,
      errorCode: 'network_error'
    };
  }
}


/**
 * 调用高德天气 API（带详细日志）
 */
async function getWeather(adcode) {
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${GAODE_WEATHER_KEY}&extensions=base`;
  try {
    // console.log(`[天气查询] 请求URL: ${url}`); // 打印完整URL
    const response = await axios.get(url, { timeout: 8000 });
    const data = response.data;
    // console.log(`[天气查询] 高德返回原始数据: ${JSON.stringify(data)}`); // 关键日志

    if (data.status === "1" && data.lives && data.lives.length > 0) {
      const weather = data.lives[0];
      return {
        success: true,
        low: weather.temperature + "°C",
        high: weather.temperature + "°C",
        tq: weather.weather,
        fl: weather.windpower + "级",
        fengxiang: weather.winddirection
      };
    } else {
      console.error(`[天气查询] 失败原因: ${data.info || '未知'}，错误码: ${data.infocode || '无'}`);
      return {
        success: false,
        message: `天气查询失败: ${data.info || '未知错误'}`,
        errorCode: data.infocode
      };
    }
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message;
    console.error(`[天气查询] 请求失败: ${errorMsg}`);
    return {
      success: false,
      message: `网络错误: ${error.message}`,
      errorCode: 'network_error'
    };
  }
}


/**
 * API 接口：获取访客信息和天气（带异常捕获）
 */
module.exports = function (app) {
  app.get('/weather', async (req, res) => {
    try {
      // 格式化时间（年-月-日 时:分:秒）
      const now = new Date();
      const [year, month, day, hour, minute, second] = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, '0'),
        String(now.getDate()).padStart(2, '0'),
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0')
      ];
      const timeStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      const weekStr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][now.getDay()];

      // 获取客户端IP
      const ip = getClientIp(req);
      // console.log(`[接口请求] 客户端IP: ${ip}`);

      // 分步调用API
      const location = await getLocation(ip);
      let weather = { success: false, message: "未执行天气查询（定位失败）" };
      if (location.success) {
        weather = await getWeather(location.adcode);
      }

      // 解析浏览器信息
      const agent = useragent.parse(req.headers['user-agent'] || '未知浏览器');
      const browserInfo = {
        browser: agent.family,
        browser_ver: `${agent.major || '0'}.${agent.minor || '0'}`,
        system: agent.os.toString() || '未知系统'
      };

      // 组装响应数据
      const result = {
        success: location.success && weather.success,
        time: timeStr,
        week: weekStr,
        ip,
        location: `${location.province || "未知"}-${location.city || "未知"}`,
        ...browserInfo,
        ...weather
      };

      res.json(result);
    } catch (error) {
      console.error(`[接口异常] 整体处理失败: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "服务器内部错误",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });
};