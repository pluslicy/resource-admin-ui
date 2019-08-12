import React from 'react';
import styles from './catelog.less'
import {Tree,Input,Button} from 'antd'
// import DagreD3, { d3 } from './react-dagre-d3';
import {connect} from 'dva'

const { TreeNode } = Tree;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);


class Catalog extends React.Component {
	state = {
		gData,
		expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
	  };
	
	  onDragEnter = info => {
		console.log(info);
		// expandedKeys 需要受控时设置
		// this.setState({
		//   expandedKeys: info.expandedKeys,
		// });
	  };
	
	  onDrop = info => {
		console.log(info);
		const dropKey = info.node.props.eventKey;
		const dragKey = info.dragNode.props.eventKey;
		const dropPos = info.node.props.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
	
		const loop = (data, key, callback) => {
		  data.forEach((item, index, arr) => {
			if (item.key === key) {
			  return callback(item, index, arr);
			}
			if (item.children) {
			  return loop(item.children, key, callback);
			}
		  });
		};
		const data = [...this.state.gData];
	
		// Find dragObject
		let dragObj;
		loop(data, dragKey, (item, index, arr) => {
		  arr.splice(index, 1);
		  dragObj = item;
		});
	
		if (!info.dropToGap) {
		  // Drop on the content
		  loop(data, dropKey, item => {
			item.children = item.children || [];
			// where to insert 示例添加到尾部，可以是随意位置
			item.children.push(dragObj);
		  });
		} else if (
		  (info.node.props.children || []).length > 0 && // Has children
		  info.node.props.expanded && // Is expanded
		  dropPosition === 1 // On the bottom gap
		) {
		  loop(data, dropKey, item => {
			item.children = item.children || [];
			// where to insert 示例添加到尾部，可以是随意位置
			item.children.unshift(dragObj);
		  });
		} else {
		  let ar;
		  let i;
		  loop(data, dropKey, (item, index, arr) => {
			ar = arr;
			i = index;
		  });
		  if (dropPosition === -1) {
			ar.splice(i, 0, dragObj);
		  } else {
			ar.splice(i + 1, 0, dragObj);
		  }
		}
	
		this.setState({
		  gData: data,
		});
	  };

	componentDidMount(){
		this.props.dispatch({
			type:'catalog/fetchCatalog'

		})
	}
	
	componentWillMount(){
		
	}
	// 遍历左边树
	renderTreeNodes = data =>
    data.map(item => {
      if (item.childs) {
        return (
          <TreeNode title={item.catalogue_name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.childs)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
	});
	
	// 遍历右边树
	// renderRightTreeNodes = data =>
    // data.map(item => {
    //   if (item.childs) {
	// 	return <ul><li>{item.catalogue_name}{this.renderRightTreeNodes(item.childs)}</li></ul>
    //   }
	// });

	// renderRightTree = (data,idx) =>{
    //     console.log('树形数据源', data);
    //     return data.map(item => {
    //         if (!item.childs) {
    //             return (
    //                 <TreeNode title={item.catalogue_name} key={item.id} />
    //             )
    //         } else {
    //             return (
    //                 <TreeNode title={item.catalogue_name} key={item.id}>
    //                     {this.renderTree(item.childs)}
    //                 </TreeNode>
    //             )
    //         }
    //     })

    // };

	render(){

		const { stage } = this.props.catalog.roles;	
		// 右边树
		const loop = data =>
		data.map(item => {
		  if (item.children && item.children.length) {
			return (
			  <TreeNode key={item.key} title={item.title}>
				{loop(item.children)}
			  </TreeNode>
			);
		  }
		  return <TreeNode key={item.key} title={item.title} />;
		});

		return (
		<div className={styles.content}>
			<div className={styles.left}>	
			<img style={{position:"absolute",marginLeft:"-0.8em",marginTop:"1em"}} src={require('./u578.png')} alt=""/>
			<div onMouseOver={this.handleMouse} style={{position:"absolute",width:"89px",height:"24px",backgroundColor:"rgba(15, 105, 255, 1)",marginTop:"1.2em",marginLeft:"-0.2em",fontSize:"12px",color:"#ffffff",textAlign:"center",paddingTop:"2px"}}>
				{this.props.catalog.roles[0].catalogue_name}
			</div>
			<div style={{marginTop:"2.5em",marginLeft:"1.5em"}}>
				<Tree>
					{this.renderTreeNodes(this.props.catalog.roles[0].childs)}
				</Tree>
				</div>
			</div>

			<div className={styles.right}>
				<div  className={styles.middle}>操作面板 ｜ 视频库编目</div>
				<div>
				<Input style={{width:"200px",marginLeft:"2em",marginTop:"2em"}} />
				
				<Button type="primary" size="small" style={{marginLeft:"2em",marginTop:"2em"}}>新增</Button>&nbsp;
				<Button type="danger" size="small">删除</Button>&nbsp;
				<Button type="delete" size="small">修改</Button>
					<div>
						 <Tree
							className="draggable-tree"
							defaultExpandedKeys={this.state.expandedKeys}
							draggable
							blockNode
							onRightClick={this.onRightClick}
							onDragEnter={this.onDragEnter}
							onDrop={this.onDrop}
							style={{marginLeft:"2em"}}
						>
							{loop(this.state.gData)}
     					 </Tree>
					</div>
				
				

					{/* {this.props.catalog.roles[0].catalogue_name} */}
{/* 
					<ul>
					{this.renderRightTreeNodes(this.props.catalog.roles[0].childs)}
					</ul> */}
			
				</div>
			
			</div>
	
		</div>
			)
	}
}
export default connect(({ catalog }) => ({
	catalog,
  }))(Catalog);
