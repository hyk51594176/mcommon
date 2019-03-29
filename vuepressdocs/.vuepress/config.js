const path = require('path')

module.exports = {
  base: '/mcommon/',
  title: 'mcommon',
  description: '基于element-ui form、table二次封装，支持原table和form的所有功能。',
  dest:path.resolve(__dirname,'../../docs/'),
  themeConfig: {
    repo: 'hyk51594176/mcommon',
    docsDir: 'docs',
    nav:[
      {
        text: '主页',
        link: '/'
      },
      {
        text: '指南',
        link: '/guide/'
      }
    ],
    sidebar: {
      '/guide/':[{
        title:'指南',
        collapsable: false,
        children: [ 
          '',
          'mselect',
          'mform',
          'mtable',
         ]
      }]
    }
  }
}
