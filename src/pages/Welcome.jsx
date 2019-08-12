import React from 'react';
import styles from './Welcome.less';
import { Table, Tabs, Button } from 'antd';
import { Bar, TimelineChart } from 'ant-design-pro/lib/Charts';
import $ from 'jquery'
const { TabPane } = Tabs;
class index extends React.Component {
	render() {
		function test() {
			// alert('成功test')
			// var script = document.createElement('script');
			// script.type = 'text/jacascript';
			// script.src = './lib/req/require.js';
			// $('body').append(script);
		}
		// 切换标签页回调函数
		function callback(key) {
			console.log(key);
		}
		// 条形统计图数据源
		const salesData = [];
		for (let i = 0; i < 12; i += 1) {
			salesData.push({
				x: `${i + 1}月`,
				y: Math.floor(Math.random() * 1000) + 200,
			});
		}
		// 折线统计图数据源
		const chartData = [];
		for (let i = 0; i < 20; i += 1) {
			chartData.push({
				x: new Date().getTime() + 1000 * 60 * 30 * i,
				y1: Math.floor(Math.random() * 100) + 1000,
				y2: Math.floor(Math.random() * 100) + 700,
			});
		}
		// 表格列的配置
		const columns = [
			{
				title: '#',
				// dataIndex: 'grade',
			},
			{
				title: '名称',
				// dataIndex: 'clazz',
			},
			{
				title: '作者',
				// dataIndex: 'coursename',
			},
			{
				title: '类目',
				// dataIndex: 'teacher',
			},
			{
				title: '时间',
				// dataIndex: 'id',
			},
			{
				title: '查看',
				// dataIndex: 'id',
			},
			{
				title: 'Action',
				render: record => { },
			},
		];

		return (
			<div>
				<div id={styles.user} className={styles.content}  >
					<div className={styles.imgs}><img src={require('../../images/index/u50.png')} /></div>
					<div className={styles.name}><span>用户</span><br /><span>325</span></div>
				</div>
				<div id={styles.video} className={styles.content}>
					<div className={styles.imgs}><img src={require('../../images/index/u54.png')} /></div>
					<div className={styles.name}><span>视频</span><br /><span>2357</span></div>
				</div>
				<div id={styles.text} className={styles.content}>
					<div className={styles.imgs}><img src={require('../../images/index/u58.png')} /></div>
					<div className={styles.name}><span>文档</span><br /><span>2435</span></div>
				</div>
				<div id={styles.school} className={styles.content} >
					<div className={styles.imgs}><img src={require('../../images/index/u62.png')} /></div>
					<div className={styles.name}><span>学校</span><br /><span>352</span></div>
				</div>
				<div className={styles.audit}>
					<div>
						<span className={styles.span1}>待审核</span>
						<div className={styles.link} onClick={() => window.location.href = 'resource/Check/video'}><a>去审核>></a></div>
						<br />
						<hr />
						<Tabs defaultActiveKey="1" onChange={callback}>
							<TabPane tab="视频(15)" key="1">
								<Table
									bordered
									rowKey="id"
									size="small"
									columns={columns}
								// dataSource={this.props.create.creates}
								/>
							</TabPane>
							<TabPane tab="文档(4)" key="2">
								<Table
									bordered
									rowKey="id"
									size="small"
									columns={columns}
								// dataSource={this.props.create.creates}
								/>
							</TabPane>
							<TabPane tab="评论(5)" key="3">
								<Table
									bordered
									rowKey="id"
									size="small"
									columns={columns}
								// dataSource={this.props.create.creates}					
								/>
							</TabPane>
						</Tabs>
					</div>
				</div>
				<div className={styles.remind}>
					<span className={styles.span1}>提醒</span><br />
					<span>【提问】朱莉 java-java环境搭建 回复</span><br />
					<span>【练习】森迪 java-环境答辩练习 评分</span><br />
				</div>
				<div className={styles.count}>
					<span className={styles.span1}>统计</span><br />
					<Bar height={200} title="上传量统计" data={salesData} />
					<TimelineChart height={200} data={chartData} titleMap={{ y1: '上传量', y2: '通过量' }} />
				</div>
			</div >
		);
	};
}
export default index;
