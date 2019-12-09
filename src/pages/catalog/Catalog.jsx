import React from 'react';
import styles from './catelog.less';
import { Tree, Input, Button, Modal, Form, Radio, Select, Cascader,Icon } from 'antd';
// import DagreD3, { d3 } from './react-dagre-d3';
import { connect } from 'dva';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';

const { TreeNode } = Tree;

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      cenid: '',
      cata_name: '',
      value: '',
      moveCenId: '',
      target_id: '',
      edit:{}
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'catalog/fetchCatalog',
    });
  }

  // 迁移目录级联选项
  onChange2 = value => {
    this.setState({
      moveCenId: parseInt(value.length + 1),
      target_id: value,
    });
  };

  //新增节点模态框
  showModalAdd = () => {
    if (this.state.id != '') {
      this.setState({
        cata_name: '',
        visible: true,
      });
    }
  };

  handleOk = e => {
    let a = {
      cata_level_id: this.state.cenid,
      cat_catalogue: this.state.id,
      catalogue_name: this.state.cata_name,
    };
    // console.log(this.props.dispatch)
    this.props.dispatch({
      type: 'catalog/fetchAddCatalog',
      payload: a,
    });
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  setCataName = e => {
    // console.log(e.target.value)
    this.setState({
      cata_name: e.target.value,
    });
  };

  //修改节点名称模态框
  showModalEditName = () => {
    if (this.state.id != '') {
      this.setState({
        value: this.state.cata_name,
        visibleEdit: true,
      });
    }
  };
  inputEdit=(e)=>{
    console.log(e.target.value)
  }
  handleOkEditName = e => {
    let edit = {
      id: this.state.edit.id,
      catalogue_name: this.state.edit.catalogue_name,
    };
    // console.log(this.props.dispatch);
    this.props.dispatch({
      type: 'catalog/UpdateCatalogs',
      payload: edit,
    });
    this.setState({
      visibleEdit: false,
    });
    this.setState({
      edit:{}
    });
  };

  handleCancelEditName = e => {
    console.log(e);
    this.setState({
      visibleEdit: false,
    });
  };

  setEditName = e => {
    var obj=this.state.edit;
    obj.catalogue_name=e.target.value;
    // console.log(e.target.value)
    this.setState({
      edit: obj
    });
  };
  // 删除目录模态框
  showModalRemove = () => {
    if (this.state.id != '') {
      this.setState({
        visibleRemove: true,
      });
    }
  };
  handleOkRemove = e => {
    console.log(e);
    this.setState({
      value: '',
    });
    if (this.state.value === 1) {
      this.setState({
        visibleQY: true,
      });
    } else if (this.state.value === '') {
      this.setState({
        visibleRemove: 'false',
      });
    } else {
      this.setState({
        visibleRemove: false,
      });
      this.props.dispatch({
        type: 'catalog/fetchDeleteRoles',
        payload: parseInt(this.state.id),
      });
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
    let length = this.state.target_id.length;
    console.log(this.state.id, this.state.target_id[length - 1]);
    let move = {
      id: this.state.id,
      target_id: this.state.target_id[length - 1],
    };
    this.setState({
      visibleQY: false,
    });
    this.props.dispatch({
      type: 'catalog/fetchEditCatalogCen',
      payload: move,
    });
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

  showCatalog(){

  }
 

  onSelect = (selectedKeys, e) => {
    // console.log(e,selectedKeys)
    if (e.selectedNodes[0] != null) {
      console.log(e.selectedNodes[0].props.dataRef)
      let str = e.selectedNodes[0].props.dataRef.catalogue_path;
      let arr = str.split('.');
      // console.log(arr.length)
      let cenid = arr.length + 1;
      this.setState({
        id: e.selectedNodes[0].props.dataRef.id,
        cenid: cenid,
        edit:e.selectedNodes[0].props.dataRef
      });
    }
  };

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
        {/* 左边面板
        <div className={styles.left}>
          <img
            style={{ position: 'absolute', marginLeft: '-0.8em', marginTop: '1em' }}
            src={require('./u578.png')}
            alt=""
          />
          <div
            onMouseOver={this.handleMouse}
            style={{
              position: 'absolute',
              width: '89px',
              height: '24px',
              backgroundColor: 'rgba(15, 105, 255, 1)',
              marginTop: '1.2em',
              marginLeft: '-0.2em',
              fontSize: '12px',
              color: '#ffffff',
              textAlign: 'center',
              paddingTop: '2px',
            }}
          >
            {this.props.catalog.roles[0].catalogue_name}
          </div>
          <div style={{ marginTop: '2.5em', marginLeft: '1.5em' }}>
            <Tree>{this.renderTreeNodes(this.props.catalog.roles[0].childs)}</Tree>
          </div>
        </div> */}

        <div className={styles.right}>
          <div className={styles.middle}>操作面板 ｜ 视频库编目</div>
          <div>
            {/* {console.log(this.props.catalog.roles)} */}
            {/* button */}
            <div className="button">
              <Button
                type="primary"
                size="small"
                onClick={this.showModalAdd}
                style={{ marginLeft: '2em', marginTop: '2em' }}
              >
                新增
              </Button>
              &nbsp;
              <Button type="danger" size="small" onClick={this.showModalRemove}>
                删除
              </Button>
              &nbsp;
              <Button type="delete" size="small" onClick={this.showModalEditName}>
                修改
              </Button>
            </div>

            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1em', marginLeft:'1em' }}>
              {/* 一级编目div */}
              <div
                style={{
                  border: '1px solid #e8e8e8',
                  width: '200px',
                  height: '450px',
                  overflow: 'auto',
                  marginLeft:'1em',
                  borderRadius:'7px'
                }}
              >
                <div style={{border:'1px solid #3e82a6',backgroundColor:"#3e82a6",color:"#FFFFFF",borderRadius:'7px'}}>
                  <span>一级编目</span>
                  <Button type="link" size='small' style={{color:'#FFFFFF',marginLeft:'8em'}} onClick={this.showCatalog.bind()}>+</Button>
                </div>
                {/* <ul>
                 
                </ul> */}
                 <Tree>{this.renderTreeNodes(this.props.catalog.roles[0].childs)}</Tree>
              </div>
              
       

              {/* 二级编目div */}
              <div
                style={{
                  border: '1px solid #e8e8e8',
                  width: '200px',
                  height: '450px',
                  overflow: 'auto',
                  marginLeft:'1em',
                  borderRadius:'7px'
                }}
              >
                <div style={{border:'1px solid #ffa846',backgroundColor:"#ffa846",color:"#FFFFFF",borderRadius:'7px'}}>
                  <span>二级编目</span>
                  <Button type="link" size='small' style={{color:'#FFFFFF',marginLeft:'8em'}} onClick={this.showCatalog.bind()}>+</Button>
                </div>
                {/* <ul>
                 
                </ul> */}
                 <Tree>{this.renderTreeNodes(this.props.catalog.roles[0].childs)}</Tree>
              </div>
            </div>
            {/* 增加编目模态框 */}
            <Modal
              title="增加编目名称"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Input
                style={{ width: '200px', marginLeft: '2em', display: 'none' }}
                value={this.state.id}
              />
              <Input
                style={{ width: '200px', marginLeft: '2em', display: 'none' }}
                value={this.state.cenid}
              />
              编目名称
              <Input
                value={this.state.cata_name}
                style={{ width: '200px', marginLeft: '2em' }}
                onChange={this.setCataName}
              />
            </Modal>
            {/* 修改编目模态框 */}
            <Modal
              title="修改编目名称"
              visible={this.state.visibleEdit}
              onOk={this.handleOkEditName}
              onCancel={this.handleCancelEditName}
            >
              <Input
                style={{ width: '200px', marginLeft: '2em', display: 'none' }}
                onChange={this.state.inputEdit}
                

              />
              编目名称
              <Input
                value={this.state.edit.catalogue_name}
                style={{ width: '200px', marginLeft: '2em' }}
                onChange={this.setEditName}
              />
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
                <Button key="ok" style={{ marginRight: 230 }} onClick={this.handleOkRemove}>
                  ok
                </Button>,
              ]}
            >
              {/* 添加单选按钮 */}
              <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio style={{ margin: 50, marginLeft: 110 }} value={1}>
                  搬移资源
                </Radio>
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
                  placeholder="请选择资源更改的编目"
                  allowClear={true}
                  style={{ width: 400 }}
                  options={this.props.catalog.roles[0].childs}
                  fieldNames={{ label: 'catalogue_name', value: 'id', children: 'childs' }}
                  expandTrigger="hover"
                  onChange={this.onChange2}
                  changeOnSelect
                />
              </div>
            </Modal>
            <div>
              <Tree
                autoExpandParent
                defaultExpandAll
                onSelect={this.onSelect}
                style={{ marginLeft: '3em' }}
              >
                {this.renderTreeNodes(this.props.catalog.roles)}
              </Tree>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ catalog }) => ({
  catalog,
}))(Catalog);
