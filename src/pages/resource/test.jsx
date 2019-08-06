import {PureComponent} from "react";
import {connect} from "dva/index";
import ReactZtree from './react-ztree';//封装的tree.js路径
import 'ztree/css/zTreeStyle/zTreeStyle.css';

   
    @connect(state => ({
      test: state.test,
    }))
    export default class Test extends PureComponent {
    //节点重命名回调
    onChangeName = (id,newName) =>{
          console.log("id="+id);
          console.log("newName="+newName);
      };
      //删除节点回调
      onDeleteNode = (id) =>{
        console.log("id="+id);
      };
      //拖拽结束回调
      onDrop = (id,targetNodeId,moveType)=>{
        console.log("id="+id);
        console.log("targetNodeId="+targetNodeId);
        console.log("moveType="+moveType);
      }
      //添加节点回调，name为自动生成的，
      //后台添加到数据库后返回主键id,更新树节点的id
      addNode =(name)=>{
        console.log(name);
        //const id = service.addNode(name); 与后台交互自己写吧。。
        return 100;//return id
      }
      render() {
        const {test:{zTreeSetting:{nodes,edit,view,data}}} = this.props;
        return (
          <div>
            <div style={{display:'inline-block',width:'25%',verticalAlign:'top'}}>
            <ReactZtree nodes={nodes} /*check={check}复选框*/ ref="ztree" treeName={'treeDemo'}
                        edit={edit}  view={view} data={data} onChangeName={this.onChangeName}  onDeleteNode={this.onDeleteNode}
                        onDrop={this.onDrop} addNode={this.addNode} /* async={async} 异步加载 */
            />
          </div>
           </div>
        )
    }
 }
