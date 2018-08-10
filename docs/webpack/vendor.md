# webpack入门-提取公共模块和缓存

## 一、提取公用模块
  1、增加入口文件vendor   
  2、增加提取插件webpack.optimize.CommonsChunkPlugin 
      
```
  new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
  })
```
## 二、添加hash
  output增加hash

```
output: [
    filename: '[name].[chunkHash:7].js'
]
```

## 三、提取manifest，防止vendor的hash值变化
```
new webpack.optimize.CommonsChunkPlugin({
    name: ['manifest']
})
```
manifest为webpack的启动文件代码，它会直接影响到hash值

## 四、生成index.html
```
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    plugins: [
        new HtmlWebapclPlugin({
            template: '../index.html'
        })
    ]
}
```
## 五、提取version.mapping

```
const ManifestPlugin = require('webpack-manifest-plugin')

new ManifestPlugin({
  fileName: 'version.mapping',
  serialize: function(manifest) {
    var mapping = ''
    for (var file in manifest) {
      mapping += (file + '#' + manifest[file] + '\n')
    }
    return mapping
  },
  filter: function(file) {
    return /.*\.(js|css)$/.test(file.path)
  },
  generate: function(seed, files) {
    return files.reduce(function(manifest, file) {
      manifest[file.name] = file.path.match(FILE_NAME_REG)[2]
      return manifest
    }, seed)
  }
})
```