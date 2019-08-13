import React from 'react';
import styles from './catelog.less'
import { Tree, Input, Button,Modal,Form} from 'antd'
// import DagreD3, { d3 } from './react-dagre-d3';
import { connect } from 'dva'
import DirectoryTree from 'antd/lib/tree/DirectoryTree';
// import CatelogForm from './CatelogForm'
const { TreeNode } = Tree;



class Catalog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id:"",
			cenid:"",
			cata_name:""
		};
	}
		  handleOk = e => {
		let a={
			cata_level_id: this.state.cenid,
			cat_catalogue: this.state.id,
			catalogue_name: this.state.cata_name
		}
		console.log(this.props.dispatch)
		this.props.dispatch({
			// type:"catalog/fetchAddCatalog",
			type:"catalog/fetchAddCatalog",
			// type:"catalog/fetchCatalog",
			payload:a
		})
		this.setState({
		  visible: false,
		});
	  };

	//新增节点模态框
	showModalAdd = () => {
		this.setState({
		  visible: true,
		});
	  };
	

	
	  handleCancel = e => {
		console.log(e);
		this.setState({
		  visible: false,
		});
	  }; 
	
	//修改节点名称模态框
	showModalUpdate = () => {
		this.setState({
			visibleUpdate: true,
		});
	  };
	
	  handleOkUpdate = e => {
		console.log(e);
		this.setState({
			visibleUpdate: false,
		});
	  };
	
	  handleCancelUpdate = e => {
		console.log(e);
		this.setState({
			visibleUpdate: false,
		});
	  }; 
	
	// 拖动事件
	

	

	componentDidMount() {
		this.props.dispatch({
			type: 'catalog/fetchCatalog'
		})
	}

	onSelect=(selectedKeys,e)=>{
		if(e.selectedNodes[0]){
			
			console.log(e.selectedNodes[0].props.dataRef)
			let str=e.selectedNodes[0].props.dataRef.catalogue_path;
			let arr=str.split('.');
			console.log(arr.length)
			let cenid=arr.length+1;

			this.setState({
				id:e.selectedNodes[0].props.dataRef.id,
				cenid:cenid
			})
		}
		
	}
	setCataName=(e)=>{
		console.log(e.target.value)
		this.setState({
			cata_name:e.target.value
		})
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


	render() {

		// const { stage } = this.props.catalog.roles;
		// 右边树
		

		return (
			<div className={styles.content}>
				<div className={styles.left}>
					<img style={{ position: "absolute", marginLeft: "-0.8em", marginTop: "1em" }} src={require('./u578.png')} alt="" />
					<div onMouseOver={this.handleMouse} style={{ position: "absolute", width: "89px", height: "24px", backgroundColor: "rgba(15, 105, 255, 1)", marginTop: "1.2em", marginLeft: "-0.2em", fontSize: "12px", color: "#ffffff", textAlign: "center", paddingTop: "2px" }}>
						{this.props.catalog.roles[0].catalogue_name}
					</div>
					<div style={{ marginTop: "2.5em", marginLeft: "1.5em" }}>
						<Tree>
							{this.renderTreeNodes(this.props.catalog.roles[0].childs)}
						</Tree>
					</div>
				</div>

				<div className={styles.right}>
					<div className={styles.middle}>操作面板 ｜ 视频库编目</div>
					<div>
						{/* <Input style={{ width: "200px", marginLeft: "2em", marginTop: "2em" }} value={this.state.id} /> */}
						{console.log(this.props.catalog.roles)}
						<Button type="primary" size="small" onClick={this.showModalAdd} style={{ marginLeft: "2em", marginTop: "2em" }}>新增</Button>&nbsp;
						<Button type="danger" size="small" onClick={this.removeNodes}>删除</Button>&nbsp;
						<Button type="delete" size="small" onClick={this.showModalUpdate}>修改</Button>
						<Modal
							title="增加编目"
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
						>
								<Input   style={{ width: "200px", marginLeft: "2em",display:"none"}} value={this.state.id} />
								<Input   style={{ width: "200px", marginLeft: "2em",display:"none"}} value={this.state.cenid} />
								编目名称<Input  value={this.state.cata_name}  style={{ width: "200px", marginLeft: "2em", }} onChange={this.setCataName} />	
						</Modal>
						
						<div>
						<Tree onSelect={this.onSelect} style={{marginLeft:"3em"}}>
							{this.renderTreeNodes(this.props.catalog.roles)}
						</Tree>
						</div>
						
					</div>

				</div>

			</div>
		)
	}
}
export default connect(({ catalog }) => ({
	catalog,
}))(Catalog);
