(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{322:function(e,t,n){"use strict";n.r(t);n(50);var a={data:function(){this.$createElement;return{tableData:[],columns:[{prop:"date",fixed:!0,sortable:!0,width:"120",renderHeader:function(e,t){return e("span",[e("i",{class:"el-icon-time"}),"日期"])}},{label:"配送信息",children:[{prop:"name",width:"120",render:function(e,t){return e("el-tag",[t.row.name])}},{label:"地址",children:[{prop:"province",label:"省份",width:"120"},{prop:"city",label:"市区",width:"120"},{prop:"address",label:"地址",sortable:!0,width:"300px",renderHeader:function(e,t){return e("span",[e("i",{class:"el-icon-location-outline"}),"地址"])}}]}]}]}},created:function(){for(var e=0;e<10;e++)this.tableData.push({date:"2016-05-".concat(e+1),name:"王小虎".concat(e+1),province:"上海",city:"普陀区",address:"上海市普陀区金沙江路 ".concat(e+1," 弄"),zip:200333})},methods:{selectChange:function(e){console.log(e)},toggleSelection:function(e){e?this.$refs.mtable.toggleRowSelection(e):this.$refs.mtable.clearSelection()}}},l=n(1),o=Object(l.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("m-table",{ref:"mtable",attrs:{"table-data":e.tableData,columns:e.columns,showPage:!1,selection:"",height:"400",showNum:!1},on:{"selection-change":e.selectChange},scopedSlots:e._u([{key:"date",fn:function(t){return[e._v(e._s(t.row.date))]}}])}),e._v(" "),n("br"),e._v(" "),n("el-button",{on:{click:function(t){return e.toggleSelection([e.tableData[1],e.tableData[2]])}}},[e._v("切换第二、第三行的选中状态")]),e._v(" "),n("el-button",{on:{click:function(t){return e.toggleSelection()}}},[e._v("取消选择")])],1)},[],!1,null,null,null);t.default=o.exports}}]);