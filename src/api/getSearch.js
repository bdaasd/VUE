import axios from 'axios'
import {
  cparams
} from '@assets/js/paramconfig'
const getSearch = (query, page) => {
    const url = '/soso/fcgi-bin/search_for_qq_cp'
    const data = {
      ...cparams,
      uin: 0,
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: query,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: page,
      remoteplace: 'txt.mqq.all'
    }
    return axios
      .get(url, {
        params: data
      })
      .then(res => Promise.resolve(res.data))
  }
  export default getSearch