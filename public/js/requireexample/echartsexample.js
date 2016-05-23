/**
 * 图表示例js
 */
require.config({
	//使用相对位置
	paths: {
		"jquery": "../../../plugins/jquery/jquery-1.12.mini",
		"echarts": "../../../plugins/echarts/echarts.common.min"
	},
	shim: {
		'echarts': {
			exports: 'echarts'
		}
	}
});

require(['echarts', 'jquery'], function(echarts, $) {
	//示例一 柱形图
	//基于准备好的dom  ,初始化echarts 实例
	var myChart = echarts.init(document.getElementById('main'));
	//指定图标的配置项和数据
	var option = {
		title: {
			text: "ECharts 入门示例一柱形图 "
		},
		tooltip: {},
		legend: {
			data: ['支出']
		},
		xAxis: {
			data: ["衣服", "吃饭", "住宿", "零食水果", "公交", "其他"]
		},
		yAxis: {},
		series: [{
			name: '销量',
			type: "bar",
			data: [5, 20, 36, 10, 20]
		}]
	};
	//使用刚指定的配置项和数据显示图标
	myChart.setOption(option);
	//示例二 南丁格尔图 (饼图)
	var bingChart = echarts.init(document.getElementById('bing'));
	var bingOption = {
		title: {
			text: "ECharts 入门示例二饼形图"
		},
		series: [{
			name: "QQ人脉",
			type: "pie",
			radius: "55%",
			//去掉roseType 只显示圆形
			roseType: "angle",
			data: [{
				value: 400,
				name: '亲人'
			}, {
				value: 335,
				name: '朋友'
			}, {
				value: 310,
				name: '同学'
			}, {
				value: 235,
				name: '同事'
			}, {
				value: 200,
				name: '其他'
			}]
		}],
		//添加阴影效果
		itemStyle: {
			normal: {
				//阴影的大小
				shadomBlur: 200,
				//阴影水平方向上的偏移
				shadowOffsetX: 0,
				//阴影出事方向上的偏移
				shadowOffsetY: 0,
				//阴影颜色
				shadowColor: 'rgba(0,0,0,0.5)'
			}
		}
	}
	bingChart.setOption(bingOption);
	//示例三异步加载数据
	var asynChart = echarts.init(document.getElementById('asyncchart'));
	// 显示标题，图例和空的坐标轴
	asynChart.setOption({
		title: {
			text: '异步数据加载示例'
		},
		tooltip: {},
		legend: {
			data: ['支出']
		},
		xAxis: {
			data: []
		},
		yAxis: {},
		series: [{
			name: '支出',
			type: 'bar',
			data: []
		}]
	});
	myChart.showLoading();
	// 异步加载数据
	$.get('asynChartData.json').done(function(data) {
		myChart.hideLoading();
		// 填入数据
		asynChart.setOption({
			xAxis: {
				data: data.categories
			},
			series: [{
				// 根据名字对应到相应的系列
				name: '支出',
				data: data.data
			}]
		});
	});
})