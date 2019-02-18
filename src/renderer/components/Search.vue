<template>
  <div id="left-side">
    <div class="search-title">搜索</div> 
    <div class="search-content">
      <input class="input-search" v-model="searchData">
      <div class="div-search" @click="search">搜索</div>
    </div>
    <div id="time"></div>
  </div>
</template>
<script>
export default {
  //name: "landing-page",
  data() {
    return {
      //value:this.$store.state.value,
      searchData:"",
    };
  },
  // watch:{
  //   value(newValue){
  //     console.log(newValue);
  //     this.$store.state.value=newValue;
  //   }
  // },
  computed:{

  },
  mounted(){
    this.getDate();
  },
  methods: {
    search(){
      this.$store.state.searchData=this.searchData;
      this.searchData="";
    },
    getDate(){
      var that=this;
      laydate.render({
        elem: '#time',
        position: 'static',
        btns: ['clear', 'now'],
        change: function(value, date){ //监听日期被切换
           that.$store.state.value=value;
          }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#left-side {
  width: 100%;
  height: 100%;
  //background: #F7F7F7;
}
.search-title{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background: #f0f0f0;
  margin-top: 10px;
  padding-left: 10px;
  font-weight: bold;
  border: 1px solid #d4d9dd;
}
.search-content{
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  .input-search{
    display: inline-block;
    width: 79%;
    height: 30px;
    margin-right: 1%;
    float: left;
    border: 1px solid #d4d9dd;
    box-shadow: inset 0 3px 3px #ebebeb;
    line-height: 30px;
  }
  .div-search{
    display: inline-block;
    width: 20%;
    height: 30px;
    line-height: 30px;
    background-color: #2692ff;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
  }
}

#time{
  width: 100%;
}
</style>
