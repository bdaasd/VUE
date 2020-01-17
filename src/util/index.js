//  处理 singer
const filterSinger = (s) => {
  let str = ''
  for (let i = 0; i < s.length; i++) {
    str += `${s[i].name} / `
  }
  return str.slice(0, -3);
}

// 处理事件格式 179s -> 02 : 59
const formatTime = (t) => {
  t = Math.floor(t)
  let m = Math.floor(t / 60)
  let s = t % 60
  if (m < 10) {
    m += `0${m}`
  }
  if (s < 10) {
    s += `0${s}`
  }
  return `${m}:${s}`
}

export {
  filterSinger,
  formatTime
}