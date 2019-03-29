<template>

  <div class="app-container">
    <el-card class="box-card" style="width: 50%;">
      <el-table
        v-loading="table_loading"
        :data="logData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="100"
          sortable
        >

        </el-table-column>
        <el-table-column
          prop="itemSet"
          label="频繁项集"
          sortable
         >
        </el-table-column>
      </el-table>
    </el-card>
  </div> 
</template>

<script>
import {getFrequentItemSet} from '../../../../api/api.js'
export default {
  data() {
    return {
      table_loading:false,
      logData:[],
    }
  },
  methods: {
  },
  mounted(){
   getFrequentItemSet(";").then(data => {
      this.logData = data.logs
   })

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

