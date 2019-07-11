import React from 'react';
import { Button, Radio, Table, Input, Menu, Dropdown, Icon, Switch } from 'antd';

class Setting extends React.Component {
	state = {
		value: 1,
	};

	onChange = e => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	};
	render() {
		// 下拉菜单
		const menu = (
			<Menu>
				<Menu.Item key="0">
					<a href="http://www.alipay.com/">1st menu item</a>
				</Menu.Item>
				<Menu.Item key="1">
					<a href="http://www.taobao.com/">2nd menu item</a>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="3">3rd menu item</Menu.Item>
			</Menu>
		);

		return (
			<div>
				<div style={{ padding: '1em', backgroundColor: '#ffffff', borderRadius: '5px' }}>
					<p>系统一键开关</p>
					<div style={{ display: 'inline-block', marginLeft: '2em' }}>
						<Switch defaultChecked />
						<p>评论开关</p>
					</div>
					<div style={{ display: 'inline-block', marginLeft: '2em' }}>
						<Switch defaultChecked />
						<p>上传开关</p>
					</div>
					<div style={{ display: 'inline-block', marginLeft: '2em' }}>
						<Switch defaultChecked />
						<p>申请认证开关</p>
					</div>
				</div>
				<div
					style={{
						width: '55%',
						height: '200px',
						display: 'inline-block',
						padding: '1em',
						marginTop: '20px',
						backgroundColor: '#ffffff',
						borderRadius: '5px',
					}}
				>
					<div>
						<span>编目设置</span>
						<br />
						<a>
							<span style={{ fontSize: '20px' }}>视频库</span>
						</a>
						<a>
							<span style={{ fontSize: '20px', marginLeft: '1em' }}>文档库</span>
						</a>
						<hr />
						一级编目:
            <span style={{ fontSize: '16px', marginLeft: '1em', color: 'blue' }}>技术方向</span>
						&nbsp;修改
            <br />
						二级编目:
            <Input
							style={{ width: '20%', marginLeft: '1em' }}
							size="small"
							placeholder="给你的编目起名"
						/>
					</div>
				</div>
				<div
					style={{
						width: '43%',
						height: '200px',
						display: 'inline-block',
						padding: '1em',
						marginTop: '20px',
						marginLeft: '1em',
						backgroundColor: '#ffffff',
						borderRadius: '5px',
					}}
				>
					<div>
						<span>编目应用设置</span>
						<br />
						<a>
							<span style={{ fontSize: '20px' }}></span>
						</a>
						<a>
							<span style={{ fontSize: '20px', marginLeft: '1em' }}></span>
						</a>
						<hr />
						首页检索编目级别
            <Input
							style={{ width: '20%', marginLeft: '1em' }}
							size="small"
							placeholder="1~2"
							disabled
						/>
						&nbsp;级编目&nbsp;<a>设置</a>
						<br />
						用户上传编目级别
            <Input
							style={{ width: '20%', marginLeft: '1em' }}
							size="small"
							placeholder="1~2"
							disabled
						/>
						&nbsp;级编目&nbsp;<a>设置</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Setting;
