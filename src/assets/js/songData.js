import { filterSinger } from '@util'
// 解构 musicData中我们需要的数据
class Song {
  constructor({
    albumname,
    albummid,
    songid,
    songmid,
    songname,
    singer,
    interval,
    purl = ''
  }) {
    this.albumname = albumname
    this.albummid = `http://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
    this.songid = songid
    this.songmid = songmid
    this.songname = songname
    this.singer = filterSinger(singer)
    this.interval = interval
    this.purl = purl
  }
}

export default Song
