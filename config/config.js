import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
}

export default {
  plugins,
  block: {
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/basicLayout',
      Routes: ['src/pages/Authorized'],
      authority: ['admin', 'user'],
      routes: [
        {
          path: '/',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        // 资源库管理
        {
          path: '/resource',
          name: 'resource',
          icon: 'desktop',
          routes:[{
            path: '/resource/db',
            name: 'db',
            icon: 'right',
            component: './resource/Db',
          },{
            path: '/resource/check',
            name: 'check',
            icon: 'right',
            component: './resource/Check',
          },{
            path: '/resource/comment',
            name: 'comment',
            icon: 'right',
            component: './resource/Comment',
          }]
        },
        // 模块管理
        {
          path: '/qn',
          name: 'qn',
          icon: 'file',
          routes:[{
            path: '/qn/question',
            name: 'question',
            icon: 'right',
            component: './qn/Question',
          },{
            path: '/qn/questionNaire',
            name: 'questionNaire',
            icon: 'right',
            component: './qn/QuestionNaire',
          }]
        },
        {
          path: '/survey',
          name: 'survey',
          icon: 'star',
          routes:[{
            path: '/survey/create',
            name: 'create',
            icon: 'right',
            component: './survey/Create',
          },{
            path: '/survey/monitor',
            name: 'monitor',
            icon: 'right',
            component: './survey/Monitor',
          }]
        },
        {
          path: '/statistics',
          name: 'statistics',
          icon: 'stock',
          routes:[{
            path: '/statistics/checkSurvey',
            name: 'checkSurvey',
            icon: 'right',
            component: './statistics/CheckSurvey',
          },{
            path: '/statistics/allSurvey',
            name: 'allSurvey',
            icon: 'right',
            component: './statistics/AllSurvey',
          },{
            path: '/statistics/clazzSurvey',
            name: 'clazzSurvey',
            icon: 'right',
            component: './statistics/ClazzSurvey',
          },{
            path: '/statistics/teacherSurvey',
            name: 'teacherSurvey',
            icon: 'right',
            component: './statistics/TeacherSurvey',
          }]
        },{
          path: '/personal',
          name: 'personal',
          icon: 'user',
          routes:[{
            path: '/personal/mySurvey',
            name: 'mySurvey',
            icon: 'right',
            component: './personal/MySurvey',
          },{
            path: '/personal/mySurveyStatistic',
            name: 'mySurveyStatistic',
            icon: 'right',
            component: './personal/MySurveyStatistic',
          },{
            path: '/personal/myInfo',
            name: 'myInfo',
            icon: 'right',
            component: './personal/MyInfo',
          }]
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: 'http://134.175.154.93:9999/',
      changeOrigin: false,
      pathRewrite: { '^/api': '' },
    },
  },
};
