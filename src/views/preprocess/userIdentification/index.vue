<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        v-loading="table_loading"
        :data="logData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          sortable
        >

        </el-table-column>
        <el-table-column
          prop="uid"
          label="用户识别码"
          sortable
         >
        </el-table-column>
        <el-table-column
          prop="time"
          label="请求时间"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="urlId"
          label="请求网址识别码"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="httpMethod"
          label="请求方法"
          sortable
        >
        </el-table-column>
      
      </el-table>
    </el-card>
  </div> 
</template>

<script>

import {getUserLog} from '../../../api/api.js'

export default {
  data() {
    return {
      isLogEmpty:true,
      logData:[
      ],
      table_loading:true,

    }
  },
  methods: {
    //获取存储在hdfs里的日志
    getLogsFromHDFS(){
      getUserLog(";").then(data => {
        this.table_loading = false
        this.logData = data.logs
      })  
    },
  },
  mounted(){
    this.getLogsFromHDFS()
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .box-card{
    margin-top: 20px;
  }
</style>

