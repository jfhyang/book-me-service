
function getOpenId(req) {
  if (!req.headers["x-wx-source"]) {
    throw new Error("Open ID not found")
  }
  return req.headers["x-wx-openid"]
}

module.exports = {
  getOpenId
}