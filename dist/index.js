!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Mcommon=t()}(this,function(){"use strict";var e={name:"MForm",props:{formData:{type:Object,default:function(){return{}}},noWrap:Boolean,labelWidth:{type:String,default:"100px"},columns:Array,size:String},watch:{formData:function(e,t){var n=this;e!==t&&this.$nextTick(function(e){return n.clearValidate()})}},methods:{validate:function(e){if(this.$refs.ruleForm)return this.$refs.ruleForm.validate(e)},resetFields:function(){if(this.$refs.ruleForm)return this.$refs.ruleForm.resetFields()},validateField:function(e,t){if(this.$refs.ruleForm)return this.$refs.ruleForm.validateField(e,t)},clearValidate:function(e){if(this.$refs.ruleForm)return this.$refs.ruleForm.clearValidate(e)},currentObj:function(e,t){this.$emit("currentObj",e,t)},inputChange:function(e,t){this.$emit("inputChange",e,t)},inputEnter:function(e){this.$emit("inputEnter",e)},selectList:function(e,t){this.$emit("selectList",e,t)}}},t=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-form",e._b({ref:"ruleForm",staticClass:"m-form",attrs:{model:e.formData,"label-width":e.labelWidth}},"el-form",e.$attrs,!1),e._l(e.columns,function(t){return n("el-col",{key:t.prop,attrs:{span:e.$store.getters.isMobile&&!e.noWrap?22:t.span||11}},[n("el-form-item",e._b({attrs:{"label-width":t.label?t.labelWidth||e.labelWidth:"10px"}},"el-form-item",t,!1),[e._t(t.prop,[n("m-item",{attrs:{column:t,row:e.formData}},["input"===t.el&&t.append&&t.appendCustom?n("template",{slot:t.prop+"_append"},[e._t(t.prop+"_append")],2):e._e()],2)],{column:t})],2)],1)}))};t._withStripped=!0;var n,l,o,r,i,a=(n={render:t,staticRenderFns:[]},o=void 0,r=!1,(i=("function"==typeof(l=e)?l.options:l)||{}).__file="/Users/hanyukai/work/githuab/mComponent/src/components/MForm.vue",i.render||(i.render=n.render,i.staticRenderFns=n.staticRenderFns,i._compiled=!0,r&&(i.functional=!0)),i._scopeId=o,i),u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},c={shortcuts:[{text:"今天",onClick:function(e){var t=new Date,n=new Date;e.$emit("pick",[n,t])}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",[t,t])}},{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}},{text:"最近六个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-15552e6),e.$emit("pick",[n,t])}},{text:"最近一年",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-31536e6),e.$emit("pick",[n,t])}}]},m={name:"MItem",props:{column:Object,row:Object},inheritAttrs:!1,data:function(){return{defaultTime:["00:00:00","23:59:59"]}},computed:{valueKey:function(){return this.column.valueKey?this.column.valueKey:{label:"label",value:"value"}},modelComputed:{get:function(){var e=null;try{e=this.getStrFunction("this.row."+this.column.prop)}catch(e){}return e},set:function(e){try{void 0===this.getStrFunction("this.row."+this.column.prop)?this.setRowKey(e):this.getStrFunction("this.row."+this.column.prop+" = value")}catch(t){this.setRowKey(e)}}}},watch:{column:{handler:function(e){this.formatValue()},deep:!0},row:{handler:function(e){this.formatValue()},deep:!0}},created:function(){this.formatValue()},methods:{getStrFunction:function(e){return new Function("return "+e).call(this)},setRowKey:function(e){if(this.column.prop&&this.row){var t=this.column.prop.split("."),n=t.shift(),l=t.length-1,o=l<0?e:this.row[n]||{},r=t.reduce(function(n,r){return t.indexOf(r)===l?(o[r]=e,o):(o[r]={},o[r])},o);this.$set(this.row,n,r)}},formatValue:function(){if(this.column&&"date-picker"===this.column.el&&("daterange"===this.column.type||"datetimerange"===this.column.type)){var e=this.row[this.column.prop];e?Array.isArray(e)||(this.row[this.column.prop]=e.split(",")):this.row[this.column.prop]=[]}},getParams:function(e){var t={};if(e.params&&"object"===u(e.params))for(var n in e.params){var l=void 0;try{l=this.getStrFunction("this.row."+e.params[n])}catch(e){}t[n]=void 0!==l?l:e.params[n]}return t},getpickerOptions:function(e,t){if("daterange"===e&&!1!==t)return c},currentObj:function(e,t){this.column.listeners&&this.column.listeners.currentObj||this.$emit("currentObj",e,t)},inputEnter:function(e){this.column.listeners&&this.column.listeners.inputEnter||this.$emit("inputEnter",e)}}},p=function(){var e=this,t=e.$createElement,n=e._self._c||t;return"input"===e.column.el?n("el-input",e._g(e._b({attrs:{placeholder:void 0!=e.column.placeholder?e.column.placeholder:e.column.label},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;t.stopPropagation(),e.inputEnter(e.column.prop)}},model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-input",e.column,!1),e.column.listeners),[e.column.append?n("div",{class:e.column.appendClass,attrs:{slot:"append"},slot:"append"},[e._t(e.column.prop+"_append",[n("div",{on:{click:function(t){e.btnClick({data:e.row,column:e.column,$event:t})}}},[n("i",{class:e.column.appendIcon}),e._v(" "+e._s(e.column.appendText)+"\n      ")])])],2):e._e()]):"select"===e.column.el?n("el-select",e._g(e._b({attrs:{filterable:"",placeholder:void 0!=e.column.placeholder?e.column.placeholder:e.column.label},model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-select",e.column,!1),e.column.listeners),e._l(e.column.list,function(t){return t.Value?n("el-option",{key:e.column.props?t[e.column.props.value]:t.Value,attrs:{label:e.column.Text?t[e.column.Text]:t.Text,value:e.column.bindObj?t:t.Value}}):e._e()})):"date-picker"===e.column.el?n("el-date-picker",e._g(e._b({attrs:{"default-time":e.column.defaultTime||e.defaultTime,placeholder:void 0!=e.column.placeholder?e.column.placeholder:e.column.label,"picker-options":e.column.pickerOptions||e.getpickerOptions(e.column.type,e.column.isNeedFast)},model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-date-picker",e.column,!1),e.column.listeners)):"input-number"===e.column.el?n("el-input-number",e._g(e._b({model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-input-number",e.column,!1),e.column.listeners)):"checkbox"===e.column.el?n("el-checkbox",e._g(e._b({model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-checkbox",e.column,!1),e.column.listeners),[e._v("\n  "+e._s(e.column.Text)+"\n")]):"checkbox-group"===e.column.el?n("el-checkbox-group",e._g(e._b({model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-checkbox-group",e.column,!1),e.column.listeners),e._l(e.column.dataList,function(t){return n("el-checkbox",e._b({key:t[e.valueKey.label],attrs:{label:e.column.props?t[e.column.props.value]:t[e.valueKey.value]}},"el-checkbox",e.column,!1),[e._v("\n    "+e._s(e.column.props?t[e.column.props.label]:t[e.valueKey.label])+"\n  ")])})):"radio"===e.column.el?n("el-radio-group",e._g(e._b({model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-radio-group",e.column,!1),e.column.listeners),e._l(e.column.dataList,function(t){return n("el-radio",e._b({key:t[e.valueKey.label],attrs:{label:e.column.props?t[e.column.props.value]:t[e.valueKey.value]}},"el-radio",e.column,!1),[e._v("\n    "+e._s(e.column.props?t[e.column.props.label]:t[e.valueKey.label])+"\n  ")])})):"cascader"===e.column.el?n("el-cascader",e._g(e._b({attrs:{filterable:"",placeholder:void 0!=e.column.placeholder?e.column.placeholder:e.column.label},on:{"active-item-change":function(t){e.btnClick({data:e.row,column:e.column,$event:t})}},model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-cascader",e.column,!1),e.column.listeners)):"switch"===e.column.el?n("el-switch",e._g(e._b({model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"el-switch",e.column,!1),e.column.listeners)):"mSelect"===e.column.el?n("m-select",e._g(e._b({attrs:{params:e.getParams(e.column)},model:{value:e.modelComputed,callback:function(t){e.modelComputed=t},expression:"modelComputed"}},"m-select",e.column,!1),e.column.listeners)):"tag"===e.column.el?n("el-tag",{attrs:{type:e.column.type}},[e._v(e._s(e.modelComputed))]):n("span",[e._v(e._s(e.modelComputed))])};p._withStripped=!0;var d=function(e,t,n,l,o,r,i,a){var u=("function"==typeof n?n.options:n)||{};return u.__file="/Users/hanyukai/work/githuab/mComponent/src/components/MItem.vue",u.render||(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,o&&(u.functional=!0)),u._scopeId=l,u}({render:p,staticRenderFns:[]},0,m,void 0,!1),h={name:"MSelect",props:{params:{type:Object,default:function(){return{}}},filterable:{type:Boolean,default:!0},clearable:{type:Boolean,default:!0},valueKey:{type:Object,default:function(){return{label:"label",value:"value"}}},nullRequest:Boolean,value:{type:[String,Boolean,Number,Array],default:""},dataList:Array,isDefault:Boolean,multiple:Boolean,showMsg:Boolean,getList:Function},inheritAttrs:!1,data:function(){return{list:[],currentValue:"",loading:!1,selectObj:{}}},watch:{params:{handler:function(e,t){e&&(t?Object.keys(e).some(function(n){return e[n]!==t[n]})&&(this.multiple?this.currentValue=[]:this.currentValue=null,this.pageInit()):this.pageInit())},deep:!0},value:function(e){this.setCurrentValue()},currentValue:function(e){this.$emit("input",e),this.getCurrentObj()},dataList:function(e){this.list=e},list:function(e){var t=this;this.isDefault&&e.length&&(this.currentValue||(this.currentValue=e[0][this.valueKey.value]));var n=e.filter(function(e){return e.checked});!n.length||this.currentValue||Array.isArray(this.currentValue)&&this.currentValue.length||(this.multiple?this.currentValue=n.map(function(e){return e[t.valueKey.value]}):this.currentValue=n[0][this.valueKey.value],this.getCurrentObj())}},created:function(){this.setCurrentValue(),this.dataList?this.list=this.dataList||[]:(this.dataList&&this.currentValue&&this.getCurrentObj(),this.params&&this.pageInit())},methods:{setCurrentValue:function(){this.multiple?Array.isArray(this.value)?this.currentValue=this.value:"string"==typeof this.value&&this.value?this.currentValue=this.value.split(","):this.currentValue=[]:this.currentValue=this.value},pageInit:function(){var e=this,t=Object.keys(this.params);if(t.length&&(t.some(function(t){return null===e.params[t]})&&!this.nullRequest))return;this.getData()},getCurrentObj:function(){var e=this;if(this.list.length){var t=null,n=this.valueKey.value;this.multiple?(t=[],this.currentValue.forEach(function(l){var o=e.list.find(function(e){return e[n]===l});o&&t.push(o)})):t=this.currentValue&&this.list.find(function(t){return t[n]===e.currentValue})||{},this.selectObj=t,this.$emit("currentObj",t)}},remoteMethod:function(e){void 0!==this.$attrs.remote&&!1!==this.$attrs.remote&&null!==this.$attrs.remote&&this.getData({keyWord:e})},getData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.getList&&(this.loading=!0,this.getList(s({},this.params,t),this.showMsg).then(function(t){var n=t.data,l=void 0===n?[]:n;if(l.length&&!e.multiple){if(e.currentValue)l.some(function(t){return t[e.valueKey.value]===e.currentValue})||(e.currentValue="");!e.currentValue&&e.isDefault&&(e.currentValue=l[0][e.valueKey.value])}e.list=l,e.getCurrentObj(),e.$emit("selectList",e.list),e.loading=!1}).catch(function(t){return e.loading=!1,Promise.reject(t)}))}}},f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-select",e._g(e._b({staticClass:"m-select",attrs:{loading:e.loading,"loading-text":"加载中",filterable:e.filterable,clearable:e.clearable,"remote-method":e.remoteMethod,multiple:e.multiple},on:{clear:e.remoteMethod},model:{value:e.currentValue,callback:function(t){e.currentValue=t},expression:"currentValue"}},"el-select",e.$attrs,!1),e.$listeners),e._l(e.list,function(t){return n("el-option",{key:t[e.valueKey.value],attrs:{label:t[e.valueKey.label],value:t[e.valueKey.value],disabled:t.disabled}})}))};f._withStripped=!0;var g=function(e,t,n,l,o,r,i,a){var u=("function"==typeof n?n.options:n)||{};return u.__file="/Users/hanyukai/work/githuab/mComponent/src/components/MSelect.vue",u.render||(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,o&&(u.functional=!0)),u._scopeId=l,u}({render:f,staticRenderFns:[]},0,h,void 0,!1),b={components:{MTableItem:{props:{row:Object,column:Object,index:Number},render:function(e){return e("div",[this.column.render?this.column.render.call(this,e,{row:this.row,column:this.column,$index:this.index}):this.column.format?this.column.format(this.row):this.row[this.column.prop]])}}},name:"MTable",props:{tableData:{type:Array,default:function(){return[]}},buttonWith:[String,Number],buttonLabel:{type:String,default:"操作"},layout:{type:String,default:"total,sizes,prev, pager, next, jumper"},showNum:{type:Boolean,default:!0},selectable:{type:Function},numFiexd:Boolean,showPage:{type:Boolean,default:!0},forced:Boolean,showsummary:{type:Boolean,default:!1},summarymethod:{type:Function},border:{type:Boolean,default:!0},stripe:{type:Boolean,default:!0},numTitle:{type:String,default:"序号"},total:Number,selection:{type:Boolean,default:!1},expand:Boolean,columns:{type:Array,default:function(){return[]}},page:{type:Object,default:function(){return{pageNum:1,pageSize:15}}},pageSizes:{type:Array,default:function(){return[15,30,45,60]}}},inheritAttrs:!1,computed:{list:function(){var e=this;return this.total||!this.showPage?this.tableData:this.tableData.filter(function(t,n){return n>=(e.page.pageNum-1)*e.page.pageSize&&n<e.page.pageNum*e.page.pageSize})},summaryProps:function(){return this.columns.filter(function(e){return e.isSummary}).map(function(e){return e.prop})},isShowSummary:function(){return this.columns.some(function(e){return e.isSummary})}},watch:{tableData:function(){(""===this.total||null===this.total||isNaN(this.total))&&(this.page.pageNum=1)}},methods:{getKey:function(e){return this.forced?(e||"")+Math.random()*Date.now():e},getColumns:function(e,t){var n=null;return e.listeners&&(n=Object.keys(e.listeners).reduce(function(n,l){return s({},n,function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},l,e.listeners[l].bind(null,t)))},{})),s({},e,{disabled:e.disabled||t.row.disabled,readonly:e.readonly||t.row.readonly,listeners:n})},summaryDefault:function(e){var t=this,n=e.columns,l=e.data,o=[];return n.forEach(function(e,n){if(0!==n){if(!(t.summaryProps.indexOf(e.property)<0)){var r=l.map(function(t){return Number(t[e.property])});r.every(function(e){return isNaN(e)})||(o[n]=r.reduce(function(e,t){var n=Number(t);return isNaN(n)?e:e+t},0)),o[n]=parseFloat(o[n]||0).toFixed(2),"currency"===e.className&&o[n]&&(o[n]=(o[n]+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")),"Percentage"===e.className&&o[n]&&(o[n]=o[n]+"%")}}else o[n]="合计"}),o},handleSizeChange:function(e){this.page.pageSize=e,this.$emit("pageChange",this.page)},handleCurrentChange:function(e){this.page.pageNum=e,this.$emit("pageChange",this.page)},toggleRowSelection:function(e){var t=this;e.forEach(function(e){t.$refs.commontable.toggleRowSelection(e)})},clearSelection:function(){this.$refs.commontable.clearSelection()},handleSelectionChange:function(e){this.$listeners["selection-change"]||this.$emit("selectionChange",e)},sortChange:function(e){this.$listeners["sort-change"]||this.$emit("sortChange",e)},rowClick:function(e,t,n){this.$listeners["row-click"]||this.$emit("rowClick",e,t,n)},cellClick:function(e,t,n){this.$listeners["cell-click"]||this.$emit("cellClick",e,t,n)},currentChange:function(e){this.$listeners["current-change"]||this.$emit("currentChange",e)},filtetag:function(e,t,n){return"function"==typeof e.filterMethod?e.filterMethod(e,t,n):n[e.prop]===t},goto:function(e){this.$emit("gotolink",e)},currentObj:function(e,t,n){this.$emit("currentObj",e.row,t,n,e.$index)}}},v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",e._g(e._b({ref:"commontable",attrs:{data:e.list,border:e.border,stripe:e.stripe,"summary-method":e.summarymethod||e.summaryDefault,"show-summary":e.isShowSummary},on:{"row-click":e.rowClick,"cell-click":e.cellClick,"selection-change":e.handleSelectionChange,"sort-change":e.sortChange,"current-change":e.currentChange}},"el-table",e.$attrs,!1),e.$listeners),[e.expand?n("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._t("expand",null,{row:t.row,$index:t.$index})]}}])}):e._e(),e._v(" "),e.selection&&e.list.length||e.$scopedSlots.checkbox?n("el-table-column",{attrs:{type:"selection",selectable:e.selectable,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e.$scopedSlots.checkbox?[e._t("checkbox",null,{row:t.row,$index:t.$index})]:void 0}}])}):e._e(),e._v(" "),e.showNum&&e.list.length?n("el-table-column",{attrs:{label:e.numTitle,align:"center",width:"60",fixed:e.numFiexd},scopedSlots:e._u([{key:"default",fn:function(t){return[e._t("mnum",[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.$index+1+(e.page.pageNum-1)*e.page.pageSize))])],{row:t.row,num:t.$index+1+(e.page.pageNum-1)*e.page.pageSize,$index:t.$index})]}}])}):e._e(),e._v(" "),e._t("default"),e._v(" "),e._l(e.columns,function(t){return[n("el-table-column",e._b({key:e.getKey(t.prop),attrs:{"class-name":t.className||t.el,align:t.align||"center","filter-method":t.filters?e.filtetag.bind(null,t):null},scopedSlots:e._u([{key:"default",fn:function(l){return[e._t(t.prop,[t.el?n("m-item",{attrs:{column:e.getColumns(t,l),row:l.row},on:{currentObj:function(t,n){return e.currentObj(l,t,n)}}}):n("m-table-item",{attrs:{row:l.row,column:t,index:l.$index}})],{row:l.row,$index:l.$index,column:t})]}}])},"el-table-column",t,!1))]}),e._v(" "),e.$scopedSlots.button?n("el-table-column",{attrs:{"header-align":"center",fixed:"right",width:e.buttonWith,label:e.buttonLabel},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row,l=t.$index;return[e._t("button",null,{row:n,$index:l})]}}])}):e._e()],2),e._v(" "),e._t("page",[e.showPage?n("el-pagination",{staticStyle:{"text-align":"right"},attrs:{"current-page":e.page.pageNum,"page-sizes":e.pageSizes,"page-size":e.page.pageSize,layout:e.layout,total:e.total||e.tableData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()])],2)};v._withStripped=!0;var y=function(e,t,n,l,o,r,i,a){var u=("function"==typeof n?n.options:n)||{};return u.__file="/Users/hanyukai/work/githuab/mComponent/src/components/MTable.vue",u.render||(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,o&&(u.functional=!0)),u._scopeId=l,u}({render:v,staticRenderFns:[]},0,b,void 0,!1);!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var l=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===n&&l.firstChild?l.insertBefore(o,l.firstChild):l.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".m-form{display:flex;flex-wrap:wrap}.el-date-editor--datetimerange.el-input,.el-date-editor--datetimerange.el-input__inner,.m-form,.m-select{width:100%}");var _=function e(t,n){if(!e.installed){if(!t.prototype.$ELEMENT)throw new Error("请先安装element-ui");t.component(a.name,a),t.component(d.name,d),t.component(g.name,g),t.component(y.name,y)}};return window.Vue&&_(window.Vue),{install:_,MForm:a,MItem:d,MSelect:g,MTable:y}});
