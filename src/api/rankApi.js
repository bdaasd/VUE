import axios from 'axios'
import { cparams } from '@assets/js/paramconfig'

const getRanklist = () => {
  /* 排行页的请求数据接口 */
  const url = '/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = {
    ...cparams,
    uin: 0,
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

export default getRanklist
