$(window).on('load',function (){$(".loading").fadeOut()});
function changeDomain(str,city){


    if (str){
        if (city){
            filter_data=all_data.filter(item => item.domain ===str && item.city ===city)
                document.getElementById('msgcld').src=`/static/assets/img/wordcloud/${city}/msg/${str}.png`
    document.getElementById('rplcld').src=`/static/assets/img/wordcloud/${city}/rpl/${str}.png`
        }
        else {
            filter_data=all_data.filter(item => item.domain ===str)
            document.getElementById('msgcld').src=`/static/assets/img/wordcloud/msg/${str}.png`
    document.getElementById('rplcld').src=`/static/assets/img/wordcloud/rpl/${str}.png`
        }
    }
    else {
        if(city){
            filter_data=all_data.filter(item => item.city ===city)
            document.getElementById('msgcld').src=`/static/assets/img/wordcloud/${city}/msg/all.png`
    document.getElementById('rplcld').src=`/static/assets/img/wordcloud/${city}/rpl/all.png`
        }
        else {
            filter_data=all_data
        }
    }
    rpl_data=filter_data.filter(function (e){return e.state==='已办理';}).sort(sortrplTime)
    initChart();
}
function getDatabyObj(list){
    datalist=[];
    list.forEach(li => {
        datalist.push(filter_data.filter(item => item.object === li).length);
    })
  return datalist
}
function getDatabyOrg(list){
    datalist=[];
    list.forEach(li => {
        datalist.push(filter_data.filter(item => item.rplorg === li).length);
    })
  return datalist
}
initChart();
function initChart() {
    document.getElementById('domainNum1').innerHTML=rpl_data.length;
    document.getElementById('domainNum2').innerHTML=filter_data.length;
    numInit();
    let objCount = {};
let objs = [...new Set(filter_data.map(item => item.object))];
objs.forEach(obj => {
    objCount[obj] = filter_data.filter(item => item.object === obj).length;
});
let legendData = Object.entries(objCount).sort((a, b) => b[1] - a[1]).map(item => item[0]);
    let orgCount = {};
let orgs = [...new Set(rpl_data.map(item => item.rplorg))];
orgs.forEach(org => {
    orgCount[org] = rpl_data.filter(item => item.rplorg === org).length;
});
let orglegendData = Object.entries(orgCount).sort((a, b) => b[1] - a[1]).slice(0,15).map(item => item[0]);
let container=document.getElementById('orgcontainer');
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
for (let i=0;i<orglegendData.length;i++){

    let record=rpl_data.find(item =>item.rplorg===orglegendData[i])

    let li =document.createElement('li');
    li.setAttribute('style','height:40px')
    let span1 = document.createElement('span');
    span1.innerHTML=i+1;
    span1.setAttribute('style','width:22px;');
    li.appendChild(span1);
    let span2 = document.createElement('span');
    span2.innerHTML=record.city;
    li.appendChild(span2);
    let span3 = document.createElement('span');
    span3.setAttribute('style','overflow: hidden;');
    span3.setAttribute('title',record.object);
    span3.innerHTML=record.object;
    li.appendChild(span3);
    let span4 = document.createElement('span');
    span4.setAttribute('style','overflow: hidden;width: 8em;white-space: nowrap;text-overflow: ellipsis;')
    span4.setAttribute('title',record.rplorg);
    span4.innerHTML=record.rplorg;
    li.appendChild(span4);
    let span5 = document.createElement('span');
    span5.innerHTML=filter_data.filter(item => item.rplorg === orglegendData[i]).length+'条';
    li.appendChild(span5);
    container.appendChild(li);
}
let result = filter_data.reduce((acc, item) => {
  let date = new Date(item.msgtime).toLocaleDateString(); // 获取年月日
  if (acc[date]) {
    acc[date] += 1; // 如果已经存在，则累加
  } else {
    acc[date] = 1; // 如果不存在，则初始化为1
  }
  return acc;
}, {});

// 将结果转换为数组形式
result = Object.entries(result).map(([date, count]) => ({ date, count }));
let rpldaily = rpl_data.reduce((acc, item) => {
  let date = new Date(item.rpltime).toLocaleDateString(); // 获取年月日
  if (acc[date]) {
    acc[date] += 1; // 如果已经存在，则累加
  } else {
    acc[date] = 1; // 如果不存在，则初始化为1
  }
  return acc;
}, {});

// 将结果转换为数组形式
rpldaily = Object.entries(rpldaily).map(([date, count]) => ({ date, count }));
let lastDays = [];
for (let m = 1; m <= 12; m++) {
    let date = new Date(2022, m, 0);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    lastDays.push(`${year}/${month}/${day}`);
}

    new_build();
    complete();

function new_build() {

        var myChart = echarts.init(document.getElementById('new_build'));
        var salvProName = legendData;
        var salvProValue = getDatabyObj(legendData);
        var salvProMax = [];//背景按最大值
        for (let i = 0; i < salvProValue.length; i++) {
            salvProMax.push(salvProValue[0])
        }
        option = {
            grid: {
                left: '2%',
                right: '2%',
                bottom: '-3%',
                top: '2%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + ' : ' + params[0].value
                }
            },
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: [{
                type: 'category',
                inverse: true,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#000000'
                    },
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                data: salvProName
            }, {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                show: true,
                axisLabel: {
                    textStyle: {
                        color: '#000000',
                        fontSize: '12',
                    },
                },
                data: salvProValue
            }],
            series: [{
                name: '值',
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#2192f6'
                        }, {
                            offset: 1,
                            color: '#63ceff'
                        }]),
                    },
                },
                barWidth: 10,
                data: salvProValue
            }, {
                name: '背景',
                type: 'bar',
                barWidth: 10,
                barGap: '-100%',
                data: salvProMax,
                itemStyle: {
                    normal: {
                        color: 'rgba(94,94,94,0.6)',
                        barBorderRadius: 30,
                    }
                },
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function complete() {
        var myChart = echarts.init(document.getElementById('complete'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#2192F6'
                    }
                }
            },
            grid: {
                top: '30',
                left: '3',
                right: '3',
                bottom: '-0.5',
                containLabel: true
            }, legend: {
                data: ['留言','回复'],
                right: 'center',
                top: 0,
                textStyle: {
                    color: "#000000"
                },
                itemWidth: 12,
                itemHeight: 10,
                // itemGap: 35
            },
            xAxis: [{
                type: 'time',
                boundaryGap: false,
                axisLabel: {
                    formatter: function (value) {
            return echarts.format.formatTime('yyyy/MM', value);
        },
                    textStyle: {
                        color: "rgba(0,0,0,1)",
                        fontSize: 14,
                    },
                    interval: 17,
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,1)'
                    }
                },
                // data: lastDays,
            }, {
                axisPointer: {show: false},
                axisLine: {show: false},
                position: 'bottom',
                offset: 20,
            }],
            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                // splitNumber: 6,
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,1)'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(0,0,0,1)",
                        fontSize: 14,
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: '#797979'
                    }
                }
            }],
            series: [
                {
                    name: '留言',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: 'rgb(225,102,253)',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(225,102,253,0.8)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(225,102,253,0.1)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E166FD',
                            borderColor: 'rgba(225,102,253, .1)',
                            borderWidth: 12
                        }
                    },
                    data: result.map(item => [item.date,item.count]),
                }, {
                    name: '回复',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: 'rgb(33,146,246)',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(33,146,246,.8)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(33,146,246, .1)'
                            }], false),
                            shadowColor: 'rgba(0,0,0,0.1)',
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgba(33,146,246, .8)',
                            borderColor: 'rgba(33,146,246, .1)',
                            borderWidth: 12
                        }
                    },
                    data: rpldaily.map(item => [item.date,item.count]),
                },
            ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }



}