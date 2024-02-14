

module.exports = {
  getOpenId: function(req) {
    if (req.headers["x-wx-source"]) {
      throw new Error("未找到微信 Open ID")
    }
    return req.headers["x-wx-openid"]
  }
}