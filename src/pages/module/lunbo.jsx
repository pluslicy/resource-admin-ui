import React from 'react';
import styles from './module.less';
import { connect } from 'dva';

import { Table, Menu, Icon, Modal, Upload, Button, message } from 'antd';
import Item from 'antd/lib/list/Item';

//图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Lunbo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      // previewVisible: false,
      // previewImage: '',
      // fileList: [
      //   {
      //     uid: '-1',
      //     name: 'xxx.png',
      //     status: 'done',
      //     url: 'http://10.0.6.5:16012/media/cr/2019/11/2d9784152c69256e6b9620b699a2fdba2d3c1bc8.jpg',
      //   },
      // ],
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'lunbo/findAll',
      // payload:{
      // 	page:1,
      // 	pageSize:10,
      // }
    });
  }

  // 更换模态框
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };
  // handleOk = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false,
  //   });
  // };
  // handleCancel = e => {
  //   this.setState({
  //     visible: false,
  //   });
  // };

  //图片
  // handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  // handleChange = ({ fileList }) => this.setState({ fileList });

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // this.props.dispatch({type:"lunbo/updateLunbo",payload:{

      // }})
      console.log(info.file, 'ooo');
      this.props.dispatch({
        type: 'lunbo/findAll',
        // payload:{
        // 	page:1,
        // 	pageSize:10,
        // }
      });
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          // imageUrl,
          loading: false,
        }),
      );
    }
  };
  beforeUpload = (record, file, fileList) => {
    console.log(record, 'aaaa');
    this.setState({
      file,
      fileList,
      id: record.catalogue,
    });
  };
  render() {
    //图片
    // const { previewVisible, previewImage, fileList } = this.state;
    // const uploadButton = (
    //   <div>
    //     <Icon type="plus" />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { imageUrl } = this.state;

    // 表格
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const columns = [
      {
        title: '#',
        align: 'center',
        width: '50px',
        render: (text, record, index) => `${index + 1}`,
      },
      { title: '编目', align: 'center', dataIndex: 'catalogue_name' },
      {
        title: '主图',
        align: 'center',
        width: 100,
        render: (text, record) => {
          return (
            <div className="clearfix">
              {/* <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal> */}

              <Upload
                name="avatar"
                listType="picture-card"
                // fileList={fileList}
                className="avatar-uploader"
                showUploadList={false}
                data={{
                  id: this.state.id,
                  carousel_image: this.state.file,
                  carousel_url: 'string',
                }}
                action="http://10.0.6.5:16012/mp_man_module/update_carouselrank/"
                beforeUpload={this.beforeUpload.bind(this, record)}
                onChange={this.handleChange}
              >
                {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> :  <img src={record.carousel_image} alt="avatar" style={{ width: '100%' }} />} */}
                {<img src={record.carousel_image} alt="avatar" style={{ width: '100%' }} />}
              </Upload>
            </div>
          );
        },
      },
    ];
    // const data = [{}];
    return (
      <div className={styles.content}>
        <div className="btns">
          {/* 表格 */}
          <Table
            bordered
            rowKey="id"
            size="small"
            // rowSelection={{rowSelection,columnTitle:'#',fixed:'left'}}
            columns={columns}
            dataSource={this.props.lunbo.lunbos}
          />
        </div>

        {/* <div>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width="300px"
            height="200px"
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOk}>
                完成
              </Button>,
            ]}
          >
            <div className="clearfix">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          </Modal>
        </div> */}
      </div>
    );
  }
}

export default connect(({ lunbo }) => ({
  lunbo,
}))(Lunbo);
