import React from 'react';
import styles from './Welcome.less';
import { Table, Tabs, Button, DatePicker } from 'antd';
import { Bar, TimelineChart } from 'ant-design-pro/lib/Charts';
import { connect } from 'dva'
import $ from 'jquery'
import ReactEcharts from 'echarts-for-react';
import { thisExpression } from '@babel/types';
const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;
class index extends React.Component {
	state = {
		all: [],
		month: [],
	}
	componentWillMount() {
		this.props.dispatch({ type: 'welcome/findAll' }).then(() => {
			console.log(this.props.welcome)
			this.setState({
				all: this.props.welcome.all.data
			})
		});
		var day = new Date()
		var arr = []
		arr.push(day.getFullYear()) // 获取当前年份
		arr.push(day.getMonth() + 1) // 获取当前月份+1(0-11,0代表1月)
		arr.push(new Date(arr[0], arr[1], 0).getDate()) // 获取当月天数
		this.props.dispatch({ type: 'welcome/findMonth', payload: arr }).then(() => {
			console.log(this.props.welcome)
			this.setState({
				month: this.props.welcome.month.data.data
			})
		});
	}

	onChange = (date, dateString) => {
		if (dateString) {
			var arr = dateString.split("-");
			var day = new Date(arr[0], arr[1], 0).getDate();   //最后一个参数为0,意为获取当月一共多少天
			arr.push(day)
			this.props.dispatch({ type: 'welcome/findMonth', payload: arr }).then(() => {
				console.log(this.props.welcome)
				this.setState({
					month: this.props.welcome.month.data.data
				})
			});
		}
	}

	render() {
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
		// // 折线统计图数据源
		// var list = this.state.month
		// if (list.length > 0) {
		// 	var chartData = []
		// 	list.forEach((item) => {
		// 		chartData.push({
		// 			x: item.day,
		// 			y1: item.upload_works_num,
		// 			y2: item.audit_passed_works_num
		// 		})
		// 	})
		// }
		// console.log(chartData)

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
		var list = this.state.month
		var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
		return (
			<div>
				<div id={styles.user} className={styles.content}  >
					<div className={styles.imgs}><img src={require('../../images/index/u50.png')} /></div>
					<div className={styles.name}><span>用户</span><br /><span>{this.state.all.user_num}</span></div>
				</div>
				<div id={styles.video} className={styles.content}>
					<div className={styles.imgs}><img src={require('../../images/index/u54.png')} /></div>
					<div className={styles.name}><span>视频</span><br /><span>{this.state.all.video_num}</span></div>
				</div>
				<div id={styles.text} className={styles.content}>
					<div className={styles.imgs}><img src={require('../../images/index/u58.png')} /></div>
					<div className={styles.name}><span>文档</span><br /><span>{this.state.all.docs_num}</span></div>
				</div>
				<div id={styles.school} className={styles.content} >
					<div className={styles.imgs}><img src={require('../../images/index/u62.png')} /></div>
					<div className={styles.name}><span>学校</span><br /><span>{this.state.all.school_num}</span></div>
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
					<MonthPicker onChange={this.onChange} placeholder="Select month" />
					<Bar height={200} title="上传量与通过量统计" data={salesData} />
					<ReactEcharts theme="light" option={option} />
					{/* <TimelineChart height={200} data={chartData} titleMap={{ y1: '上传量', y2: '通过量' }} /> */}
				</div>
			</div >
		);
	};
}
export default connect(({ welcome }) => ({ welcome }))(index);
