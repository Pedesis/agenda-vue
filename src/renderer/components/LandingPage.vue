<template>
  <div class="content">
    <div class="settings"></div>
    <ul>
      <li v-for="item,index in datas" @click="router(item.path,index)" :class="{li_active:index==selectNav2}">
        <a href="javascript:;">
            <i class="content-img">
              <img :src="'static/img/'+item.img" alt="" class="side-img">
            </i>
            <span class="nav-text">
                {{item.name}}
            </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return{
    selectNav2:-1,
    datas: [
      {
        img: "home.png",
        name: "首页",
        path:"/"
      },
      {
        img: "nofinish.png",
        name: "未完成",
        path:"/Nofinished"
      },
      {
        img: "finished.png",
        name: "已完成",
        path:"/finished"
      },
      {
        img: "recycle.png",
        name: "回收站",
        path:"/recycle"
      },
      {
        img: "important.png",
        name: "important",
        path:"/important"
      },
    ]

    }

  },
  methods: {
    router(params,index){
      this.selectNav2 = index;
      this.$router.push({path:params})
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background:#F7F7F7;
  border-right:1px solid #e5e5e5;
  position: fixed;;
  top:0;
  bottom:0;
  height:100%;
  left:0;
  width:55px;
  overflow:hidden;
  -webkit-transition:width .2s linear;
  transition:width .2s linear;
  -webkit-transform:translateZ(0) scale(1,1);
  box-shadow: 1px 0 15px rgba(0, 0, 0, 0.07);
  opacity:1;
  .settings{
      height:80px;
      float:left;
      background-repeat:no-repeat;
      width:250px;
      margin:0px;
    text-align: center;
    font-size:20px;
  }
  &>ul{
    margin:80px 0 0 0;
    li{
      position:relative;
      display:block;
      width:250px;
      height: 40px;
      line-height: 40px;
      a {
        position:relative;
        width:255px;
        display:table;
        border-collapse:collapse;
        border-spacing:0;
        color:#959595;
        font-size: 14px;
        text-decoration:none;
        -webkit-transform:translateZ(0) scale(1,1);
        -webkit-transition:all .14s linear;
        transition:all .14s linear;
        font-family: 'Strait', sans-serif;
        border-top:1px solid #F0F0F0;
        box-shadow:inset 0 1px 1px #FAFAFA;
        text-shadow: 1px 1px 1px  #fff;
        .content-img{
          width: 50px;
          height: 40px;
          display: inline-block;
          text-align: center;
          .side-img{
          width:16px;
          height:16px;
          //display: inline-block;
        } 
        }
        }
    }
  }
}
 li:hover>a{
color:#fff;
background-color:#00bbbb;
text-shadow: 0px 0px 0px; 
}
.li_active{
  background-color:#00bbbb;
}
.content:hover{
  width: 250px;
  opacity: 1;
}
</style>
