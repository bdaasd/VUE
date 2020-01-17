import axios from 'axios'
import { cparams } from '@assets/js/paramconfig'
// 定义请求轮播图的接口
const getSliderList = () => {
  // 发请求拿到轮播数据
  const url = '/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = {
    ...cparams,
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  }
  // axios 发请求
  return axios.post(url, data)
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
}
// 热门歌曲数据
const getHotRecommend = () => {
  const url = '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const data = {
    ...cparams,
    picmid: 1,
    rnd: Math.random(),
    platform: 'yqq.json',
    needNewCode: 0,
    categoryId: 28,
    sortId: 5,
    sin: 0,
    ein: 19
  }
  return axios.get(url, {
    params: data
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
}

export {
  getSliderList,
  getHotRecommend
}