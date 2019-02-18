<template>
  <div class="wrap">
    <div class="content" v-if="allData">
      <div  v-for="item in datas"  :class="!item.finish?'item':'item item-done'">
        <div class="item-content">{{item.content}}</div>
          <div class="item-right">
              <div class="item-d">
                  <img src="../assets/img/de-a.png" class="content-delete"  alt="" @click="todoDelete(item)" >
                  <img src="../assets/img/recycle-a.png" class="content-done"  alt="" @click="todoRecycle(item)">
              </div>
                <div class="item-time">{{item.time}}</div>
          </div>
      </div>
    </div>
    <div class="content" v-else>
      <div  v-for="item in searchDatas"  :class="!item.finish?'item':'item item-done'">
        <div class="item-content">{{item.content}}</div>
          <div class="item-right">
              <div class="item-d">
                  <img src="../assets/img/de-a.png" class="content-delete"  alt="" @click="todoDelete(item)" >
                  <img  src="../assets/img/recycle-a.png" class="content-done"  alt="" @click="todoRecycle(item)">
              </div>
                <div class="item-time">{{item.time}}</div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
  data() {
    return{
      newData:{
        content:"",
        time:"",
        finish:0,
        recycle:0
      },
      myDB:{
        name:'todos',
        version:3,
        db:null
      },
      datas:[],
      searchDatas:[],
      allData:true
    }
  },
  watch:{
    value(newValue){
      console.log(newValue)
      this.changeTime(newValue);
    },
    searchData(newData){
      this.search(newData);
    }
  },
  computed:{
    value(){
      return this.$store.state.value;
    },
    searchData(){
      return this.$store.state.searchData;
    }
  },
  mounted() {
    this.init(this.myDB.name,this.myDB.version);
  },
  beforeDestroy(){
    this.myDB.db.close();
  },
  methods: {
      search(newData){
        this.allData=false;
        if(newData==""){
          this.allData=true;
        }else{
            this.searchDatas=this.datas;
            var arr=[];
            this.searchDatas.forEach(item=>{
              var reg =  new RegExp(newData);//正则
                  if (reg.test(item.content)) {
                    arr.push(item);
                }
          })
          this.searchDatas=arr;
        }
    },
    changeTime(newValue){
        this.allData=false;
        this.searchDatas=this.datas;
        var arr=[];
        this.searchDatas.forEach(item=>{
          var t=item.time.split(" ")[0];
          if(newValue==t){
            arr.push(item);
          }
      })
          this.searchDatas=arr;
    },
    addData(){
      var that=this;
      this.newData.time=new Date().format("yyyy-MM-dd hh:mm:ss");
      var db=this.myDB.db; 
      var tt=db.transaction('students','readwrite'); 
      var store=tt.objectStore('students'); 
      store.add(that.newData).onsuccess = function (event) {
          that.newData={
            content:"",
            time:"",
            finish:0,
            recycle:0
          }
          that.datas=[];
          that.readAll();
      };
      // store.onerror = function (event) {
      //   console.log('数据写入失败');
      // }
    },
    init(name,version){
      var that=this;    
      var version=version || 1;
      var request=window.indexedDB.open(name,version);
      request.onerror=function(e){
          console.log(e.currentTarget.error.message);
      };
      request.onsuccess=function(e){
          that.myDB.db=e.target.result;
          that.readAll();
      };
      request.onupgradeneeded=function(e){
        console.log(e.target.result)
                that.myDB.db=e.target.result;
                if(!that.myDB.db.objectStoreNames.contains('students')){
                    that.myDB.db.createObjectStore('students',{keyPath: 'id',autoIncrement: true});
                }
                //console.log('DB version changed to '+version);
      };

    },
    //加载所有数据
    readAll() {
      this.allData=true;
      var that=this;
      var objectStore = that.myDB.db.transaction('students').objectStore('students');
        objectStore.openCursor().onsuccess = function (event) {
          var cursor = event.target.result;
          if (cursor) {
            if(cursor.value.recycle==1){
              that.datas.push(cursor.value)
            }
            cursor.continue();
          } else {
            that.datas.reverse();
            console.log('没有更多数据了！');
          }
          
        };
    
      },
      //更新
    todoDelete(item){
            var that=this;
            var transaction=this.myDB.db.transaction("students",'readwrite'); 
            var store=transaction.objectStore("students"); 
            store.delete(item.id).onsuccess = function (event) {
                    that.datas=[];
                    that.readAll();
            };
    },
    todoRecycle(item){
        var that=this;
        var done=document.querySelector(".content-done");
             var transaction=this.myDB.db.transaction("students",'readwrite'); 
            var store=transaction.objectStore("students"); 
            item.recycle=0;
            var request=store.put(item); 
            request.onsuccess=function(e){ 
                    that.datas=[];
                    that.readAll();
            };
    }
  }
};
</script>
<style scoped lang="scss">
  .wrap{
    padding: 10px;
    .header-top{
      width: 100%;
    }
    .content{
      margin-top: 10px;
      border-top: 1px solid #e5e9ef;
      .item{
        border-bottom: 1px solid #e5e9ef;
        overflow: hidden;
        height: 40px;
        &.item-done{
            background: #ffdca3;
            &>.item-content{
              text-decoration: line-through;
            }

          }
        .item-content{
          float: left;
          height: 40px;
          line-height: 40px;
          font-size: 14px;

        }
        .item-right{
          float: right;
          height: 40px;
          p{
            font-size: 10px;
          }
          .item-d{
            //float: right;
            margin-top: 2px;
            img{
              margin-left: 10px;
              width: 16px;
              cursor: pointer;
              &.content-delete{
                margin-left: 40px;
              }
            }
          }
          .item-time{
            font-size: 12px;
            color: #333;
          }

        }
      }
      .item:hover{
        background: rgb(255, 241, 219);
      }
    }
  }
</style>