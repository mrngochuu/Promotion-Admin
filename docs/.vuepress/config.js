module.exports = {
  title: 'Problem Resolving',
  description: 'Problem Resolving Admin',
  base: '/vue-antd-admin-docs/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    repo: 'iczer/vue-antd-admin',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上帮助我们编辑此页',
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Layout', link: '/develop/layout'},
      {text: 'Theme', link: '/advance/theme'},
    ],
    lastUpdated: 'Last Updated',
    sidebar: [
      {
        title: 'Start',
        collapsable: false,
        children: [
          '/start/use', '/start/faq'
        ]
      },
      {
        title: 'Develop',
        collapsable: false,
        children: [
          '/develop/layout', '/develop/router', '/develop/page', '/develop/theme', '/develop/service', '/develop/mock'
        ]
      },
      {
        title: '进阶',
        collapsable: false,
        children: [
          '/advance/i18n', '/advance/async', '/advance/authority', '/advance/login', '/advance/guard', '/advance/interceptors'
        ]
      },
      {
        title: 'Other',
        collapsable: false,
        children: [
          '/other/upgrade', '/other/community'
        ]
      }
    ],
    nextLinks: true,
    prevLinks: true,
  },
  plugins: ['@vuepress/back-to-top', require('./plugins/alert')],
  markdown: {
    lineNumbers: true
  }
}
