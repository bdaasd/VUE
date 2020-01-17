import axios from 'axios'
import { cparams } from '@assets/js/paramconfig'

// 定义歌手列表接口
const getSingerList = () => {
  const url = '/v8/fcg-bin/v8.fcg'
  const data = {
    ...cparams,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    page: 'list',
    channel: 'singer',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1
  }
  return axios.get(url, {
    params: data
  })
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 定义歌曲列表接口
const getSongList = (smid) => {
  const url = '/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = {
    ...cparams,
    singermid: smid,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  }
  return axios.get(url, {
    params: data
  })
    .then(res => res.data)
    .catch(err => console.log(err))
}

export {
  getSingerList,
  getSongList
}
