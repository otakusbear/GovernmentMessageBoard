var chartDom1 = document.getElementById('piechart1');
var myChart1 = echarts.init(chartDom1);
var option1;
var chartDom2 = document.getElementById('piechart2');
var myChart2 = echarts.init(chartDom2);
var option2;
var chartDom3 = document.getElementById('piechart3');
var myChart3 = echarts.init(chartDom3);
var option3;
var chartDom4 = document.getElementById('piechart4');
var myChart4 = echarts.init(chartDom4);
var option4;
var chartDom5 = document.getElementById('piechart5');
var myChart5 = echarts.init(chartDom5);
var option5;
var chartDom6 = document.getElementById('piechart6');
var myChart6 = echarts.init(chartDom6);
var option6;
var chartBarDom1 = document.getElementById('barchart1');
var myBarChart1 = echarts.init(chartBarDom1);
var baroption1;
var chartBarDom2 = document.getElementById('barchart2');
var myBarChart2 = echarts.init(chartBarDom2);
var baroption2;
const legends={'senti':['负','中','正'],'type':['建言','咨询','投诉/求助'],'msg_mods':['个人权益','社会影响','弱者框架','抗争框架']}
let legendOption1 = legends.senti
let legendOption2 = legends.senti
// const labelOption = {
//   show: true,
//   position: 'insideBottom',
//   distance: 15,
//   align: 'left',
//   verticalAlign: 'middle',
//   rotate: 90,
//   formatter: '{c}  {name|{a}}',
//   fontSize: 8,
//   rich: {
//     name: {}
//   }
// };
function getDatabyType(list){
    datalist=filter_data.filter(function (e){return e.type===list;}).length
  return datalist
}
function getDatabySenti(list){
    datalist=filter_data.filter(function (e){return e.senti===list;}).length
  return datalist
}
function getDatabyMMode(list){
    datalist=filter_data.filter(function (e){return e.msg_mods===list;}).length
  return datalist
}
function getDatabyRAtt(list){
    datalist=filter_data.filter(function (e){return e.rpl_atts===list;}).length
  return datalist
}
function getDatabyRMode(list){
    datalist=filter_data.filter(function (e){return e.rpl_mods===list;}).length
  return datalist
}
function getDatabyRTD(list){
    datalist=filter_data.filter(function (e){return e.reply_time_diff===parseInt(list);}).length
  return datalist
}
function getDatabyLegend(legend,list){
  datalist= {}
  data=[]
  datalist.name=legend
  datalist.type='bar'
  // datalist.label=labelOption
  datalist.emphasis={focus: 'series'}
  if (legendOption1===legends.senti){
    for (j=0;j<list.length;j++){
      data[j]=filter_data.filter(function (e){return e.msg_month===parseInt(list[j]) && e.senti===legend;}).length;
    }
  }
  if (legendOption1===legends.type){
    for (j=0;j<list.length;j++){
      data[j]=filter_data.filter(function (e){return e.msg_month===parseInt(list[j]) && e.type===legend;}).length;
    }
  }
  if (legendOption1===legends.msg_mods){
    for (j=0;j<list.length;j++){
      data[j]=filter_data.filter(function (e){return e.msg_month===parseInt(list[j]) && e.msg_mods===legend;}).length;
    }
  }
  datalist.data=data
  return datalist
}
function getDatabyLegend2(legend,list){
  datalist= {}
  data=[]
  datalist.name=legend
  datalist.type='bar'
  // datalist.label=labelOption
  datalist.emphasis={focus: 'series'}
  if (legendOption2===legends.senti){
    for (j=0;j<list.length;j++){
      data[j]=filter_data.filter(function (e){return e.domain===list[j] && e.senti===legend;}).length;
    }
  }
  if (legendOption2===legends.type){
    for (j=0;j<list.length;j++){
      data[j]=filter_data.filter(function (e){return e.domain===list[j] && e.type===legend;}).length;
    }
  }
  if (legendOption2===legends.msg_mods){
    for (j=0;j<list.length;j++){
      data[j]=filter_data.filter(function (e){return e.domain===list[j] && e.msg_mods===legend;}).length;
    }
  }
  datalist.data=data
  console.log(datalist)
  return datalist
}
(function (){

  option1 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '咨询',
        '建言',
        '投诉/求助',
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      restore: { show: true, title:'还原'},
      saveAsImage: { show: true, title:'保存' }
    }
  },
  series: [
    {
      name: '留言类型',
      type: 'pie',
      radius: [10, '50%'],
      center: ['50%', '50%'],
      // roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 0, name: '咨询'},
        { value: 0, name: '建言' },
        { value: 0, name: '投诉/求助' },

      ]
    }
  ]

};
  option2 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '正',
        '中',
        '负',
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      restore: { show: true, title:'还原'},
      saveAsImage: { show: true, title:'保存' }
    }
  },
  series: [
    {
      name: '情感倾向',
      type: 'pie',
      radius: [10, '50%'],
      center: ['50%', '50%'],
      // roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 0, name: '正'},
        { value: 0, name: '中' },
        { value: 0, name: '负' },

      ]
    }
  ]

};
  option3 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '弱者框架',
        '抗争框架',
        '个人权益',
        '社会影响'
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      restore: { show: true, title:'还原'},
      saveAsImage: { show: true, title:'保存' }
    }
  },
  series: [
    {
      name: '留言话语模式',
      type: 'pie',
      radius: [10, '50%'],
      center: ['50%', '50%'],
      // roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 0, name: '弱者框架'},
        { value: 0, name: '抗争框架' },
        { value: 0, name: '个人权益' },
          { value: 0, name: '社会影响' }

      ]
    }
  ]

};
  option4 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '整改',
        '协商',
        '转办',
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      restore: { show: true, title:'还原'},
      saveAsImage: { show: true, title:'保存' }
    }
  },
  series: [
    {
      name: '回复态度',
      type: 'pie',
      radius: [10, '50%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 0, name: '整改'},
        { value: 0, name: '协商' },
        { value: 0, name: '转办' },

      ]
    }
  ]

};
  option5 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '7天内',
        '7-15天',
        '15天后',
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      restore: { show: true, title:'还原'},
      saveAsImage: { show: true, title:'保存' }
    }
  },
  series: [
    {
      name: '回复积极性',
      type: 'pie',
      radius: [10, '50%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 0, name: '7天内' ,code:'1'},
        { value: 0, name: '7-15天' ,code: '0'},
        { value: 0, name: '15天后' ,code: '-1'},

      ]
    }
  ]

};
  option6 = {

  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: [
      '共情话语',
        '规则话语',
        '描述话语',
    ]
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      restore: { show: true, title:'还原'},
      saveAsImage: { show: true, title:'保存' }
    }
  },
  series: [
    {
      name: '回复话语模式',
      type: 'pie',
      radius: [10, '50%'],
      center: ['50%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 0, name: '共情话语'},
        { value: 0, name: '规则话语' },
        { value: 0, name: '描述话语' },

      ]
    }
  ]

};

  baroption1 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: legendOption1
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      magicType: { show: true, type: ['line', 'bar', 'stack'], title:{line:'折线图',bar:'柱状图',stack:'堆叠图'} },

      saveAsImage: { show: true, title:'保存' }
    }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['1', '2','3', '4', '5', '6','7','8','9','10','11','12']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [

  ]
};
  baroption2 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: legendOption2
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false, title:'数据视图' },
      magicType: { show: true, type: ['line', 'bar', 'stack'], title:{line:'折线图',bar:'柱状图',stack:'堆叠图'} },

      saveAsImage: { show: true, title:'保存' }
    }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['城建', '环保','交通', '教育', '金融', '就业','旅游','企业','三农','体育','文娱','医疗','政务','治安']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [

  ]
};
  updateOption();
})();
function updateOption(){
  baroption1.legend.data=legendOption1;
  baroption2.legend.data=legendOption2;
  baroption1.series=[];
  baroption2.series=[];
  console.log(baroption1)
  for (i=0;i<legendOption1.length;i++){
    baroption1.series[i]=getDatabyLegend(legendOption1[i],baroption1.xAxis[0].data);
  };

  for (i=0;i<legendOption2.length;i++){
    baroption2.series[i]=getDatabyLegend2(legendOption2[i],baroption2.xAxis[0].data);
  };
  for (i=0;i<3;i++){
    option1.series[0].data[i].value=getDatabyType(option1.series[0].data[i].name)
    option2.series[0].data[i].value=getDatabySenti(option2.series[0].data[i].name)
    option4.series[0].data[i].value=getDatabyRAtt(option4.series[0].data[i].name)
    option5.series[0].data[i].value=getDatabyRTD(option5.series[0].data[i].code)
    option6.series[0].data[i].value=getDatabyRMode(option6.series[0].data[i].name)
  };
  for (i=0;i<4;i++){
    option3.series[0].data[i].value=getDatabyMMode(option3.series[0].data[i].name)
  };
  option1 && myChart1.setOption(option1);
  option2 && myChart2.setOption(option2);
  option3 && myChart3.setOption(option3);
  option4 && myChart4.setOption(option4);
  option5 && myChart5.setOption(option5);
  option6 && myChart6.setOption(option6);


  baroption1 && myBarChart1.setOption(baroption1);
  baroption2 && myBarChart2.setOption(baroption2);
}
function changeObj2(mark){
  filter_data=all_data.filter(function (e){return e.object===mark;})
  console.log(filter_data);
  updateOption();
}



