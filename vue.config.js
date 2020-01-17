const path = require('path')
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 简化模块引入的路径
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@base': path.resolve(__dirname, 'src/base'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@util': path.resolve(__dirname, 'src/util')
      },
      extensions: ['.vue', '.js', '.styl', '.css']
    },
    devServer: {
      proxy: { // 设置请求代理
        '/musichall': { // 代理轮播
          target: 'https://c.y.qq.com',
          changeOrigin: true
        },
        '/v8': { // 歌手列表
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          }
        },
        '/cgi-bin': { // 播放源
          target: 'https://u.y.qq.com',
          changeOrigin: true,
          headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
          }
        },
        '/splcloud': { // Hotkey 热门歌曲
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          }
        },
        '/qzone': { // 热门歌曲列表数据
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          }
        },
        '/soso': { // 热门歌曲列表数据
          target: 'https://c.y.qq.com',
          changeOrigin: true,
          headers: { // 搜索下拉菜单
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          }
        }
      }
    }
  }
}
