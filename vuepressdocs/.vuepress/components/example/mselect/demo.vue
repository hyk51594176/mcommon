<template>
  <ul class="demo-select">
    <li class="li">
      <label>基本用法</label>
      <m-select v-model="value" :data-list="dataList" ></m-select>
    </li>
    <li class="li">
      <label>异步获取数据</label>
      <m-select v-model="value"  :get-list="getList"></m-select>
    </li>
    <li class="li">
      <label>远程搜索</label>
      <m-select v-model="value"  :get-list="remoteMethod" remote></m-select>
    </li>
    <li class="li">
      <label>扩展事件</label>
      <m-select
        v-model="value"
        @selectList="setSelectList"
        @currentObj="currentObj"  
        :get-list="getList"
        :params='params'
      ></m-select>
    </li>
    <li class="li">
      <label>自定义模板</label>
      <m-select v-model="value" :data-list="dataList"   :custom-render="customRender"></m-select>
    </li>

    
    <li class="li">
      <label>禁用</label>
      <m-select v-model="value" :data-list="dataList"   :custom-render="customRender" disabled></m-select>
    </li>
    <li class="li">
      <label>基础多选</label>
      <m-select v-model="value1" multiple :data-list="dataList" ></m-select>
    </li>
    <li class="li">
      <label>基础多选自定义模板</label>
      <m-select
        v-model="value1"
        multiple
        :data-list="dataList"
        :custom-render="customRender"
        collapse-tags
      ></m-select> 
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      value: null,
      value1: [],
      dataList: [
        {
          value: "选项1",
          label: "黄金糕",
          disabled: true
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      params:{
        id:1
      }
    };
  },
  methods: {
    customRender(h, item) {
      return (
        <div>
          <span style="float: left">{item.label}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">
            {item.value}
          </span>
        </div>
      );
    },
    getList(params) {
      console.log('getList 参数',params)
      return  new Promise(reslove=>{
        setTimeout(()=>{
           reslove(this.dataList)
        },2000)
      })
    },
     remoteMethod(params) {
      console.log('remoteMethod 参数',params)
      return  new Promise(reslove=>{
        setTimeout(()=>{
          if(params.keyWord){
           reslove(this.dataList)
          }else{
           reslove([])
          }
        },2000)
      })
    },
    setSelectList(arr) {
       console.log('setSelectList',arr)
    },
    currentObj(obj) {
       console.log('currentObj',obj)
    }
  }
};
</script>
<style lang="scss">
.demo-select {
  .li {
    margin-bottom: 10px;
    display: flex;
  }
  label {
    width: 200px;
    text-align: right;
    padding: 0 8px;
  }
}
</style>
