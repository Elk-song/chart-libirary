// const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const cdn = {
//   js: [
//     "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js",
//     "https://cdn.bootcss.com/echarts/4.2.1/echarts.simple.min.js",
//   ]
// }
// const externals = {
//   "vue": "Vue",
//   "echarts": "echarts",
// }
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// module.exports = {
//   // parallel: require('os').cpus().length > 1,
//   chainWebpack: config => {
//     if (process.env.NODE_ENV === "production") {
//       config.optimization.delete("splitChunks");
//     }
//     config.when(process.env.NODE_ENV === "production", config => {
//       config.externals(externals)
//       // config.plugin("webpack-bundle-analyzer")
//       //   .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
//       config.plugin("html").tap(args => {
//         args[0].cdn = cdn;
//         console.log(args[0].cdn);
//         return args;
//       })
//     })

//     // config
//     //   .plugin('webpack-bundle-analyzer')
//     //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
//     // config.plugin("html").tap(args => {
//     //   if (process.env.NODE_ENV === "production") {
//     //     console.log(args[0].cdn);
//     //     args[0].cdn = cdn;
//     //   }
//     //   return args;
//     // })

//   },
//   configureWebpack: config => {
//     const plugins = [];
//     // if (process.env.NODE_ENV === "production") {
//     //   plugins.push(
//     //     //gzip压缩
//     //     new CompressionPlugin({
//     //       test: productionGzipExtensions, //匹配文件名
//     //       threshold: 10240, //对超过10k的数据压缩
//     //       deleteOriginalAssets: false //不删除源文件
//     //     })
//     //   );
//     //   config.optimization = {
//     //     splitChunks: {
//     //       cacheGroups: {
//     //         echarts: {
//     //           name: "chunk-echarts",
//     //           test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
//     //           chunks: "all",
//     //           priority: 4,
//     //           reuseExistingChunk: true,
//     //           enforce: true
//     //         }
//     //       }
//     //     }
//     //   },
//     //   plugins.push(
//     //     new UglifyJsPlugin({
//     //       uglifyOptions: {
//     //         compress: {
//     //           pure_funcs: ["console.log"] //移除console.log
//     //         }
//     //       }
//     //     })
//     //   ),
//     //   config.performance = {
//     //     hints: false
//     //   }
//     //   config.plugins = [...config.plugins, ...plugins];
//     // }

//     // if (process.env.NODE_ENV === "production") {
//     //   return {
//     //     plugins: [
//     //       //gzip压缩
//     //       new CompressionPlugin({
//     //         test: productionGzipExtensions, //匹配文件名
//     //         threshold: 10240, //对超过10k的数据压缩
//     //         deleteOriginalAssets: false //不删除源文件
//     //       }),
//     //       new UglifyJsPlugin({
//     //         uglifyOptions: {
//     //           compress: {
//     //             pure_funcs: ["console.log"] //移除console.log
//     //           }
//     //         }
//     //       })
//     //     ],
//     //     // optimization = {
//     //     //   splitChunks: {
//     //     //     cacheGroups: {
//     //     //       echarts: {
//     //     //         name: "chunk-echarts",
//     //     //         test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
//     //     //         chunks: "all",
//     //     //         priority: 4,
//     //     //         reuseExistingChunk: true,
//     //     //         enforce: true
//     //     //       }
//     //     //     }
//     //     //   }
//     //     // },

//     //     //     // externals: externals,
//     //     //     plugins: [
//     //     //       //gzip压缩
//     //     //       new CompressionPlugin({
//     //     //         test: productionGzipExtensions, //匹配文件名
//     //     //         threshold: 10240, //对超过10k的数据压缩
//     //     //         deleteOriginalAssets: false //不删除源文件
//     //     //       })
//     //     //     ],

//     //   }
//     // }
//   }
// }


const CompressionPlugin = require("compression-webpack-plugin");
const cdn = {
  js: [
    "https://cdn.jsdelivr.net/npm/vue",
    "https://cdn.bootcss.com/echarts/4.2.1/echarts.simple.min.js",
  ]
}
const externals = {
  "vue": "Vue",
  "echarts": "echarts",
}
module.exports = {
  chainWebpack: config => {
    // config
    // .plugin('webpack-bundle-analyzer')
    // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // config.plugin("html").tap(args => {
    //   if (process.env.NODE_ENV === "production") {
    //     args[0].cdn = cdn;
    //   }
    //   return args;
    // })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      return {
        externals: externals,
        plugins: [
          //gzip压缩
          new CompressionPlugin({
            test: /\.(js|css)$/, //匹配文件名
            algorithm: 'gzip',
            threshold: 10240, //对超过10k的数据压缩
            minRatio: 0.8,
          }),
          new UglifyJsPlugin({
            parallel: require('os').cpus().length > 1,
            uglifyOptions: {
              compress: {
                pure_funcs: ["console.log"] //移除console.log
              }
            }
          })
        ],
        performance: {
          hints: false
        }
      }
    }
  }
}

