<template>

  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <el-button-group>
          <el-button icon="el-icon-upload"  @click="uploadForm.visible=true">上传日志</el-button>
          <el-button  icon="el-icon-delete" @click="deleteLogs()" :disabled="isLogEmpty">清空日志</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="8" v-show="!webLogEmpty">
        <el-tag id="logLen"></el-tag>
        <el-tag type="success" id="logRowCount"></el-tag>
      </el-col>   
    </el-row>
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
          prop="ip"
          label="客户端IP"
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
          prop="requestUrl"
          label="请求网址"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="httpMethod"
          label="请求方法"
          sortable
        >
        </el-table-column>
      <!--   <el-table-column
          prop="httpVersion"
          label="HTTP版本">
        </el-table-column> -->
        <el-table-column
          prop="status"
          label="状态码"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="sentByte"
          label="传输字节"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="agent"
          label="浏览器"
          sortable
        >
        </el-table-column>
      </el-table>
    </el-card>
   
   
    <el-dialog
      id="uploadLogDialog"
      title="上传日志"
      :visible.sync="uploadForm.visible"
    
      :modal-append-to-body.sync="uploadForm.modalShow"
      width="30%"
      >
       <el-upload
          ref="upload"
          style="margin: 0 auto;width:80%;"
          drag
          action=";"
          :limit="uploadForm.limit"
          :auto-upload="false"
          :file-list="fileList"
          :beforeUpload="beforeUpload"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadForm.visible = false">取 消</el-button>
        <el-button id="submitUploadLogBtn" type="primary"  @click="submitUpload()"   :loading="uploadLoading">确 定</el-button>
      </span>
    </el-dialog> 
  </div> 
</template>

<script>
import { youdao, baidu, google } from 'translation.js'
import {uploadWebLog} from '../../api/api.js'
import {getLog} from '../../api/api.js'
import {deleteLog} from '../../api/api.js'
import {uploadProcess} from '../../api/api.js'
export default {
  data() {
    return {
      webLogEmpty:true,
      isLogEmpty:true,
      logData:[
      ],
      table_loading:true,
      uploadLoading:false,

      uploadForm:{
         
          file:"",
          visible:false,
          modalShow:false,
          dialogWidth:"30%",
          limit:1,
          //上传地址
          importFileUrl:"http://116.56.129.93:8081/processMiningPlatform/rawlogAction/upload",
          //上传文件时要上传的额外参数
          upLoadData: {
               format: 'txt', 
               projectId:'',
          }
      },
      //上传的文件列表，注:目前只允许上传单条日志
      fileList: [],
    }
  },
  methods: {
    test(){

      baidu.translate('test').then(result => {
        console.log(result) // result 的数据结构见下文
      })
    },
    //获取存储在hdfs里的日志
    getLogsFromHDFS(){
      getLog(";").then(data => {
        this.table_loading = false
        this.logData = data.logs
       

        if( !(this.logData === [])){
          document.getElementById("logLen").innerHTML = "日志大小: "+data.fileLen        
          document.getElementById("logRowCount").innerHTML = "日志记录数: "+data.fileRowCount
          this.webLogEmpty = false
          this.isLogEmpty = false
        }
      })  
    },
    //上传日志
    beforeUpload(file) {   
            this.uploadForm.file = file     
              let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
              const extension = testmsg === 'txt' 

              const extension2 = testmsg === 'log'  
              const isLt2M = file.size / 1024 / 1024 < 10  
              if(file.size === 0){
                this.$notify.error({
                    title: '错误',
                    message: '文件为空，请检查'
                }) 
                  return  
              }
              if(!extension2 && !extension) {  
                this.$notify.error({
                  title: '错误',
                  message: '请上传文件格式为log或txt的日志'
                })  
              }else{
                let formData = new FormData()
                formData.append('file', file)
                this.uploadLoading = true
                //循环查看状态
               
                // let t = setInterval(function(){ 
                //   uploadProcess(":").then(data=>{
                //      console.log(data)
                //   })
                // }, 300)

                uploadWebLog(formData).then(data => {
                    this.uploadLoading = false
                    console.log(data)
                    //上传完成，清除循环事件
                    //clearInterval(t);
                    if(typeof(data)=="undefined"){
                      return
                    }
                    if(data.code == 1){
                      this.logData = data.logs
                      this.$notify({
                        title: '提示',
                        message: '上传日志成功！',
                        type: 'success'
                      })
                      this.getLogsFromHDFS()
                      this.uploadForm.visible = false
                    }
                   
                })

                this.isLogEmpty = (this.logs === [])
              }
              return extension
    },
    //上传文件
    submitUpload(){
      this.$refs.upload.submit()
    },
    //删除日志
    deleteLogs(){
      this.logData = []
      deleteLog(";").then(data => {
        if(data.code == 1){
          this.$notify({
              title: '提示',
              message: '删除日志成功！',
              type: 'success'
          })
        }else{
          this.$notify.error({
              title: '错误',
              message: '删除日志失败，请重试'
          }) 
        }
      })
    }
  },
  mounted(){
    this.test()
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

