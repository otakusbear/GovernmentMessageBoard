//地图
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
var mapOption;
var barOption;
let json_data ={};
let chartdata = [];
function updateMap(city){
    pinyin2hanzi={'wuhan':'武汉','changsha':'长沙','nanchang':'南昌','zhengzhou':'郑州'}
    hanzi=pinyin2hanzi[city]
    $.ajaxSetup({async :false });
    $.ajax({
        type:"GET",
        url:'/get_obj_msg_num/?city='+hanzi,
        success:function (data){
            json_data = JSON.parse(data)
            json_data.name = json_data.name.map(function(str) {
  return str
});
console.log(json_data)
            chartdata=[]
            for(var i=0;i<json_data['name'].length;i++){
                let Dic={};
                Object.keys(json_data).forEach(k => {
                    Dic[k] = json_data[k][i];
                });

                chartdata.push(Dic);
            }
        }
    })
    myChart.showLoading();

    myChart.hideLoading();
    var data = chartdata;

    data.sort(function (a, b) {
    return a.value - b.value;
    });
    mapOption = {
          tooltip: {
    trigger: 'item',
    formatter: function (params) {
        // return the string to be displayed in the tooltip
        return params.name + ' 留言量: ' + params.value;
    }
},
    // 地图热力颜色设置
    visualMap: {
      left: 'right',
      min: json_data.value.reduce((a,b)=>a<b?a:b),
      max: json_data.value.reduce((a,b)=>a>b?a:b),
      inRange: {
        // prettier-ignore
        color: [
    "rgba(255, 255, 255, 0.5)",
    "#E6F2FF",
    "#CCE6FF",
    "#B3D9FF",
    "#99CCFF",
    "#80BFFF",
    "#66B2FF",
    "#4DA6FF",
    "#3399FF",
    "#1A8CFF",
    "#007FFF"
]
      },
      text: ['High', 'Low'],
        textStyle: {
            color: '#fff'
        },
      calculable: true
    },
    series: [
      {
        id: 'population',
        type: 'map',
        roam: true,
        map: city,
          label: {
            show: true,//各区文字显示
              fontSize:11,
              textStyle: {
                color: '#fff'
            },
              emphasis: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            opacity: 0.5
        },
          emphasis: {
            itemStyle: {
                areaColor: 'rgba(255, 255, 255, 0.5)'
            }
        },
        scaleLimit:{min:1,max:4},
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: data
      }
    ],
  };

  barOption = {
    grid:{
          x2:20,
        left:120,
    },
      tooltip: {
    trigger: 'item',
    formatter: function (params) {
        // return the string to be displayed in the tooltip
        return params.name + ' 留言量: ' + params.value;
    }
},
    xAxis: {
      type: 'value',
        axisLabel: {
        textStyle: {
            color: '#fff'
        },
      },
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        textStyle: {
            color: '#fff'
        },
      },
      data: data.map(function (item) {
        return item.name;
      }),
    },
    animationDurationUpdate: 1000,
    series: {
      type: 'bar',
      id: 'population',
      data: data.map(function (item) {
        return item.value;
      }),
      universalTransition: true
    }
  };
}
(function (){
    // 获取长沙的 GeoJSON 数据
$.get('/static/assets/js/changsha.json', function (geoJson) {
  // 注册长沙的地图数据
  echarts.registerMap('changsha', geoJson);

});

// 获取南昌的 GeoJSON 数据
$.get('/static/assets/js/nanchang.json', function (geoJson) {
  // 注册南昌的地图数据
  echarts.registerMap('nanchang', geoJson);

});

// 获取郑州的 GeoJSON 数据
$.get('/static/assets/js/zhengzhou.json', function (geoJson) {
  // 注册郑州的地图数据
  echarts.registerMap('zhengzhou', geoJson);

});
$.get('/static/assets/js/wuhan.geojson', function (whJson) {

    echarts.registerMap('wuhan', whJson);
    });

    var option;

    // 获取各区数据
    updateMap('wuhan');
  let currentOption = mapOption;
  myChart.setOption(mapOption);
  // 监听缩放事件设置字体缩放
// myChart.on('georoam', function() {
//   var zoom = myChart.getOption().series[0].zoom;
//   console.log(zoom);
//   var fontSize = 10 * zoom;
//   var option = myChart.getOption(); // 获取当前选项
//   option.series[0].label.fontSize = fontSize; // 修改需要更新的部分
//   myChart.setOption(option, true,true); // 更新选项
// });
        //地图点击切换数据事件
  myChart.on("click",function (param){
      mark=param.name
      if (mark=='巩义市'){
          alert('巩义市数据暂未提供！')
      }
      else {
          changeObj(mark);
      }

      // console.log(mark)
      // $("#mark1").text(mark);
      // $("#mark2").text(mark);
      // $('#msgdata')
      // $(".list_num1 span").text(filter_data.length);
      // $(".list_num2 span").text(filter_data.filter(function (e){return e.state==="已办理";}).length);
      // $(".list_num3 span").text((filter_data.filter(function (e){return e.state==="已办理";}).length*100/filter_data.length).toFixed(2));
      // $(".list_num4 span").text(filter_data.filter(function (e){return e.state!=="已办理";}).length);
      //
      // numInit();

  });
  setInterval(function () {
    currentOption = currentOption === mapOption ? barOption : mapOption;
    myChart.setOption(currentOption, true);
  }, 4000);


    if (option && typeof option === 'object') {
      myChart.setOption(option);
// myChart.on('georoam', function() {
//   var zoom = myChart.getOption().series[0].zoom;
//   console.log(zoom);
//   var fontSize = 10 * zoom;
//   var option = myChart.getOption(); // 获取当前选项
//   option.series[0].label.fontSize = fontSize; // 修改需要更新的部分
//   myChart.setOption(option, true,true); // 更新选项
// });
    }
//页面缩放地图重绘
    window.addEventListener('resize', function (){
        myChart.resize();
});
})();

