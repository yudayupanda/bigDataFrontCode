<template>

  <div class="app-container">
    <el-card class="box-card">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="K-means 用户" name="first">
          <el-table
            v-loading="table_loading_1"
            :data="logData_1"
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
              label="用户标识"
              sortable
             >
            </el-table-column>
            <el-table-column
              prop="affair"
              label="特征表示"
              sortable
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="K-means 页面" name="second">
            <el-table
            v-loading="table_loading_2"
            :data="logData_2"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="50"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="pid"
              label="页面标识"
              sortable
             >
            </el-table-column>
            <el-table-column
              prop="affair"
              label="事务"
              sortable
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Apriori 页面" name="third">
          <el-table
            v-loading="table_loading_3"
            :data="logData_3"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              width="100"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="affair"
              label="事务"
              sortable
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div> 
</template>

<script>
import {getClusterUserAffair} from '../../../api/api.js'
export default {
  data() {
    return {  
      activeName:'first',
      logData_1:[
      ],
      logData_2:[
      ],
      logData_3:[
      ],
      table_loading_1:true,
      table_loading_2:true,
      table_loading_3:true,
    }
  },
  methods: {
    //获取存储在hdfs里的日志
    getLogsFromHDFS(){
      getClusterUserAffair(";").then(data => {
        this.table_loading_1 = false
        this.logData_1 = data.clusterUserAffair
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

