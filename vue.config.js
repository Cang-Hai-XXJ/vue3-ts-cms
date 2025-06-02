const { defineConfig } = require('@vue/cli-service')
// import { BASE_URL } from '@/service/request/config'

// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  configureWebpack: {
    // server: {
    //   proxy: {
    //     '/wx': {
    //       target: BASE_URL, // 目标接口的域名
    //       changeOrigin: true, // 是否改变源地址
    //       rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
    //     }
    //   }
    // },
    resolve: {
      alias: {
        components: '@/components',
        assets: '@/assets',
        services: '@/services',
        img: '@/assets/img'
      }
    }
    // plugins: [
    //   AutoImport({
    //     resolvers: [ElementPlusResolver()]
    //   }),
    //   Components({
    //     resolvers: [ElementPlusResolver()]
    //   })
    // ]
  }
})
