import React from 'react';
import styles from './catelog.less'
import { Tree, Input, Button,Modal,Form,Radio,Select,Cascader} from 'antd'
// import DagreD3, { d3 } from './react-dagre-d3';
import { connect } from 'dva'
import DirectoryTree from 'antd/lib/tree/DirectoryTree';

const { TreeNode } = Tree;


class Catalog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			id:"",
			cenid:"",
			cata_name:"",
			// new_name:"",
			value:"",
			moveCenId:"",
			target_id:"",
			edit:{}
		};
	}
		
	inputEdit=(e)=>{
		console.log(e.target.value)
	}
	// 迁移目录级联选项
	 onChange2=(value)=> {
		this.setState({
			moveCenId:parseInt(value.length+1),
			target_id:value
		})
	  }
	


	//新增节点模态框
	showModalAdd = () => {
		if(this.state.id!=""){
			this.setState({
				visible: true,
			  });
		}
	  };
	
	handleOk = e => {
		let a={
			cata_level_id: this.state.cenid,
			cat_catalogue: this.state.id,
			catalogue_name: this.state.cata_name
		}
		// console.log(this.props.dispatch)
		this.props.dispatch({
			type:"catalog/fetchAddCatalog",
			payload:a
		})
		this.setState({
		  visible: false,
		  cata_name:"",
		});
	};
	
	handleCancel = e => {
		console.log(e);
		this.setState({
		  visible: false,
		});
	}; 

	setCataName=(e)=>{
		// console.log(e.target.value)
		this.setState({
			cata_name:e.target.value
		})
	}

	//修改节点名称模态框
	showModalEditName = () => {
		if(this.state.id!=""){
		this.setState({
			visibleEdit: true,
		});}
	  };
	
	handleOkEditName = e => {
		let edit = {
		// id: this.state.id,
		// catalogue_name: this.state.new_name,
		id: this.state.edit.id,
     	catalogue_name: this.state.edit.catalogue_name,
		}
	// console.log(this.props.dispatch);
	this.props.dispatch({
		type:"catalog/UpdateCatalogs",
		payload:edit,
	})
	this.setState({
		visibleEdit: false,
		
	});
	this.setState({
		// new_name:""
		edit:{}
	})
	};
	
	handleCancelEditName = e => {
		console.log(e);
		this.setState({
			visibleEdit: false,
		});
	}; 
	
	setEditName=(e)=>{
		var obj=this.state.edit;
    	obj.catalogue_name=e.target.value;	
		// console.log(e.target.value)
		this.setState({
			// new_name:e.target.value
			edit: obj
			
		})
	}
	// 删除目录模态框
	 showModalRemove = () => {
		if(this.state.id!=""){
		this.setState({
		  visibleRemove: true,
		});}
	  };
	  handleOkRemove = e => {
		console.log(e);
		this.setState({
		  value:""
		})
		if(this.state.value===1){
		  this.setState({
			 visibleQY:true
		  })
		}else if(this.state.value===""){
			this.setState({
			  visibleRemove:"false"
			})
		}else{

			
		this.setState({
			visibleRemove:false,
		  })
		this.props.dispatch({
			type:"catalog/fetchDeleteRoles",
			payload:parseInt(this.state.id)
		})

		}
		this.setState({
		  visibleRemove: false,
		});
	  };
	 
	  handleCancelRemove = e => {
		console.log(e);
		this.setState({
		  visibleRemove: false,
		});
	  };

	 // 迁移目录ok
	 // 迁移模态框
	 handleOkQY = e => {
		 let length=this.state.target_id.length;
		console.log(this.state.id,this.state.target_id[length-1]);
		let move={
			id: this.state.id,
			target_id: this.state.target_id[length-1]
		}
		this.setState({
		 	 visibleQY: false,
		});
		this.props.dispatch({
			type:"catalog/fetchEditCatalogCen",
			payload:move
		})
	  };
	  // 迁移目录关闭
	  handleCancelQY = e => {
		console.log(e);
		this.setState({
		  visibleQY: false,
		});
	  };


	 // 删除单选按钮
	 onChange = e => {
		console.log('radio checked', e.target.value);
		// console.log(e.target.value);
		this.setState({
		  value: e.target.value,
		});
	  };
	

	

	componentDidMount() {
		this.props.dispatch({
			type: 'catalog/fetchCatalog'
		})
	}

	onSelect=(selectedKeys,e)=>{
		if(e.selectedNodes[0]!=null){
			
			// console.log(e.selectedNodes[0].props.dataRef)
			let str=e.selectedNodes[0].props.dataRef.catalogue_path;
			let arr=str.split('.');
			// console.log(arr.length)
			let cenid=arr.length+1;
			this.setState({
				id:e.selectedNodes[0].props.dataRef.id,
				cenid:cenid,
				edit:e.selectedNodes[0].props.dataRef
			})
		}
		
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
		// 级联
		// const { cities } = this.state;
		return (
			<div className={styles.content}>
				{/* 左边面板 */}
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
						{/* {console.log(this.props.catalog.roles)} */}
						<Button type="primary" size="small" onClick={this.showModalAdd} style={{ marginLeft: "2em", marginTop: "2em" }}>新增</Button>&nbsp;
						<Button type="danger" size="small" onClick={this.showModalRemove}>删除</Button>&nbsp;
						<Button type="delete" size="small" onClick={this.showModalEditName}>修改</Button>
						{/* 增加编目模态框 */}
						<Modal
							title="增加编目名称"
							visible={this.state.visible}
							onOk={this.handleOk}
							onCancel={this.handleCancel}
						>
							<Input   style={{ width: "200px", marginLeft: "2em",display:"none"}} value={this.state.id} />
							<Input   style={{ width: "200px", marginLeft: "2em",display:"none"}} value={this.state.cenid} />
							编目名称<Input value={this.state.cata_name}  style={{ width: "200px", marginLeft: "2em", }} onChange={this.setCataName} />	
						</Modal>

						{/* 修改编目模态框 */}
						<Modal
							title="修改编目名称"
							visible={this.state.visibleEdit}
							onOk={this.handleOkEditName}
							onCancel={this.handleCancelEditName}
						>
								<Input style={{ width: "200px", marginLeft: "2em",display:"none"}} onChange={this.state.inputEdit}/>
								编目名称<Input value={this.state.edit.catalogue_name}  style={{ width: "200px", marginLeft: "2em", }} onChange={this.setEditName} />	
						</Modal>

						{/* 删除模态框 */}
						<Modal
							title="是否保留资源"
							visible={this.state.visibleRemove}
							onOk={this.handleOkRemove}
							onCancel={this.handleCancelRemove}
							// onCancel={this.handleCancel}
							footer={[
							// 定义右下角按钮的地方
							<Button key="ok" style={{marginRight:230}} onClick={this.handleOkRemove}>ok</Button>,
						    ]}>
							{/* 添加单选按钮 */}
							<Radio.Group onChange={this.onChange} value={this.state.value}>
								<Radio style={{margin:50,marginLeft:110}} value={1}>搬移资源</Radio>
								<Radio value={2}>直接删除</Radio>        
							</Radio.Group>      

						</Modal>
						{/* 迁移目录模态框 */}
						<Modal 
								title="请选择资源所在编目"
								visible={this.state.visibleQY}
								onOk={this.handleOkQY}
								onCancel={this.handleCancelQY}
								width="600px"
								height="400px"
								>
							 <div>
							 <Cascader
								options={this.props.catalog.roles[0].childs}
								fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}
								expandTrigger="hover"
								onChange={this.onChange2}
								changeOnSelect
							/>
							
							</div>
						</Modal>

						<div>
						<Tree autoExpandParent 
							//   defaultExpandAll
							  onSelect={this.onSelect} 
							  style={{marginLeft:"3em"}}
							
							>
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
