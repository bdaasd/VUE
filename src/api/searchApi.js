import axios from 'axios'
import {
  cparams
} from '@assets/js/paramconfig'
// 定义一个 Hotkey 的请求接口
const getHotKey = () => {
  const url = '/splcloud/fcgi-bin/gethotkey.fcg'
  const data = {
    ...cparams,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  }
  return axios
    .get(url, {
      params: data
    })
    .then(res => Promise.resolve(res.data))
}

export default getHotKey
