import axios from 'axios'
import { cparams } from '@assets/js/paramconfig'

const getRankSonglist = topid => {
  // 排行二级页请求接口
  const url = '/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = {
    ...cparams,
    topid,
    uin: 0,
    tpl: 1,
    page: 'detail',
    type: 'top',
    platform: 'h5',
    needNewCode: 1
  }
  return axios.get(url, {
    params: data
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
}
export default getRankSonglist