$(window).on('load',function (){$(".loading").fadeOut()});
    let legendData;
    function ratio() {
        var myChart = echarts.init(document.getElementById('ratio'));
        var captions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        let values = {};
legendData.forEach(domain => {
    values[domain] = [];
    captions.forEach(caption => {
        values[domain].push((100*filter_data.filter(item => item.domain === domain && item.msg_month === caption && item.state === '已办理').length/filter_data.filter(item => item.domain === domain && item.msg_month === caption).length).toFixed(2));
    });
});

        // let colorList = ['#5B8FF9', '#61DDAA', '#F6BD16', '#2F467A', '#4B98DC']; // 颜色系
        let colorList = ['#7ed0f8', '#9e94b6', '#faaa89', '#2F467A',
            '#6487af']; // 颜色系
        let seriesData = []; // series数据
        legendData.map((item, index) => {
            seriesData.push({
                name: item,
                type: 'line',
                data: values[item],
                symbolSize: 10, //标记的大小
                lineStyle: {
                    color: colorList[index],
                    width: 5,
                },
                itemStyle: {
                    //折线拐点标志的样式
                    color: colorList[index],
                    borderColor: colorList[index],
                    borderWidth: 6,
                },
                emphasis: {
                    scale: 1.5
                }
            })
        })
        var option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: 'none'
                },
                formatter: '{b0}月<br/>{a0}：{c0}%<br/>{a1}：{c1}%<br/>{a2}：{c2}%<br/>{a3}：{c3}%<br/>{a4}：{c4}%'
            },
            legend: {
                data: legendData,
                top: "10",
                left: '20',
                itemWidth: 12,
                itemHeight: 12,
                itemGap: 20,
                textStyle: {
                    fontSize: 16,
                    color: "#000",
                    fontFamily: 'Source Han Sans CN-Regular',
                    padding: [0, 0, 0, 4]
                }
            },
            grid: {
                left: '20',
                right: '28',
                top: '80',
                bottom: '0',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: captions,
                axisTick: {
                    show: false //隐藏X轴刻度
                },
                axisLine: {
                    lineStyle: {
                        color: '#000',
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 16,
                        color: "#000", //X轴文字颜色
                        fontFamily: 'Source Han Sans CN-Regular'
                    }
                },
            },
            yAxis: {
                name: "单位：%",
                nameTextStyle: {
                    fontSize: 16,
                    color: "#000", //Y轴文字颜色
                    fontFamily: 'Source Han Sans CN-Regular',
                    align: "left",
                    verticalAlign: "center",
                },
                type: 'value',
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 1,
                        color: '#797979',
                        opacity: '1',
                    }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 16,
                        color: "#000",
                        fontFamily: 'HarmonyOS Sans-Regular'
                    }
                },
                splitArea: {
                    show: false
                }
            },
            series: seriesData
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function amount() {
        var myChart = echarts.init(document.getElementById('amount'));
        var giftImageUrl = "data:image/png;base64,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";
        var option = {
            // graphic: {
            //     elements: [{
            //         type: 'image',
            //         style: {
            //             image: giftImageUrl,
            //             width: 30,
            //             height: 30
            //         },
            //         left: '73%',
            //         top: 'center'
            //     }]
            // },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['销售额'],
                left: '27%'
            },
            grid: {
                left: '4%',
                right: '60%',
                top: '10%',
                bottom: '10%',
                height: '220',
                width: '300',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                position: 'top',
                splitLine: {show: true},
                boundaryGap: [0, 0.01],
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#000',
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#000'
                    }
                },
            },
            yAxis: {
                type: 'category',
                data: legendData.reverse(),
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: 'black',
                        fontSize: 14
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#000'
                    }
                },
            },
            series: [{
                name: '',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#7ed0f8', '#9e94b6', '#faaa89', '#adced7', '#c27986',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                        // shadowBlur: 20,
                        // shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                type: 'bar',
                data: [rpl_data.filter(item => item.domain === legendData[0]).length, rpl_data.filter(item => item.domain === legendData[1]).length, rpl_data.filter(item => item.domain === legendData[2]).length, rpl_data.filter(item => item.domain === legendData[3]).length, rpl_data.filter(item => item.domain === legendData[4]).length]
            }, {
                type: 'pie',
                radius: ['15%', '60%'],
                center: ['75%', '50%'],
                roseType: 'radius',
                color: [
                    '#7ed0f8', '#9e94b6', '#faaa89', '#adced7', '#c27986',
                    '#fe8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                ],
                data: [{
                    value: rpl_data.filter(item => item.domain === legendData[0]).length,
                    name: legendData[0]
                }, {
                    value: rpl_data.filter(item => item.domain === legendData[1]).length,
                    name: legendData[1]
                }, {
                    value: rpl_data.filter(item => item.domain === legendData[2]).length,
                    name: legendData[2]
                }, {
                    value: rpl_data.filter(item => item.domain === legendData[3]).length,
                    name: legendData[3]
                }, {
                    value: rpl_data.filter(item => item.domain === legendData[4]).length,
                    name: legendData[4]
                }],
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 16
                        },
                        formatter: function (param) {
                            return param.name + ':\n' + Math.round(param.percent) + '%';
                        }
                    }
                },
                labelLine: {
                    normal: {
                        smooth: true,
                        lineStyle: {
                            width: 2
                        }
                    }
                },
                // itemStyle: {
                //     normal: {
                //         shadowBlur: 30,
                //         shadowColor: 'rgba(0, 0, 0, 0.4)'
                //     }
                // },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        }
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function emotion() {
        let values = {};
        domains=[
                        '三农',
                        '交通',
                        '企业',
                        '体育',
                        '医疗',
                        '城建',
                        '就业',
                        '政务',
                        '教育',
                        '环保',
                    ]
        sentis=['正','中','负']
sentis.forEach(senti => {
    values[senti] = [];
    domains.forEach(domain => {
        values[senti].push(filter_data.filter(item => item.senti === senti && item.domain === domain).length);
    });
});
        var myChart = echarts.init(document.getElementById('emotion'));
        option = {
            tooltip: {//鼠标滑过提示栏
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            legend: {//图表选择栏
                icon: "square",
                // top: 20,
                bottom: 0,
                itemHeight: 8, //修改icon图形大小
                textStyle: {
                    fontSize: 15,
                    color: "#000",
                },
                data: ["正面留言", '中性留言', '负面留言'],
            },
            grid: {// 图标离容器的距离
                top: '10%',
                left: "3%",
                right: "4%",
                bottom: "13%",
                //是否包含坐标轴
                containLabel: true,
                //鼠标滑过是否显示信息栏，目前来看最好在grid中配置tooltip鼠标滑过信息栏
            },
            xAxis: [// x坐标轴
                {
                    color: '#000',
                    type: "category",
                    data: domains,
                    axisLabel: {
                        textStyle: {
                            color: '#000',
                            fontSize: 14
                        }
                    }

                },
            ],
            yAxis: [//y坐标轴
                {
                    color: '#000',
                    type: "value",
                    axisLabel: {
                        textStyle: {
                            color: '#000',
                            fontSize: 14

                        }
                    }
                },

            ],
            series: [// 数据展示区域
                {
                    name: "负面留言",
                    type: "bar",
                    stack: "Ad",
                    color: "#9e94b6",
                    barWidth: 18,
                    // emphasis: {
                    //   focus: 'series'
                    // },
                    data: values['负'],
                }, {
                    name: "中性留言",
                    type: "bar",
                    color: "#7ed0f8",
                    stack: "Ad",
                    barWidth: 18,
                    data: values['中'],
                }, {
                    name: "正面留言",
                    type: "bar",
                    color: "#faaa89",
                    stack: "Ad",
                    barWidth: 18,
                    // emphasis: {
                    //   focus: 'series'
                    // },
                    data: values['正'],
                },
            ],
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }
    function initDomain(){
        let domainCount = {};
let domains = [...new Set(filter_data.map(item => item.domain))];
domains.forEach(domain => {
    domainCount[domain] = filter_data.filter(item => item.domain === domain).length;
});
    legendData = ['城建','教育','交通','就业','企业']; // 图例数据
    ratio();
    amount();
    emotion();
    }
$(function () {

initDomain();


})