<template>
  <div class="app-container" v-if="chartShow" v-loading="loading">
    <el-row>
      <el-col :span="11">
        <el-card id="browser" class="box-card" >
          <chart :chartData="browserChartData" chartType="pie" titleText="用户使用浏览器统计图" subText="" ></chart>
        </el-card>
      </el-col>
      <!--中间间隔-->
      <el-col :span="1">
        <div style="width: 20px;height: 20px;">
        </div> 
      </el-col>
    
      <el-col :span="11">
        <el-card class="box-card">
          <chart :chartData="ipChartData" chartType="pie" titleText="访问量最高IP前5名统计图" subText="" ></chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <div style="height: 40px;width: 10px;">
      </div>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-card class="box-card">
          <chart :chartData="pageChartData" chartType="bar" titleText="页面访问量统计图" subText=""></chart>
        </el-card>
      </el-col>
       <!--中间间隔-->
      <el-col :span="1">
        <div style="width: 20px;height: 20px;">
        </div> 
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <chart :chartData="monthChartData" chartType="line" titleText="月访问量统计图" subText="" ></chart>
        </el-card>  
      </el-col>
    </el-row>
  </div> 
</template>

<script>
import chart from '../../components/Echarts'
import {getKpi} from '../../api/api.js'
export default {
  components: {
    chart
  },
  data() {
    return {
      loading:true,
      chartShow:false,
      ipChartData: [],
      browserChartData: [],
      monthChartData: [],
      pageChartData: [],
      chartRefs: ["line", "bar", "pie"]
    }
  },
  
  methods: {
 
  },
  watch: {},
  mounted() {
    getKpi(";").then(data=>{
        let browserkpiRaw = data.browserKPI
        let browserKpi = []
        browserkpiRaw.forEach((i)=>{
          let arr = []
          arr.push(i.name)
          arr.push(i.value)
          browserKpi.push(arr)
        })
        this.browserChartData = browserKpi

        let ipKpiRaw = data.ipKPI
        let ipKpi = []
        ipKpiRaw.forEach((i)=>{
          let arr = []
          arr.push(i.name)
          arr.push(i.value)
          ipKpi.push(arr)
        })
        this.ipChartData = ipKpi


        let monthKpiRaw = data.monthKPI
        let monthKpi = []
        monthKpiRaw.forEach((i)=>{
          let arr = []
          arr.push(i.name)
          arr.push(i.value)
          monthKpi.push(arr)
        })
        this.monthChartData = monthKpi

        let pageKpiRaw = data.pageKPI
        let pageKpi = []
        pageKpiRaw.forEach((i)=>{
          let arr = []
          arr.push(i.name)
          arr.push(i.value)
          pageKpi.push(arr)
        })
        this.pageChartData = pageKpi


        this.chartShow = true
        this.loading = false
      
    })
   
  },
  created() {
   
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