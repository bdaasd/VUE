import axios from 'axios'
import { cparams } from '@assets/js/paramconfig'
// 请求热门列表的每一首歌
const getHotSonglist = dissid => {
  const url = '/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = {
    ...cparams,
    disstid: dissid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    new_format: 1,
    hostUin: 0,
    needNewCode: 0
  }
  return axios.get(url, {
    params: data
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
}
export default getHotSonglist
