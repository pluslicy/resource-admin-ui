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
          routes:[
          {
            path: '/resource/db',
            name: 'db',
            icon: 'right',
            component: './resource/Db',
          },{
            path: '/resource/check/video',
            name: 'check',
            icon: 'right',
            component: './resource/Check/Video',
          },{
            path: '/resource/comment/comment',
            name: 'comment',
            icon: 'right',
            component: './resource/comment/comment',
          }]
        },
        // 模块管理
        {
          path: '/module',
          name: 'module',
          icon: 'file',
          routes:[{
            path: '/module/bangDan',
            name: 'bangDan',
            icon: 'right',
            routes:[{
              path: '/module/bangDan/video',
              name: 'video',
              icon: 'right',
              component: './module/bangDan/Video',
            },
            {
              path: '/module/bangDan/word',
              name: 'word',
              icon: 'right',
              component: './module/bangDan/Word',
            }]
          },{
            path: '/module/recommend',
            name: 'recommend',
            icon: 'right',
             routes:[{
              path: '/module/recommend/javaee',
              name: 'javaee',
              icon: 'right',
              component: './module/recommend/javaee',
            },
            {
              path: '/module/recommend/py',
              name: 'py',
              icon: 'right',
              component: './module/recommend/Py',
            },
             {
              path: '/module/recommend/ht',
              name: 'ht',
              icon: 'right',
              component: './module/recommend/Ht',
            }]
          },{
            path: '/module/setting',
            name: 'setting',
            icon: 'right',
            component: './module/Setting',
          },{
            path: '/module/admin',
            name: 'admin',
            icon: 'right',
            component: './module/Admin',
          },{
            path: '/module/news',
            name: 'news',
            icon: 'right',
            component: './module/News',
          },{
            path: '/module/authentication',
            name: 'authentication',
            icon: 'right',
            component: './module/Authentication',
          },
          {
            path: '/module/lunbo',
            name: 'lunbo',
            icon: 'right',
            component: './module/Lunbo',
          }]
        },
        // 角色管理
        {
          path: '/roles',
          name: 'roles',
          icon: 'star',
          routes:[{
            path: '/roles/privilege',
            name: 'privilege',
            icon: 'right',
            component: './roles/Privilege',
          },{
            path: '/roles/role',
            name: 'role',
            icon: 'right',
            component: './roles/Role',
          }]
        },
        // 用户管理
        {
          path: '/users',
          name: 'users',
          icon: 'stock',
          routes:[{
            path: '/users/user',
            name: 'user',
            icon: 'right',
            component: './users/User',
          }]
        },
        // 学校管理
        {
          path: '/schools',
          name: 'schools',
          icon: 'user',
          routes:[{
            path: '/schools/School',
            name: 'school',
            icon: 'right',
            component: './schools/School',
          }]
        },
        // 编目管理
        {
         path: '/catalog',
          name: 'catalog',
          icon: 'menu',
          routes:[{
            path: '/catalog/Catalog',
            name: 'catalog',
            icon: 'right',
            component: './catalog/Catalog',
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
      target: 'http://10.0.6.5:16012/',
      changeOrigin: false,
      pathRewrite: { '^/api': '' },
    },
  },
};
