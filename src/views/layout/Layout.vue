<template>
  <div class="app-wrapper" :class="classObj">
    <div class="heard">基于Hadoop的Web日志分析系统</div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container" style="z-index:0;width:200px;"></sidebar>
  
<!--     <navbar id="navbar" style="position:fixed; 
    left:180px; right: 0px;
    top:50px;"></navbar>
     <app-main  id="main" style="position:fixed; 
    left:180px; right: 0px;bottom: 10px;
    top:100px;overflow-y: auto;"></app-main> -->
    
    <div class="main-container" style="position:fixed; 
    left:0px; right: 0px;bottom: 10px;
    top:50px;overflow-y: auto;min-height: 90%;">
        <navbar id="navbar" ></navbar>
      <app-main ></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      //  alert(111)
      // let navbar = document.getElementById("navbar")
      // navbar.style.left = 36+"px"
      // let main = document.getElementById("main")
      // main.style.left = 36+"px"

      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .heard{
    color:#FCFCFC;
    line-height: 50px;
    text-align: center;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    font-size: 24px;
    height: 50px;
    width: 100%;
    background-color: rgb(23, 44, 69);
    position:fixed; 
    left:0px; 
    top:0px; 
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
