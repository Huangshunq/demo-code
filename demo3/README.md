# vue-prerender-demo

> A Vue.js project

## 初始化 vue-cli 项目

环境前提：需要已经安装好 node 和 npm。

``` bash
// 全局安装 vue-cli
npm i -g vue-cli

// 生成 vue 项目，使用 webpack-simple 模板
vue init webpack-simple vue-prerender-demo

// 安装默认所需依赖
cd vue-prerender-demo
npm i

// 调试项目
npm run dev

// 编译打包项目
npm run build
```

## 添加 copy-webpack-plugin 插件

使用 copy-webpack-plugin 插件，其作用是将 HTML 文件复制到所需的路径下，然后为使用 prerender-spa-plugin 插件做准备。

``` bash
// 安装插件
npm i -D copy-webpack-plugin
```

然后在 src 目录下新建文件夹 static，把项目根目录下的 index.html 剪切到该文件夹下，修改 package.json 的 scripts 参数中的 dev 如下：

``` package.json
"dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot --content-base src/static"
```

然后修改 webpack-config.js：

``` js
// ......
  module.exports.plugins = (module.exports.plugins || []).concat([
    // ......
    new CopyWebpackPlugin([{
      from: 'src/static/index.html',
      to: '../'
    }])
  ])
```

## 使用 prerender-spa-plugin 插件

使用 prerender-spa-plugin 插件，可以解决使用 JS动态渲染 而带来的的 SEO 问题，预渲染技术将使我们能够保持我们的前端作为一种快速，轻量级的静态网站，便于“蜘蛛”进行爬取。

``` bash
// 安装插件
npm i -D prerender-spa-plugin
```

然后修改 webpack-config.js，修改js打包编译输出路径，并添加预渲染插件的配置：

``` js
module.exports = {
  // ......
  output: {
    path: path.resolve(__dirname, './dist/dist/'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
}

// ......

  module.exports.plugins = (module.exports.plugins || []).concat([
    // ......
    new CopyWebpackPlugin([{
      from: 'src/static/index.html',
      to: '../'
    }]),
    new PrerenderSpaPlugin(
      path.join(__dirname, 'dist'),
      [ '/' ]
    )
  ])
```

最后，进行打包编译查看预渲染结果：

``` bash
npm run build

// 可以执行以下命令模拟查看服务器环境下的效果：
npm run dev
```

<!-- For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader). -->
