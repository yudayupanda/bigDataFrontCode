<!-- 线性图表 -->
<template>
  <div :id="id" class="chart" :style="{height:chartHeight,width:chartWidth}"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "line-chart",
  components: {},
  data() {
    return {
      id: this.generatorOnlyId(),
      chartHeight: "500px",
      chartWidth: "500px"
    };
  },
  props: {
    chartType: {
      type: String,
      default() {
        // 图表类型 line/bar/pie
        return "line";
      }
    },
    titleText: {
      type: String,
      default() {
        // 主标题
        return "title";
      }
    },
    subText: {
      type: String,
      default() {
        // 次级标题
        return "sub-text";
      }
    },
    xText: {
      type: String,
      default() {
        // 横轴文本
        return "x-text";
      }
    },
    yText: {
      type: String,
      default() {
        // 纵轴文本
        return "y-text";
      }
    },
    chartData: {
      type: Array,
      default() {
        // 图表数据
        return [];
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    xAxisData() {
      return this.chartData.map(function(item) {
        return item[0];
      });
    },
    yAxisData() {
      return this.chartData.map(function(item) {
        return item[1];
      });
    }
  },
  methods: {
    // 生成图表的唯一ID
    generatorOnlyId() {
      return (
        Math.floor(Math.random() * 10000)
      );
    },
    // 生成渲染图表div的宽度与高度
    generateWidthAndHeight() {
      this.chartWidth = `${
        this.width ? this.width : document.body.offsetWidth * 0.32

      }px`;
      this.chartHeight = `${
        this.height ? this.height : document.body.offsetHeight * 0.6
      }px`;

    },
    // 绘制图表
    drawChart() {
      let chart = echarts.init(document.getElementById(this.id));
      if (chart == undefined) {
        console.error(`echarts init dom id ${this.id} failed`);
        return;
      }
      switch (this.chartType) {
        case "line":
          chart.showLoading()
          chart.setOption(this.generatorLineOption())
          chart.hideLoading()
          break;
        case "bar":
          chart.showLoading()
          chart.setOption(this.generatorBarOption())
          chart.hideLoading()
          break;
        case "pie":
          chart.showLoading()
          chart.setOption(this.generatorPieOption())
          chart.hideLoading()
          break;
        default:
          console.error(`chartType ${this.chartType} is invalid`);
          break;
      }
      let self = this;
      let work = null;
      window.addEventListener("resize", function() {
        self.generateWidthAndHeight();
        if (work == null) {
          work = setTimeout(function() {
            chart.resize();
            work = null;
          }, 100);
        }
      });
    },
    generatorLineOption() {
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: "center"
        },
        toolbox: {
          show : true,
          feature : {
              mark : {show: true},
           //   dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
        },
        xAxis: {
          type: "category",
          data: this.xAxisData,
          axisLabel:{
            interval:0, //横轴信息全部显示
            rotate:-10, //倾斜角度
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.yAxisData,
            type: "line"
          }
        ]
      };
    },
    generatorBarOption() {
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: "left"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show : true,
          feature : {
              mark : {show: true},
           //   dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
        },
        calculable : true,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel:{
              interval:0, //横轴信息全部显示
              rotate:-80, //倾斜角度
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: this.yText,
            type: "bar",
            barWidth: "20%",
            data: this.yAxisData
          }
        ]
      };
    },
    generatorPieOption() {
      let pieData = []
      for (let index in this.xAxisData) {
        pieData.push({
          value: this.yAxisData[index],
          name: this.xAxisData[index]
        })
      }
      return {
        title: {
          text: this.titleText,
          subtext: this.subText,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.xAxisData
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: pieData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    }
  },
  watch: {},
  mounted() {
    this.drawChart();
  },
  created() {
    this.generateWidthAndHeight()
  }
};
</script>

<style scoped>
.chart {
  text-align: center;
  margin: 0 auto;
  /* position: relative;
  left: 50%;
  margin-left: -45%;
  box-shadow: 0 0 10px #726dd1;
  border-radius: 10px; */
}
</style>