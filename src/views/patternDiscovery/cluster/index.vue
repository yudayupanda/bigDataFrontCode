<template>

  <div class="app-container">
    <el-row v-loading="loading">
      <el-col :span="24">
        <el-card class="box-card" >
          <div id="user">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div> 
</template>

<script>
import echarts from "echarts";
import 'echarts-gl'; 
import {getUserCluserResult} from '../../../api/api.js'
export default {
  data() {
    return {  
      loading:true,
    }
  },
  methods: {
    getClusterResult(){
      getUserCluserResult(";").then(data => {

        let results = data.clusterUserResults
        let d = []
        console.log(1111)
        results.forEach((item,index)=>{
            let classification = parseInt(item.classification)
            //未初始化
            if(typeof(d[classification])=="undefined"){
              d[classification] = []
            }else{
              d[classification].push(item.values)
            }
        })
        document.getElementById("user").style.height = document.body.offsetHeight * 0.7+"px"
        document.getElementById("user").style.width = document.body.offsetWidth * 0.7+"px"
        let chart = echarts.init(document.getElementById('user'))
        chart.setOption(this.generateOption(d))
        this.loading = false
      })  
    },
    randomColor(){
      return '#'+Math.floor(Math.random()*0xffffff).toString(16);
    },
    generateOption(json){
      let series = []
      json.forEach((item,index)=>{
        series[index] = {
          type: 'scatter3D',
          color:this.randomColor(),
          symbolSize: 10,
          data:item,
          itemStyle: {
                opacity: 1
          }
        }
      })
      let option = {
        grid3D: {},
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        title: {
          text: '用户聚类',
          top: "3%",
          x: "center"
        },
         grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        series:series,
      }
      return option
    },
  },
  mounted(){
    this.getClusterResult()
    // document.getElementById("user").style.height = document.body.offsetHeight * 0.6+"px"
    // document.getElementById("user").style.width = document.body.offsetWidth * 0.6
    // var chart = echarts.init(document.getElementById('user'))
    // let json  = [    
    //   [[-1, -1, -1], [0, 0, 0], [1, 1,1]],
    //   [[2, 2, 2], [3, 3, 3], [4, 4, 5]],
    // ]
    // chart.setOption(this.generateOption(json))
  }
}
</script>

<style scoped>
  .box-card{
  
  }
  .line{
    text-align: center;
  }
  .box-card{
    margin-top: 20px;
  }
</style>

