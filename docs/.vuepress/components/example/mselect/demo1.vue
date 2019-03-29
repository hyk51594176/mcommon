<template>
import { debug } from 'util';
  <ul class="demo-select">
    <li class="li">
      <label>基本用法</label>
      <m-select v-model="value" :data-list="dataList" :value-key="valueKey"></m-select>
    </li>
    <li class="li">
      <label>异步获取数据</label>
      <m-select v-model="value" :value-key="valueKey" :get-list="getList"></m-select>
    </li>
    <li class="li">
      <label>扩展事件</label>
      <m-select
        v-model="value"
        @selectList="selectList"
        @currentObj="currentObj"
        :value-key="valueKey"
        :get-list="getList"
      ></m-select>
    </li>
    <li class="li">
      <label>selectList事件：{{selectList}}</label>
      <label>currentObjt事件{{activeObj}}</label>
    </li>
    <br>
    <li class="li">
      <label>自定义模板</label>
      <m-select v-model="value" :data-list="dataList" :custom-render="customRender"></m-select>
    </li>
    <li class="li">
      <label>禁用</label>
      <m-select v-model="value" :data-list="dataList" :custom-render="customRender" disabled></m-select>
    </li>
    <li class="li">
      <label>基础多选</label>
      <m-select v-model="value1" multiple :data-list="dataList" :value-key="valueKey"></m-select>
    </li>
    <li class="li">
      <label>基础多选</label>
      <m-select
        v-model="value1"
        multiple
        :data-list="dataList"
        :custom-render="customRender"
        :value-key="valueKey"
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
      selectList:[],
      activeObj:null,
      valueKey: {
        label: "name",
        value: "id"
      },
      dataList: [
        {
          id: "选项1",
          name: "黄金糕",
          disabled: true
        },
        {
          id: "选项2",
          name: "双皮奶"
        },
        {
          id: "选项3",
          name: "蚵仔煎"
        },
        {
          id: "选项4",
          name: "龙须面"
        },
        {
          id: "选项5",
          name: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    customRender(h, item) {
      return (
        <div>
          <span style="float: left">{item.name}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">
            {item.id}
          </span>
        </div>
      );
    },
    getList() {
      return Promise.resolve(this.dataList);
    },
    selectList(arr) {
      console.log('select')
      this.selectList =arr
    },
    currentObj(obj) {
      this.activeObj = obj
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
    width: 150px;
    text-align: right;
    padding: 0 8px;
  }
}
</style>
