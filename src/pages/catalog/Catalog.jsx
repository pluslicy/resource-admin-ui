import React from 'react';
import styles from './catelog.less'
import DagreD3, { d3 } from './react-dagre-d3';
// import './jsmind.css';
class Catalog extends React.Component {
	
	
	componentWillMount(){
		
		// document.body.innerHTML=
		//"<script type='text/javascript'>var mind = {'data':[{'id':'root', 'isroot':true, 'topic':'jsMind'},{'id':'easy', 'parentid':'root', 'topic':'Easy', 'direction':'left'},{'id':'easy1', 'parentid':'easy', 'topic':'Easy to show'},{'id':'easy2', 'parentid':'easy', 'topic':'Easy to edit'},{'id':'easy3', 'parentid':'easy', 'topic':'Easy to store'},{'id':'easy4', 'parentid':'easy', 'topic':'Easy to embed'},{'id':'open', 'parentid':'root', 'topic':'Open Source', 'expanded':false, 'direction':'right'},{'id':'open1', 'parentid':'open', 'topic':'on GitHub'},{'id':'open2', 'parentid':'open', 'topic':'BSD License'},{'id':'powerful', 'parentid':'root', 'topic':'Powerful', 'direction':'right'},{'id':'powerful1', 'parentid':'powerful', 'topic':'Base on Javascript'},{'id':'powerful2', 'parentid':'powerful', 'topic':'Base on HTML5'},{'id':'powerful3', 'parentid':'powerful', 'topic':'Depends on you'},]};var options = {container:'jsmind_container',editable:true,theme:'orange'};var jm = new jsMind(options);jm.show(mind);}</script>"
	}
	render(){

		const nodes = {
			0: { label: 'ReactComponent', style: 'fill: rgb(80, 194, 138);' },
			1: { label: 'props', style: 'fill: rgb(204, 230, 255);' },
			2: { label: 'context', style: 'fill: rgb(204, 230, 255);' },
			3: { label: 'refs', style: 'fill: rgb(204, 230, 255);' }
		  };
		   
		  const edges = [
			[0, 1, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
			[0, 2, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }],
			[0, 3, { style: 'stroke: rgb(214, 214, 214); fill: none', curve: d3.curveBasis }]
		  ];
		
		return (
			
		<div className={styles.content}>
			<div className={styles.left}></div>

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
export default Catalog;
