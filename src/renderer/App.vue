<template>
  <div id="app">
        <landing-page></landing-page>
    <div class="center-side">
      <router-view></router-view>
    </div>
    <div class="right-side">
      <Search></Search>
    </div>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'
  import Search from '@/components/Search'
  export default {
    name: 'my-project',
    components: {
      LandingPage,
      Search
    }
  }
</script>

<style lang="scss">
@import './assets/scss/common.scss';
html,body{
  margin:0;
  padding:0;
  width: 100%;
  height: 100%;
}
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
#app{
  width: 100%;
  position: relative;
  height: 100%;
}
.center-side{
  margin: 0 280px 0 55px;
  white-space:normal;
  word-break:break-all;
  word-wrap:break-word; 
}
.right-side{
  position: fixed;
  right: 0;
  top: 0;
  margin-left: 10px;
  width: 280px;
  height: 100%;

}

  /* CSS */
</style>
