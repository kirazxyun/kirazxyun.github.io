module.exports = {
  title: 'KIRA',
  description: '不能懒',
  dest: './docs/.vuepress/dist',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '编程规范', link: '/rule/' },
      { text: 'ES6', link: '/ES6/' },
      { text: 'axios', link: '/axios/' },
      { text: 'node', link: '/node/' },
      { text: '随笔', link: '/note/' },
      { text: 'vue', link: '/vue/' },
      { text: 'webpack', link: '/webpack/' }
    ],
    sidebar: {
      '/rule/': [{
        title: '编码规范',
        collapsable: false,
        children: [
          '',
          'git-commit',
          'vscode-eslint',
          'vscode-standard'
        ]
      }],
      '/ES6/': [{
        title: 'ES6学习',
        collapsable: false,
        children: [
          '',
          'let-const',
          'collection'
        ]
      }],
      '/axios/': [{
        title: 'axios',
        collapsable: false,
        children: [
          '',
          'get'
        ]
      }],
      '/node/': [{
        title: 'node',
        collapsable: false,
        children: [
          '',
          'build'
        ]
      }],
      '/note/': [{
        title: '随笔',
        collapsable: false,
        children: [
          '',
          'split-frondend',
          'template-negine'
        ]
      }],
      '/vue/': [{
        title: 'vue',
        collapsable: false,
        children: [
          '',
          'data',
          'transfer',
          'component'
        ]
      }],
      '/webpack/': [{
        title: 'webpack',
        collapsable: false,
        children: [
          '',
          'base-config'
        ]
      }]
    }
  }
}