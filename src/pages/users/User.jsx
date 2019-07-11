import React from 'react';
import {Button,Input,Table} from 'antd';
import style from './User.less'
class User extends React.Component {
 
  render(){
    return (
      <div className={style.Back}>
        <div>
          <Button>添加</Button>
          <Input style={{width:'20%'}} />
        </div>
        <Table />
      </div>
    )
  }
}


export default User;