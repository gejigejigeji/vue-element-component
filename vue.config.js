const path =  require('path');
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/static/' : '/',
  publicPath: './',
  outputDir: 'dist',
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
      // the source template
      template: 'template/index.html',
      // output as dist/index.html
      filename: 'index.html',
      title: 'SCM',
      chunks: ['chunk-libs', 'chunk-common', 'index', 'chunk-elementUI']
    }
  },
  chainWebpack: config => {
    // config.resolve.symlinks(true); // 修复热更新失效
    config.resolve.alias // 添加别名
        .set('@', resolve('src'));
    if (IS_PROD) {
      // 压缩图片
      config.module
          .rule("images")
          .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
          .use("image-webpack-loader")
          .loader("image-webpack-loader")
          .options({
            mozjpeg: {progressive: true, quality: 65},
            optipng: {enabled: false},
            pngquant: {quality: [0.65, 0.90], speed: 4},
            gifsicle: {interlaced: false}
          });
    }
    // 使用svg组件
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
        .test(/\.svg$/)
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]"
        });

    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    return config;
  },
  configureWebpack: config => {
    Object.assign(config, { // 开发生产共同配置
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // 只打包初始时依赖的第三方
            },
            vant: {
              name: 'chunk-elementUI', // 单独将 vant 拆包
              priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
              test: /[\\/]node_modules[\\/]elementUI[\\/]/
            }
          }
        }
      }
    })
  },
  devServer: {
    host: 'localhost',
    port: 9099,
    https: false,
    proxy: {    //配置转发
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        pathRewrite: {'^/api': ''},
        changeOrigin: true
      },
    }
  }
};