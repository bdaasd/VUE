// 定义 code 的语义化
const CODE_OK = 0;

// 请求的公共参数
const cparams = {
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  g_tk: 5381
}
// 播放模式
const mode = {
  order: 1,
  loop: 1,
  random: 2
}

export {
  CODE_OK,
  cparams,
  mode
}