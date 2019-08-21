!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("sortablejs")):"function"==typeof define&&define.amd?define(["sortablejs"],t):e.mcommon=t(null)}(this,function(e){"use strict";function t(e,t){var n=t.column,r=t.row,i=void 0===r?{}:r,o=t.$index,l=null,a=this.scopedSlots||this.$scopedSlots;return n.prop&&a[n.prop]&&(l=a[n.prop]({row:i,column:n,$index:o})),l||e("MItem",{props:{row:i,column:n,$index:o}})}e=e&&e.hasOwnProperty("default")?e.default:e;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e,n){var r={span:24},o=this.props,l=o.noWrap,a=o.model,u=o.formData,s=o.labelWidth;return l&&(r={}),e("el-col",{props:i({span:11,xs:r},n),key:n.prop},[e("el-form-item",{props:i({},n,{labelWidth:n.label||n.labelWidth?n.labelWidth||s:"10px"})},[t.call(this,e,{column:n,row:a||u})])])},l={functional:!0,name:"MForm",props:{formData:Object,columns:Array,model:Object,elRow:Object,noWrap:Boolean},render:function(e,t){return t.props.formData&&(t.data.attrs.model=t.props.formData),t.data.attrs.labelWidth||(t.data.attrs.labelWidth="100px"),e("el-form",t.data,[function(e){var t=this,n=this.props,r=n.columns,i=void 0===r?[]:r,l=n.elRow;return e("el-row",{props:l},i.map(function(n){return o.call(t,e,n)}))}.call(t,e)])}},a={name:"MItem",props:{row:{type:Object,required:!0},column:{type:Object,required:!0},$index:Number},data:function(){return{isForce:!1}},watch:{row:function(e,t){this.$parent.clearValidate&&e!==t&&this.$nextTick(this.$parent.clearValidate)}},computed:{computedColumn:function(){return i({},this.column,this.column.getColumn&&this.column.getColumn(this.row)||{})},componentType:function(){var e=this.computedColumn.el;return e?"mSelect"===e||"MSelect"===e||"select"===e||"el-select"===e?"m-select":e.startsWith("el-")?e:"el-"+e:null},valueKey:function(){return this.computedColumn.valueKey?this.computedColumn.valueKey:{label:"label",value:"value"}},modelComputed:{get:function(){var e=null;try{e=this.getStrFunction("this.row."+this.column.prop)}catch(e){this.setRowKey(null)}return"currency"===this.column.type&&e?this.isForce?e:this.currency(e,this.column.currency,this.column.decimals):e},set:function(e){if(this.computedColumn.rules){(Array.isArray(this.computedColumn.rules)?this.computedColumn.rules.some(function(e){return"number"===e.type}):"number"===this.computedColumn.rules.type)&&!isNaN(e)&&"el-input"===this.componentType&&(e=Number(e))}"currency"===this.computedColumn.type&&(e=isNaN(e)?0:Number(e));try{void 0===this.getStrFunction("this.row."+this.computedColumn.prop)?this.setRowKey(e):this.getStrFunction("this.row."+this.computedColumn.prop+" = value")}catch(t){this.setRowKey(e)}}}},methods:{getStrFunction:function(e){return e=e.replace(/(\.\d)/g,"[$1]").replace(/\.\[/g,"["),new Function("return "+e).call(this)},setRowKey:function(e){if(this.computedColumn.prop&&this.row){var t=this.computedColumn.prop.replace(/\[(\w+)\]/g,".$1").replace(/^\./,"").split("."),n=t.shift(),r=t.length-1;if(r>=0){var i=this.row[n]||{},o=t.reduce(function(t,n,o){return o===r?(t[n]=e,i):(t[n]||(t[n]={}),t[n])},i);this.$set(this.row,n,JSON.parse(JSON.stringify(o)))}else this.$set(this.row,n,e)}},getParams:function(){var e={};if(this.computedColumn.params&&"object"===n(this.computedColumn.params))for(var t in this.computedColumn.params){var r=void 0;try{r=this.getStrFunction("this.row."+this.computedColumn.params[t])}catch(e){}e[t]=void 0!==r?r:this.computedColumn.params[t]}return e},currency:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"¥",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;if(e=parseFloat(e),!isFinite(e)||!e&&0!==e)return"";t=null!=t?t:"",n=null!=n?n:2;var r=Math.abs(e).toFixed(n),i=n?r.slice(0,-1-n):r,o=i.length%3,l=o>0?i.slice(0,o)+(i.length>3?",":""):"",a=n?r.slice(-1-n):"";return(e<0?"-":"")+t+l+i.slice(o).replace(/(\d{3})(?=\d)/g,"$1,")+a}},render:function(e){var t=this,n=this.row,r=this.$index,o=this.computedColumn,l=this.modelComputed,a=this.componentType,u=this.valueKey,s=this.getParams;if(a){var c=void 0!==o.placeholder?o.placeholder:o.label,p=i({},o.listeners||{},{input:function(e){t.modelComputed="el-input"===a?e.trim():e,o.listeners&&o.listeners.input&&o.listeners.input(e)}});o.listeners&&o.listeners.currentObj&&(p.currentObj=function(e){return o.listeners.currentObj(e,n,r)});if(["m-select","el-checkbox-group","el-radio-group"].includes(a)){var h="";"button"===o.type&&(h="-button");var d="m-select"!==a?function(e,t,n,r){return(n.dataList||n.list||[]).map(function(o){var l=void 0;return l=n.slots&&n.slots.default?[n.slots.default.call(null,e,o)]:o[r.label],e(t,{props:i({},n,{label:n.props?o[n.props.value]:o[r.value]}),key:o[r.label]},l)})}(e,"el-checkbox-group"===a?"el-checkbox"+h:"el-radio"+h,o,u):null;return e(a,{props:i({},o,{placeholder:c,params:"m-select"===a?s(o):null,value:l,customRender:o.slots&&o.slots.default?o.slots.default:null}),attrs:o,on:p},d)}"el-input"===a&&"currency"===o.type&&(p.blur=function(){var e;t.isForce=!1,o.listeners&&o.listeners.blur&&(e=o.listeners).blur.apply(e,arguments)},p.focus=function(){var e;t.isForce=!0,o.listeners&&o.listeners.focus&&(e=o.listeners).focus.apply(e,arguments)});var m=o.slots||{},f=[],g={};return Object.keys(m).forEach(function(t){var n=null;"function"==typeof m[t]?g[t]=m[t].bind(null,e):((n=m[t]).data=i({},n.data||{},{slot:t}),f.push(n))}),e(a,{props:i({},o,{filterable:!0,value:l,options:o,label:"el-checkbox"===a||"el-radio"===a?null:o.label}),attrs:{placeholder:c},scopedSlots:g,on:p},f)}return("function"==typeof o.render?o.render(e,{row:n,computedColumn:o,$index:r}):o.render)||e("span",{class:"item-container",style:{"word-break":"break-all",display:"inline-block"}},o.format?o.format(n):l)}},u=function(e){return Object.prototype.toString.call(e).slice(8,-1)},s={name:"MSelect",props:{params:{type:Object,default:function(){return{}}},valueKey:{type:Object,default:function(){return{label:"label",value:"value"}}},nullRequest:Boolean,value:{type:[String,Boolean,Number,Array],default:""},dataList:Array,multiple:Boolean,showMsg:Boolean,getList:Function,customRender:Function},data:function(){return{list:[],currentValue:"",loading:!1,selectObj:{}}},watch:{params:function(e,t){(function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return t!==n&&(u(t)!==u(n)||null===t||null===n||("Array"===u(t)?t.length!==n.length||t.some(function(t,i){return e(t,n[i],r)}):"Object"===u(t)?r?t[r]!==n[r]:Object.keys(t).some(function(i){return e(t[i],n[i],r)}):"Date"!==u(t)||t.getTime()!==n.getTime()))})(e,t)&&this.pageInit()},value:function(e){this.setCurrentValue()},currentValue:function(e){this.$emit("input",e),this.getCurrentObj()},dataList:function(e){this.list=e},list:function(e){var t=this;this.changeCurrentValue();var n=e.filter(function(e){return e.checked});!n.length||this.currentValue||Array.isArray(this.currentValue)&&this.currentValue.length||(this.multiple?this.currentValue=n.map(function(e){return e[t.valueKey.value]}):this.currentValue=n[0][this.valueKey.value])}},created:function(){this.setCurrentValue(),this.dataList?this.list=this.dataList||[]:(this.dataList&&this.currentValue&&this.getCurrentObj(),this.params&&this.pageInit())},methods:{setCurrentValue:function(){this.multiple?Array.isArray(this.value)?this.currentValue=this.value:"string"==typeof this.value&&this.value?this.currentValue=this.value.split(","):this.currentValue=[]:this.currentValue=this.value},changeCurrentValue:function(){var e=this;this.list.length?this.multiple?this.currentValue&&this.currentValue.length&&(this.currentValue=this.currentValue.filter(function(t){return e.list.some(function(n){return n[e.valueKey.value]===t})})):null!==this.currentValue&&void 0!==this.currentValue&&""!==this.currentValue&&!this.list.some(function(t){return t[e.valueKey.value]===e.currentValue})&&(this.currentValue=null):this.multiple?this.currentValue=[]:this.currentValue=""},pageInit:function(){var e=this,t=Object.keys(this.params);if(t.length&&(t.some(function(t){return null===e.params[t]})&&!this.nullRequest))return;this.getData()},getCurrentObj:function(){var e=this;if(this.list.length){var t=null,n=this.valueKey.value;this.multiple?(t=[],this.currentValue.forEach(function(r){var i=e.list.find(function(e){return e[n]===r});i&&t.push(i)})):t=this.currentValue&&this.list.find(function(t){return t[n]===e.currentValue})||{},this.selectObj=t,this.$emit("currentObj",t)}},remoteMethod:function(e){void 0!==this.$attrs.remote&&!1!==this.$attrs.remote&&null!==this.$attrs.remote&&this.getData({keyWord:e})},getData:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.getList&&(this.loading=!0,this.getList(i({},this.params,t),this.showMsg).then(function(t){var n=Array.isArray(t)?t:t.data||[];e.list=n,e.$emit("selectList",e.list),e.loading=!1}).catch(function(t){return e.list=[],e.loading=!1,Promise.reject(t)}))}},render:function(e){var t=this,n=this.list,r=this.valueKey,o=this.multiple,l=this.loading,a=this.currentValue,u=this.remoteMethod,s=this.$attrs,c=this.$listeners,p=this.customRender,h=i({},c,{clear:u,input:function(e){t.currentValue=e,c.input&&c.input(e)}}),d=i({},s);return delete d.valueKey,e("el-select",{props:i({loading:l,value:a,loadingText:"加载中",filterable:!0,clearable:!0,remoteMethod:u,multiple:o},d),style:{width:"100%"},on:h},[n.map(function(t){return e("el-option",{props:{label:t[r.label],value:t[r.value],disabled:t.disabled},key:t[r.value]},[p?p(e,t):null])})])}},c=function(e){var t=navigator.userAgent;return"ie"===e?!!(t.indexOf("compatible")>-1&&t.indexOf("MSIE")>-1)&&(new RegExp("MSIE (\\d+\\.\\d+);").test(t),parseFloat(RegExp.$1)):t.indexOf(e)>-1},p=function(e,t,n){var r=n.separator,i=n.quoted,o=t.map(function(e){return i?'"'+(e="string"==typeof e?e.replace(/"/g,'"'):e)+'"':e});e.push(o.join(r))},h={separator:",",quoted:!1},d={_isIE11:function(){var e=0,t=/MSIE (\d+\.\d+);/.test(navigator.userAgent),n=!!navigator.userAgent.match(/Trident\/7.0/),r=navigator.userAgent.indexOf("rv:11.0");return t&&(e=Number(RegExp.$1)),-1!==navigator.appVersion.indexOf("MSIE 10")&&(e=10),n&&-1!==r&&(e=11),11===e},_isEdge:function(){return/Edge/.test(navigator.userAgent)},_getDownloadUrl:function(e){if(window.Blob&&window.URL&&window.URL.createObjectURL){var t=new window.Blob(["\ufeff"+e],{type:"text/csv"});return URL.createObjectURL(t)}return"data:attachment/csv;charset=utf-8,\ufeff"+encodeURIComponent(e)},download:function(e,t){if(c("ie")&&c("ie")<10){var n=window.top.open("about:blank","_blank");n.document.charset="utf-8",n.document.write(t),n.document.close(),n.document.execCommand("SaveAs",e),n.close()}else if(10===c("ie")||this._isIE11()||this._isEdge()){var r=new Blob(["\ufeff"+t],{type:"text/csv"});navigator.msSaveBlob(r,e)}else{var i=document.createElement("a");i.download=e,i.href=this._getDownloadUrl(t),document.body.appendChild(i),i.click(),document.body.removeChild(i)}},format:function(e,t,n){n=Object.assign({},h,n);var r=[],i=e.map(function(e){return e.label});return p(r,i,n),t.forEach(function(t){Array.isArray(t)||(t=e.map(function(e){return void 0!==t[e.prop]?t[e.prop]:""})),p(r,t,n)}),r.join("\r\n")}},m=function e(n,r){var o=this,l=this.filtetag,a=this.getKey;return r.map(function(r,u){var s=r.children||[];return n("el-table-column",{props:i({},r,{className:r.className||r.el,align:r.align||"center",filterMethod:r.filters?l.bind(null,r):null}),key:a(r.prop),scopedSlots:{default:function(e){return function(e,n){var r=n.scope,i=n.column;n.index;return e("span",null,[t.call(this,e,{column:this.getColumns(i,r),row:r.row,$index:r.$index})])}.call(o,n,{scope:e,column:r,index:u})}}},e.call(o,n,s))})},f={name:"MTable",props:{tableData:{type:Array,default:function(){return[]}},buttonWidth:[String,Number],numWidth:[String,Number],buttonAlign:{type:String,default:"center"},pageOptions:Object,buttonFixed:{type:String,default:"right"},buttonLabel:{type:String,default:"操作"},reserveSelection:Boolean,layout:{type:String,default:"total,sizes,prev, pager, next, jumper"},showNum:{type:Boolean,default:!0},hideOnSinglePage:{type:Boolean,default:!0},selectable:{type:Function},numFiexd:Boolean,showPage:{type:Boolean,default:!0},forced:Boolean,showsummary:{type:Boolean,default:!1},summaryMethod:{type:Function},border:{type:Boolean,default:!0},stripe:{type:Boolean,default:!1},numTitle:{type:String,default:"序号"},total:Number,selection:{type:Boolean,default:!1},expand:Boolean,columns:{type:Array,default:function(){return[]}},page:{type:Object,default:function(){return{pageNum:1,pageSize:15,total:0}}},pageSizes:{type:Array,default:function(){return[15,30,45,60]}},mergeRow:{type:Array,default:function(){return[]}},mergeColumn:{type:Array,default:function(){return[]}},spanMethod:Function,sumText:{type:String,default:"合计"},pageAlign:{type:String,default:"right"},drop:Boolean},inheritAttrs:!1,computed:{cTotal:function(){var e=this.total||this.page.total;return e||this.tableData.length},list:function(){var e=this,t=this.total||this.page.total;return!this.showPage||t?this.tableData:this.tableData.filter(function(t,n){return n>=(e.page.pageNum-1)*e.page.pageSize&&n<e.page.pageNum*e.page.pageSize})},summaryProps:function(){return this.columns.filter(function(e){return e.isSummary}).map(function(e){return e.prop})},isShowSummary:function(){return this.columns.some(function(e){return e.isSummary})},mergeRowData:function(){var e=this;return this.mergeRow.length?this.mergeRow.reduce(function(t,n){var i=void 0;return t[n]=e.list.reduce(function(e,t,o){var l=r({row:1},n,t[n]);return 0!==o&&t[n]===e[o-1][n]?(l.row=0,e[i].row+=1):i=o,e.push(l),e},[]),t},{}):{}}},watch:{tableData:function(){var e=this.total||this.page.total;!e&&isNaN(e)&&(this.page.pageNum=1)}},methods:{toggleRowExpansion:function(){var e;(e=this.$refs.commontable).toggleRowExpansion.apply(e,arguments)},exportCsv:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.filename?-1===e.filename.indexOf(".csv")&&(e.filename+=".csv"):e.filename="table.csv";var t=[],n=[];e.columns&&e.data?(t=e.columns,n=e.data):(t=this.columns,"original"in e||(e.original=!0),n=e.original?this.tableData:this.list);var r=d.format(t,n,e);e.callback?e.callback(r):d.download(e.filename,r)},getKey:function(e){return this.forced?(e||"")+Math.random()*Date.now():e},getColumns:function(e,t){var n=null;return e.listeners&&(n=Object.keys(e.listeners).reduce(function(n,o){return i({},n,r({},o,e.listeners[o].bind(null,t)))},{})),i({},e,{disabled:e.disabled||t.row.disabled,readonly:e.readonly||t.row.readonly,listeners:n})},summaryDefault:function(e){var t=this,n=e.columns,r=e.data,i=[];return n.forEach(function(e,n){if(0!==n){if(!(t.summaryProps.indexOf(e.property)<0)){var o=r.map(function(t){return Number(t[e.property])});o.every(function(e){return isNaN(e)})||(i[n]=o.reduce(function(e,t){var n=Number(t);return isNaN(n)?e:e+t},0)),i[n]=parseFloat(i[n]||0).toFixed(2);var l=e.property,a=l?t.columns.find(function(e){return e.prop===l}):null;a&&i[n]&&(a.isCurrency&&(i[n]=(i[n]+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")),a.unit&&(i[n]=i[n]+a.unit))}}else i[n]=t.sumText}),i},handleSizeChange:function(e){this.page.pageSize=e,this.$emit("pageChange",this.page)},handleCurrentChange:function(e){this.page.pageNum=e,this.$emit("pageChange",this.page)},toggleRowSelection:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments[1];this.$nextTick(function(){t.forEach(function(t){e.$refs.commontable.toggleRowSelection(t,n)})})},clearSelection:function(){this.$refs.commontable.clearSelection()},filtetag:function(e,t,n){return"function"==typeof e.filterMethod?e.filterMethod(e,t,n):n[e.prop]===t},arraySpanMethod:function(e){var t=e.row,n=e.column,r=e.rowIndex,i=n.property?this.mergeRowData[n.property]:null,o=1,l=1;if(i&&(o=i[r].row),this.mergeColumn.length)if(this.mergeColumn.indexOf(n.property)>-1){var a=this.columns.map(function(e){return e.prop}),u=a.indexOf(n.property),s=!0;l=a.reduce(function(e,n,r){return r>u&&s&&(void 0===t[n]?e+=1:s=!1),e},1)}else n.property&&void 0===t[n.property]&&(l=0);return[o,l]},rowDrop:function(){var t=document.querySelector(".el-table__body-wrapper tbody"),n=this;e.create(t,{onEnd:function(e){var t=e.newIndex,r=e.oldIndex,i=JSON.parse(JSON.stringify(n.tableData)),o=i.splice(r,1)[0];i.splice(t,0,o),n.$emit("drop",i)}})}},render:function(e){return e("div",null,[function(e){var t=this,n=this.list,r=this.stripe,o=this.border,l=this.summaryMethod,a=this.summaryDefault,u=this.isShowSummary,s=this.$listeners,c=this.$attrs,p=this.expand,h=this.selection,d=this.selectable,f=this.showNum,g=this.reserveSelection,y=this.numTitle,v=this.numFiexd,b=this.numWidth,w=this.page,S=this.columns,x=this.buttonWidth,C=this.buttonAlign,O=this.buttonFixed,$=this.buttonLabel,j=this.mergeRow,V=this.mergeColumn,N=this.arraySpanMethod,M=this.spanMethod,A=[];if(p&&A.push(e("el-table-column",{props:{type:"expand"},key:"expand",scopedSlots:{default:this.$scopedSlots.expand?function(e){return t.$scopedSlots.expand(e)}:null}})),h&&n.length&&A.push(e("el-table-column",{props:{type:"selection",selectable:d,reserveSelection:g},key:"selection"})),f&&n.length){var R=function(e){return e.$index+1+(w.pageNum-1)*w.pageSize};A.push(e("el-table-column",{props:{label:y,align:"center",width:b||60,reserveSelection:g,fixed:v||S[0]&&S[0].fixed},key:"showNum",scopedSlots:{default:this.$scopedSlots.num?function(e){return t.$scopedSlots.mnum(i({},e,{num:R(e)}))}:function(e){return R(e)}}}))}this.$scopedSlots.button&&A.push(e("el-table-column",{props:{width:x,align:C||"center",fixed:O,label:$},key:"button",scopedSlots:{default:function(e){return t.$scopedSlots.button(e)}}}));var k=i({},s);return k.selectionChange&&(k["selection-change"]=k.selectionChange),e("el-table",{props:i({data:n,border:o,stripe:r,summaryMethod:l||a,showSummary:u,spanMethod:j.length||V.length?N:M},c),ref:"commontable",on:k},[].concat(A,this.$slots.default||[],m.call(this,e,S)))}.call(this,e),function(e){var t=this.showPage,n=this.pageAlign,r=this.page,o=this.pageSizes,l=this.layout,a=this.cTotal,u=this.handleSizeChange,s=this.handleCurrentChange,c=this.pageOptions,p=void 0===c?{}:c,h=this.hideOnSinglePage;return this.$scopedSlots.page?this.$scopedSlots.page():t?e("el-pagination",{props:i({currentPage:r.pageNum,pageSize:r.pageSize,pageSizes:o,layout:l,total:a,hideOnSinglePage:h},p),on:{"size-change":u,"current-change":s},style:{textAlign:n}}):null}.call(this,e)])},mounted:function(){this.drop&&this.rowDrop()}},g=function e(t){if(!e.installed){if(!t.prototype.$ELEMENT)throw new Error("请先安装element-ui");t.component(l.name,l),t.component(a.name,a),t.component(s.name,s),t.component(f.name,f)}};return window&&window.Vue&&g(window.Vue),{install:g,MForm:l,MItem:a,MSelect:s,MTable:f}});
