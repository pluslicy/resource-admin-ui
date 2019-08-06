export default {
    namespace: 'test',
    state: {
    zTreeSetting:{
        nodes:[{ id:1, pId:0, name:"随意拖拽 1-展开", open:true},//simpleData { enable: true}
          { id:11, pId:1, name:"随意拖拽 1-1"},
          { id:12, pId:1, name:"随意拖拽 1-2"},
          { id:121, pId:12, name:"随意拖拽 1-2-1"},
          { id:122, pId:12, name:"随意拖拽 1-2-2"},
          { id:123, pId:12, name:"随意拖拽 1-2-3"},
          { id:13, pId:1, name:"禁止拖拽 1-3-展开", open:true, drag:false},
          { id:131, pId:13, name:"禁止拖拽 1-3-1", drag:false},
          { id:132, pId:13, name:"禁止拖拽 1-3-2", drag:false},
          { id:132, pId:13, name:"禁止拖拽 1-3-3", drag:false},
          { id:2, pId:0, name:"禁止子节点移走 2-展开", open:true, childOuter:false},
          { id:21, pId:2, name:"我不想成为父节点 2-1", dropInner:false},
          { id:22, pId:2, name:"我不要成为根节点 2-2", dropRoot:false},
          { id:23, pId:2, name:"拖拽试试看 2-3"},
          { id:3, pId:0, name:"禁止子节点排序/增加 3-展开", open:true, childOrder:false, dropInner:false},
          { id:31, pId:3, name:"随意拖拽 3-1"},
          { id:32, pId:3, name:"随意拖拽 3-2"},
          { id:33, pId:3, name:"随意拖拽 3-3"}],
        edit : {
          enable: true,
          editNameSelectAll: true,
          showRemoveBtn: true,
          showRenameBtn: true,//showRenameBtn,
          drag: {//拖拽位置设置
              autoExpandTrigger: true,
              // prev: true,//默认true
              // inner: true,//dropInner,//默认true
              // next: true//默认true
          },
        },
        view :{
          addHoverDom: true,
          selectedMulti: false
        },
        data: {
          simpleData: {
            enable: true
          }
        },
       // async:{ //懒加载时，ztree.js 的componentDidMount()和componentDidUpdate()
                    //会使树加载两遍，生成两个一样的树，
                    //去掉其中一个则拖拽出现问题。。。还没解决
        //   enable: true,
        //   url:window.api_host+'/common/getTreeData',
        // }
      },
  
    },
    reducers: {
    },
    effects: {
    },
  }
  ;
  