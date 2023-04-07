//地图
var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
var mapOption;
var barOption;
(function (){


    var option;
    let json_data ={};
    let chartdata = [];
    $.ajax({
        type:"GET",
        url:'/get_obj_msg_num/',
        success:function (data){
            json_data = JSON.parse(data)

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
    $.get('/static/assets/js/wuhan.geojson', function (whJson) {
    myChart.hideLoading();
    echarts.registerMap('wuhan', whJson);
    var data = chartdata;

    data.sort(function (a, b) {
    return a.value - b.value;
    });
      mapOption = {

    visualMap: {
      left: 'right',
      min: json_data.value.reduce((a,b)=>a<b?a:b),
      max: json_data.value.reduce((a,b)=>a>b?a:b),
      inRange: {
        // prettier-ignore
        color: [ '#4575b4', '#abd9e9', '#ffffbf', '#00bcd4','#4caf50','#fee090','#ff9800','#e91e63','#f44336', '#fdae61', '#f48743', '#fc7253', 'rgba(255,51,51,0.88)']
      },
      text: ['High', 'Low'],
      calculable: true
    },
    series: [
      {
        id: 'population',
        type: 'map',
        roam: true,
        map: 'wuhan',
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: data
      }
    ],
  };
  barOption = {
    grid:{
          x2:20
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        rotate: 30
      },
      data: data.map(function (item) {
        return item.name;
      })
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
  let currentOption = mapOption;
  myChart.setOption(mapOption);
  myChart.on("click",function (param){
      mark=param.name
      changeObj(mark);
      changeObj2(mark);
      console.log(mark)
      $("#mark1").text(mark);
      $("#mark2").text(mark);

      $(".list_num1 span").text(filter_data.length);
      $(".list_num2 span").text(filter_data.filter(function (e){return e.state==="已办理";}).length);
      $(".list_num3 span").text((filter_data.filter(function (e){return e.state==="已办理";}).length*100/filter_data.length).toFixed(2));
      $(".list_num4 span").text(filter_data.filter(function (e){return e.state!=="已办理";}).length);
      $("#maxmonth").text(dataDailySalesChart.labels[getMaxValue(dataDailySalesChart.series[0]).index])
      $("#maxdomain").text(dataWebsiteViewsChart.labels[getMaxValue(dataWebsiteViewsChart.series[0]).index])
      numInit();

  });
  // setInterval(function () {
  //   currentOption = currentOption === mapOption ? barOption : mapOption;
  //   myChart.setOption(currentOption, true);
  // }, 4000);
});

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', function (){
        myChart.resize();
});
})();

