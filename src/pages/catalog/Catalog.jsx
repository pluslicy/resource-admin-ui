import React from 'react';
import styles from './catelog.less'
import {Tree} from 'antd'
import DagreD3, { d3 } from './react-dagre-d3';
import {connect} from 'dva'

const { TreeNode } = Tree;

  

class Catalog extends React.Component {
	
	componentDidMount(){
		this.props.dispatch({
			type:'catalog/fetchCatalog'

		})
	}
	
	componentWillMount(){
		
	}
	
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
	
	
	render(){
		// 点
		const nodes = {
			0: { label: 'ReactComponent', style: 'fill: rgb(80, 194, 138);' },
			1: { label: 'props', style: 'fill: rgb(204, 230, 255);' },
			2: { label: 'context', style: 'fill: rgb(204, 230, 255);' },
			3: { label: 'refs', style: 'fill: rgb(204, 230, 255);' }
		  };
		//  边
		  const edges = [
			[0, 1, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
			[0, 2, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
			[0, 3, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }]
		  ];


		return (
			
		<div className={styles.content}>
			<div className={styles.left}>	
			
			<Tree>
				{this.renderTreeNodes(this.props.catalog.roles[0].childs)}
      		</Tree>
				
			</div>

			<div id="jsmind_container" className={styles.right}>
				<div  className={styles.middle}>操作面板 ｜ 视频库编目</div>
				<DagreD3
					fit
					interactive
					graph={{ rankdir: 'UD' }}
					nodes={nodes}
					edges={edges}
					onNodeClick={this.onNodeClick}
				/>
			</div>
	
		</div>
			)
	}
}
export default connect(({ catalog }) => ({
	catalog,
  }))(Catalog);
