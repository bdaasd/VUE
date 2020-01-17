import axios from 'axios'
import {
  cparams
} from '@assets/js/paramconfig'
// 定义播放源的接口
const getPlayurl = (songmid) => {
  const url = '/cgi-bin/musicu.fcg'
  const data = {
    ...cparams,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '7592953634',
          songmid, // 数组，songmid是歌曲的一个标识
          songtype: [0],
          uin: '729346758',
          loginflag: 1,
          platform: '20'
        }
      }
    }
  }
  return axios.get(url, {
    params: data
  }).then(res => res.data)
    .catch(err => console.log(err))
}

export default getPlayurl
