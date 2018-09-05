'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('element-ui/lib/theme-chalk/cascader.css');
require('element-ui/lib/theme-chalk/base.css');
var _Cascader = _interopDefault(require('element-ui/lib/cascader'));
require('element-ui/lib/theme-chalk/col.css');
var _Col = _interopDefault(require('element-ui/lib/col'));
require('element-ui/lib/theme-chalk/tag.css');
var _Tag = _interopDefault(require('element-ui/lib/tag'));
require('element-ui/lib/theme-chalk/table-column.css');
var _TableColumn = _interopDefault(require('element-ui/lib/table-column'));
require('element-ui/lib/theme-chalk/table.css');
var _Table = _interopDefault(require('element-ui/lib/table'));
require('element-ui/lib/theme-chalk/form-item.css');
var _FormItem = _interopDefault(require('element-ui/lib/form-item'));
require('element-ui/lib/theme-chalk/form.css');
var _Form = _interopDefault(require('element-ui/lib/form'));
require('element-ui/lib/theme-chalk/date-picker.css');
var _DatePicker = _interopDefault(require('element-ui/lib/date-picker'));
require('element-ui/lib/theme-chalk/option.css');
var _Option = _interopDefault(require('element-ui/lib/option'));
require('element-ui/lib/theme-chalk/select.css');
var _Select = _interopDefault(require('element-ui/lib/select'));
require('element-ui/lib/theme-chalk/switch.css');
var _Switch = _interopDefault(require('element-ui/lib/switch'));
require('element-ui/lib/theme-chalk/checkbox-group.css');
var _CheckboxGroup = _interopDefault(require('element-ui/lib/checkbox-group'));
require('element-ui/lib/theme-chalk/checkbox.css');
var _Checkbox = _interopDefault(require('element-ui/lib/checkbox'));
require('element-ui/lib/theme-chalk/radio-group.css');
var _RadioGroup = _interopDefault(require('element-ui/lib/radio-group'));
require('element-ui/lib/theme-chalk/radio.css');
var _Radio = _interopDefault(require('element-ui/lib/radio'));
require('element-ui/lib/theme-chalk/input-number.css');
var _InputNumber = _interopDefault(require('element-ui/lib/input-number'));
require('element-ui/lib/theme-chalk/input.css');
var _Input = _interopDefault(require('element-ui/lib/input'));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'm-form',
  props: {
    formData: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    noWrap: Boolean,
    labelWidth: {
      type: String,
      default: '100px'
    },
    columns: Array,
    size: String
  },
  watch: {
    formData: function formData(v, ov) {
      var _this = this;

      if (v !== ov) this.$nextTick(function (_) {
        return _this.clearValidate();
      });
    }
  },
  methods: {
    validate: function validate(fn) {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.validate(fn);
    },
    resetFields: function resetFields() {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.resetFields();
    },
    validateField: function validateField(prop, fn) {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.validateField(prop, fn);
    },
    clearValidate: function clearValidate(propsArr) {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.clearValidate(propsArr);
    },
    currentObj: function currentObj(data, key) {
      this.$emit('currentObj', data, key);
    },
    inputChange: function inputChange(data, key) {
      this.$emit('inputChange', data, key);
    },
    inputEnter: function inputEnter(key) {
      this.$emit('inputEnter', key);
    },
    selectList: function selectList(data, key) {
      this.$emit('selectList', data, key);
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-form", _vm._b({
    ref: "ruleForm",
    staticClass: "coustm",
    attrs: { model: _vm.formData, "label-width": _vm.labelWidth }
  }, "el-form", _vm.$attrs, false), _vm._l(_vm.columns, function (column) {
    return _c("el-col", {
      key: column.prop,
      attrs: {
        span: _vm.$store.getters.isMobile && !_vm.noWrap ? 22 : column.span || 11
      }
    }, [_c("el-form-item", _vm._b({
      attrs: {
        "label-width": !column.label ? "10px" : column.labelWidth || _vm.labelWidth
      }
    }, "el-form-item", column, false), [_vm._t(column.prop, [_c("m-item", { attrs: { column: column, row: _vm.formData } }, [column.el === "input" && column.append && column.appendCustom ? _c("template", { slot: column.prop + "_append" }, [_vm._t(column.prop + "_append")], 2) : _vm._e()], 2)], { column: column })], 2)], 1);
  }));
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-19c2bf32_0", { source: "\n.el-form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-wrap: wrap\n}\r\n", map: { "version": 3, "sources": ["D:\\work\\myCommon/D:\\work\\myCommon\\src\\components\\mForm.vue"], "names": [], "mappings": ";AAmEA;EACA,YAAA;EACA,cAAA;EACA,eAAA;CACA", "file": "mForm.vue", "sourcesContent": ["<template>\r\n  <el-form class=\"coustm\" :model=\"formData\" ref='ruleForm' :label-width=\"labelWidth\" v-bind=\"$attrs\">\r\n    <el-col :span=\"($store.getters.isMobile && !noWrap)? 22:(column.span||11)\" v-for=\"column in columns\" :key='column.prop'>\r\n      <el-form-item v-bind=\"column\" :label-width=\"!column.label?'10px':column.labelWidth||labelWidth\">\r\n        <slot :name='column.prop' :column='column'>\r\n          <m-item :column='column'  :row='formData'   >\r\n            <template v-if='column.el===\"input\"&&column.append&&column.appendCustom' :slot=\"column.prop+'_append'\">\r\n              <slot :name=\"column.prop+'_append'\"></slot>\r\n            </template>\r\n          </m-item>\r\n        </slot>\r\n      </el-form-item>\r\n    </el-col>\r\n  </el-form>\r\n</template>\r\n<script>\r\nexport default {\r\n  name:'m-form',\r\n  props: {\r\n    formData: {\r\n      type: Object,\r\n      default () {\r\n        return {}\r\n      }\r\n    },\r\n    noWrap: Boolean,\r\n    labelWidth: {\r\n      type: String,\r\n      default: '100px'\r\n    },\r\n    columns: Array,\r\n    size: String\r\n  },\r\n  watch: {\r\n    formData (v, ov) {\r\n      if (v !== ov) this.$nextTick(_ => this.clearValidate())\r\n    }\r\n  },\r\n  methods: {\r\n    validate (fn) {\r\n      if (this.$refs.ruleForm) return this.$refs.ruleForm.validate(fn)\r\n    },\r\n    resetFields () {\r\n      if (this.$refs.ruleForm) return this.$refs.ruleForm.resetFields()\r\n    },\r\n    validateField (prop, fn) {\r\n      if (this.$refs.ruleForm) return this.$refs.ruleForm.validateField(prop, fn)\r\n    },\r\n    clearValidate (propsArr) {\r\n      if (this.$refs.ruleForm) return this.$refs.ruleForm.clearValidate(propsArr)\r\n    },\r\n    currentObj (data, key) {\r\n      this.$emit('currentObj', data, key)\r\n    },\r\n    inputChange (data, key) {\r\n      this.$emit('inputChange', data, key)\r\n    },\r\n    inputEnter (key) {\r\n      this.$emit('inputEnter', key)\r\n    },\r\n    selectList (data, key) {\r\n      this.$emit('selectList', data, key)\r\n    }\r\n  }\r\n}\r\n</script>\r\n<style>\r\n.el-form {\r\n  width: 100%;\r\n  display: flex;\r\n  flex-wrap: wrap\r\n}\r\n</style>\r\n"] }, media: undefined });
};
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* component normalizer */
function __vue_normalize__(template, style, script$$1, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

  {
    component.__file = "D:\\work\\myCommon\\src\\components\\mForm.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var mForm = __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, __vue_create_injector__, undefined);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var pickerOptions = {
  shortcuts: [{
    text: '今天',
    onClick: function onClick(picker) {
      var end = new Date();
      var start = new Date();
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '昨天',
    onClick: function onClick(picker) {
      var start = new Date();
      start.setTime(start.getTime() - 1000 * 60 * 60 * 24);
      picker.$emit('pick', [start, start]);
    }
  }, {
    text: '最近一周',
    onClick: function onClick(picker) {
      var end = new Date();
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick: function onClick(picker) {
      var end = new Date();
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick: function onClick(picker) {
      var end = new Date();
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近六个月',
    onClick: function onClick(picker) {
      var end = new Date();
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一年',
    onClick: function onClick(picker) {
      var end = new Date();
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
      picker.$emit('pick', [start, end]);
    }
  }]
};
var script$1 = {
  name: 'm-item',
  props: {
    column: Object,
    row: Object
  },
  inheritAttrs: false,
  data: function data() {
    return {
      defaultTime: ['00:00:00', '23:59:59']
    };
  },

  computed: {
    valueKey: function valueKey() {
      if (this.column.valueKey) return this.column.valueKey;
      return {
        label: 'label',
        value: 'value'
      };
    },

    modelComputed: {
      get: function get$$1() {
        /* eslint-disable no-eval */
        var val = void 0;
        try {
          val = eval('this.row.' + this.column.prop);
        } catch (error) {
          throw new Error('formData \u6CA1\u6709' + this.column.prop + '\u5C5E\u6027');
        }
        return val;
      },
      set: function set$$1(value) {
        try {
          eval('this.row.' + this.column.prop + ' = value');
        } catch (error) {
          throw new Error('formData \u6CA1\u6709' + this.column.prop + '\u5C5E\u6027');
        }
      }
    }
  },
  watch: {
    column: {
      handler: function handler(val) {
        this.formatValue();
      },

      deep: true
    },
    row: {
      handler: function handler(val) {
        this.formatValue();
      },

      deep: true
    }
  },
  created: function created() {
    this.formatValue();
  },

  methods: {
    formatValue: function formatValue() {
      if (this.column && this.column.el === 'date-picker') {
        if (this.column.type === 'daterange' || this.column.type === 'datetimerange') {
          var arr = this.row[this.column.prop];
          if (!arr) {
            this.row[this.column.prop] = [];
          } else if (!Array.isArray(arr)) {
            this.row[this.column.prop] = arr.split(',');
          }
        }
      }
    },
    getParams: function getParams(obj) {
      var newObj = {};
      if (obj.params && _typeof(obj.params) === 'object') {
        for (var key in obj.params) {
          var value = void 0;
          try {
            value = eval('this.row.' + obj.params[key]);
          } catch (err) {}
          newObj[key] = value !== undefined ? value : obj.params[key];
        }
      }
      return newObj;
    },
    getpickerOptions: function getpickerOptions(type, flag) {
      if (type === 'daterange' && flag !== false) {
        return pickerOptions;
      }
    },
    currentObj: function currentObj(data, key) {
      if (this.column.listeners && this.column.listeners.currentObj) return;
      this.$emit('currentObj', data, key);
    },
    inputEnter: function inputEnter(key) {
      if (this.column.listeners && this.column.listeners.inputEnter) return;
      this.$emit('inputEnter', key);
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.column.el === "input" ? _c("el-input", _vm._g(_vm._b({
    attrs: {
      placeholder: _vm.column.placeholder != undefined ? _vm.column.placeholder : _vm.column.label
    },
    nativeOn: {
      keyup: function keyup($event) {
        if (!("button" in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
          return null;
        }
        $event.stopPropagation();
        _vm.inputEnter(_vm.column.prop);
      }
    },
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-input", _vm.column, false), _vm.column.listeners), [_vm.column.append ? _c("div", {
    class: _vm.column.appendClass,
    attrs: { slot: "append" },
    slot: "append"
  }, [_vm._t(_vm.column.prop + "_append", [_c("div", {
    on: {
      click: function click($event) {
        _vm.btnClick({
          data: _vm.row,
          column: _vm.column,
          $event: $event
        });
      }
    }
  }, [_c("i", { class: _vm.column.appendIcon }), _vm._v(" " + _vm._s(_vm.column.appendText) + "\n      ")])])], 2) : _vm._e()]) : _vm.column.el === "select" ? _c("el-select", _vm._g(_vm._b({
    attrs: {
      filterable: "",
      placeholder: _vm.column.placeholder != undefined ? _vm.column.placeholder : _vm.column.label
    },
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-select", _vm.column, false), _vm.column.listeners), _vm._l(_vm.column.list, function (item) {
    return item.Value ? _c("el-option", {
      key: _vm.column.props ? item[_vm.column.props.value] : item.Value,
      attrs: {
        label: _vm.column.Text ? item[_vm.column.Text] : item.Text,
        value: _vm.column.bindObj ? item : item.Value
      }
    }) : _vm._e();
  })) : _vm.column.el === "date-picker" ? _c("el-date-picker", _vm._g(_vm._b({
    attrs: {
      "default-time": _vm.column.defaultTime || _vm.defaultTime,
      placeholder: _vm.column.placeholder != undefined ? _vm.column.placeholder : _vm.column.label,
      "picker-options": _vm.column.pickerOptions || _vm.getpickerOptions(_vm.column.type, _vm.column.isNeedFast)
    },
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-date-picker", _vm.column, false), _vm.column.listeners)) : _vm.column.el === "input-number" ? _c("el-input-number", _vm._g(_vm._b({
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-input-number", _vm.column, false), _vm.column.listeners)) : _vm.column.el === "checkbox" ? _c("el-checkbox", _vm._g(_vm._b({
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-checkbox", _vm.column, false), _vm.column.listeners), [_vm._v("\n  " + _vm._s(_vm.column.Text) + "\n")]) : _vm.column.el === "checkbox-group" ? _c("el-checkbox-group", _vm._g(_vm._b({
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-checkbox-group", _vm.column, false), _vm.column.listeners), _vm._l(_vm.column.dataList, function (item) {
    return _c("el-checkbox", _vm._b({
      key: item[_vm.valueKey.label],
      attrs: {
        label: _vm.column.props ? item[_vm.column.props.value] : item[_vm.valueKey.value]
      }
    }, "el-checkbox", _vm.column, false), [_vm._v("\n    " + _vm._s(_vm.column.props ? item[_vm.column.props.label] : item[_vm.valueKey.label]) + "\n  ")]);
  })) : _vm.column.el === "radio" ? _c("el-radio-group", _vm._g(_vm._b({
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-radio-group", _vm.column, false), _vm.column.listeners), _vm._l(_vm.column.dataList, function (item) {
    return _c("el-radio", _vm._b({
      key: item[_vm.valueKey.label],
      attrs: {
        label: _vm.column.props ? item[_vm.column.props.value] : item[_vm.valueKey.value]
      }
    }, "el-radio", _vm.column, false), [_vm._v("\n    " + _vm._s(_vm.column.props ? item[_vm.column.props.label] : item[_vm.valueKey.label]) + "\n  ")]);
  })) : _vm.column.el === "cascader" ? _c("el-cascader", _vm._g(_vm._b({
    attrs: {
      filterable: "",
      placeholder: _vm.column.placeholder != undefined ? _vm.column.placeholder : _vm.column.label
    },
    on: {
      "active-item-change": function activeItemChange($event) {
        _vm.btnClick({
          data: _vm.row,
          column: _vm.column,
          $event: $event
        });
      }
    },
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-cascader", _vm.column, false), _vm.column.listeners)) : _vm.column.el === "switch" ? _c("el-switch", _vm._g(_vm._b({
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "el-switch", _vm.column, false), _vm.column.listeners)) : _vm.column.el === "mSelect" ? _c("m-select", _vm._g(_vm._b({
    attrs: { params: _vm.getParams(_vm.column) },
    model: {
      value: _vm.modelComputed,
      callback: function callback($$v) {
        _vm.modelComputed = $$v;
      },
      expression: "modelComputed"
    }
  }, "m-select", _vm.column, false), _vm.column.listeners)) : _vm.column.el === "tag" ? _c("el-tag", { attrs: { type: _vm.column.type } }, [_vm._v(_vm._s(_vm.modelComputed))]) : _c("span", [_vm._v(_vm._s(_vm.modelComputed))]);
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

/* style */
var __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-0eb84932_0", { source: "\n.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {\n    width: 100%;\n}\n", map: { "version": 3, "sources": ["D:\\work\\myCommon/D:\\work\\myCommon\\src\\components\\mItem.vue"], "names": [], "mappings": ";AAgOA;IACA,YAAA;CACA", "file": "mItem.vue", "sourcesContent": ["<template>\r\n  <el-input\r\n    v-if=\"column.el==='input'\"\r\n    v-model=\"modelComputed\"\r\n    v-bind=\"column\" v-on=\"column.listeners\"\r\n    @keyup.enter.native.stop='inputEnter(column.prop)'\r\n    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'>\r\n    <div v-if=\"column.append\" slot=\"append\" :class=\"column.appendClass\">\r\n      <slot :name=\"column.prop+'_append'\">\r\n        <div @click='btnClick({data:row,column,$event})'>\r\n          <i :class=\"column.appendIcon\"></i> {{column.appendText}}\r\n        </div>\r\n      </slot>\r\n    </div>\r\n  </el-input>\r\n  <el-select\r\n    v-model=\"modelComputed\"\r\n    v-bind=\"column\" v-on=\"column.listeners\"\r\n    filterable\r\n    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'\r\n    v-else-if=\"column.el==='select'\">\r\n    <el-option v-for=\"item in column.list\" v-if='item.Value' :key=\"column.props?item[column.props.value]:item.Value\" :label=\"column.Text?item[column.Text]:item.Text\" :value=\"column.bindObj?item:item.Value\">\r\n    </el-option>\r\n  </el-select>\r\n  <el-date-picker\r\n    v-model=\"modelComputed\" v-bind=\"column\" v-on=\"column.listeners\"\r\n    :default-time='column.defaultTime||defaultTime'\r\n    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'\r\n    :picker-options=\"column.pickerOptions||getpickerOptions(column.type,column.isNeedFast)\"\r\n    v-else-if=\"column.el==='date-picker'\">\r\n  </el-date-picker>\r\n  <el-input-number v-model=\"modelComputed\" v-bind=\"column\" v-on=\"column.listeners\" v-else-if=\"column.el==='input-number'\" />\r\n  <el-checkbox\r\n    v-model=\"modelComputed\" v-bind=\"column\" v-on=\"column.listeners\"\r\n    v-else-if=\"column.el==='checkbox'\">\r\n    {{column.Text}}\r\n  </el-checkbox>\r\n  <el-checkbox-group v-model=\"modelComputed\" v-bind=\"column\" v-on=\"column.listeners\" v-else-if=\"column.el==='checkbox-group'\">\r\n    <el-checkbox\r\n      :label=\"column.props?item[column.props.value]:item[valueKey.value]\"\r\n      v-for='item in column.dataList' :key='item[valueKey.label]' v-bind=\"column\" >\r\n      {{column.props?item[column.props.label]:item[valueKey.label]}}\r\n    </el-checkbox>\r\n  </el-checkbox-group>\r\n  <el-radio-group v-model=\"modelComputed\" v-else-if=\"column.el==='radio'\" v-bind=\"column\" v-on=\"column.listeners\">\r\n    <el-radio\r\n      :label=\"column.props?item[column.props.value]:item[valueKey.value]\" v-bind=\"column\"\r\n      v-for='item in column.dataList'\r\n      :key='item[valueKey.label]'>\r\n      {{column.props?item[column.props.label]:item[valueKey.label]}}\r\n    </el-radio>\r\n  </el-radio-group>\r\n  <el-cascader\r\n    v-model=\"modelComputed\" v-bind=\"column\" v-on=\"column.listeners\" filterable\r\n    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'\r\n    @active-item-change='btnClick({data:row,column,$event})' v-else-if=\"column.el==='cascader'\">\r\n  </el-cascader>\r\n  <el-switch v-model=\"modelComputed\" v-bind=\"column\" v-on=\"column.listeners\" v-else-if=\"column.el==='switch'\">\r\n  </el-switch>\r\n  <m-select\r\n    v-else-if=\"column.el==='mSelect'\" v-bind=\"column\" v-on=\"column.listeners\" v-model=\"modelComputed\" :params='getParams(column)'></m-select>\r\n  <el-tag :type=\"column.type\" v-else-if=\"column.el==='tag'\">{{modelComputed}}</el-tag>\r\n  <span v-else >{{modelComputed}}</span>\r\n</template>\r\n<script>\r\nconst pickerOptions = {\r\n  shortcuts: [{\r\n    text: '今天',\r\n    onClick (picker) {\r\n      const end = new Date()\r\n      const start = new Date()\r\n      picker.$emit('pick', [start, end])\r\n    }\r\n  }, {\r\n    text: '昨天',\r\n    onClick (picker) {\r\n      const start = new Date()\r\n      start.setTime(start.getTime() - 1000 * 60 * 60 * 24)\r\n      picker.$emit('pick', [start, start])\r\n    }\r\n  }, {\r\n    text: '最近一周',\r\n    onClick (picker) {\r\n      const end = new Date()\r\n      const start = new Date()\r\n      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)\r\n      picker.$emit('pick', [start, end])\r\n    }\r\n  }, {\r\n    text: '最近一个月',\r\n    onClick (picker) {\r\n      const end = new Date()\r\n      const start = new Date()\r\n      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)\r\n      picker.$emit('pick', [start, end])\r\n    }\r\n  }, {\r\n    text: '最近三个月',\r\n    onClick (picker) {\r\n      const end = new Date()\r\n      const start = new Date()\r\n      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)\r\n      picker.$emit('pick', [start, end])\r\n    }\r\n  }, {\r\n    text: '最近六个月',\r\n    onClick (picker) {\r\n      const end = new Date()\r\n      const start = new Date()\r\n      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)\r\n      picker.$emit('pick', [start, end])\r\n    }\r\n  }, {\r\n    text: '最近一年',\r\n    onClick (picker) {\r\n      const end = new Date()\r\n      const start = new Date()\r\n      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)\r\n      picker.$emit('pick', [start, end])\r\n    }\r\n  }]\r\n}\r\nexport default {\r\n  name: 'm-item',\r\n  props: {\r\n    column: Object,\r\n    row: Object\r\n  },\r\n  inheritAttrs: false,\r\n  data () {\r\n    return {\r\n      defaultTime: ['00:00:00', '23:59:59']\r\n    }\r\n  },\r\n  computed: {\r\n    valueKey () {\r\n      if (this.column.valueKey) return this.column.valueKey\r\n      return {\r\n        label: 'label',\r\n        value: 'value'\r\n      }\r\n    },\r\n    modelComputed: {\r\n      get () {\r\n        /* eslint-disable no-eval */\r\n        let val\r\n        try {\r\n          val = eval(`this.row.${this.column.prop}`)\r\n        } catch (error) {\r\n          throw new Error(`formData 没有${this.column.prop}属性`)\r\n        }\r\n        return val\r\n      },\r\n      set (value) {\r\n        try {\r\n          eval(`this.row.${this.column.prop} = value`)\r\n        } catch (error) {\r\n          throw new Error(`formData 没有${this.column.prop}属性`)\r\n        }\r\n      }\r\n    }\r\n  },\r\n  watch: {\r\n    column: {\r\n      handler (val) {\r\n        this.formatValue()\r\n      },\r\n      deep: true\r\n    },\r\n    row: {\r\n      handler (val) {\r\n        this.formatValue()\r\n      },\r\n      deep: true\r\n    }\r\n  },\r\n  created () {\r\n    this.formatValue()\r\n  },\r\n  methods: {\r\n    formatValue () {\r\n      if (this.column && this.column.el === 'date-picker') {\r\n        if (this.column.type === 'daterange' || this.column.type === 'datetimerange') {\r\n          let arr = this.row[this.column.prop]\r\n          if (!arr) {\r\n            this.row[this.column.prop] = []\r\n          } else if (!Array.isArray(arr)) {\r\n            this.row[this.column.prop] = arr.split(',')\r\n          }\r\n        }\r\n      }\r\n    },\r\n    getParams (obj) {\r\n      let newObj = {}\r\n      if (obj.params && typeof obj.params === 'object') {\r\n        for (let key in obj.params) {\r\n          let value\r\n          try {\r\n            value = eval(`this.row.${obj.params[key]}`)\r\n          } catch (err) { }\r\n          newObj[key] = value !== undefined ? value : obj.params[key]\r\n        }\r\n      }\r\n      return newObj\r\n    },\r\n    getpickerOptions (type, flag) {\r\n      if (type === 'daterange' && flag !== false) {\r\n        return pickerOptions\r\n      }\r\n    },\r\n    currentObj (data, key) {\r\n      if (this.column.listeners && this.column.listeners.currentObj) return\r\n      this.$emit('currentObj', data, key)\r\n    },\r\n\r\n    inputEnter (key) {\r\n      if (this.column.listeners && this.column.listeners.inputEnter) return\r\n      this.$emit('inputEnter', key)\r\n    },\r\n  \r\n  }\r\n}\r\n</script>\r\n<style>\r\n  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {\r\n    width: 100%;\r\n}\r\n</style>\r\n"] }, media: undefined });
};
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* component normalizer */
function __vue_normalize__$1(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {};

  {
    component.__file = "D:\\work\\myCommon\\src\\components\\mItem.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__$1() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var mItem = __vue_normalize__$1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, __vue_create_injector__$1, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$2 = {
  name: 'm-select',
  props: {
    params: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    valueKey: {
      type: Object,
      default: function _default() {
        return {
          label: 'label',
          value: 'value'
        };
      }
    },
    nullRequest: Boolean,
    value: {
      type: [String, Boolean, Number, Array],
      default: ''
    },
    dataList: Array,
    isDefault: Boolean,
    multiple: Boolean,
    showMsg: Boolean,
    getList: Function
  },
  data: function data() {
    return {
      list: [],
      currentValue: '',
      loading: false,
      selectObj: {}
    };
  },

  watch: {
    params: {
      handler: function handler(nv, ov) {
        if (!nv) return;
        if (!ov) {
          this.pageInit();
        } else {
          var flag = Object.keys(nv).some(function (key) {
            return nv[key] !== ov[key];
          });
          if (flag) {
            this.multiple ? this.currentValue = [] : this.currentValue = null;
            this.pageInit();
          }
        }
      },

      deep: true
    },
    value: function value(v) {
      if (this.multiple) {
        if (!v) {
          this.currentValue = [];
        } else if (Array.isArray(v)) {
          this.currentValue = v;
        } else {
          this.currentValue = v.split(',');
        }
      } else {
        this.currentValue = v;
      }
    },
    currentValue: function currentValue(v) {
      this.$emit('input', v);
      this.getCurrentObj();
    },
    dataList: function dataList(v) {
      this.list = v;
      if (this.isDefault && v.length) {
        if (!this.currentValue) {
          this.currentValue = v[0][this.valueKey.value];
        }
      }
      this.getCurrentObj();
    },
    list: function list(val) {
      var _this = this;

      var checkedItem = val.filter(function (item) {
        return item.checked;
      });
      if (!checkedItem.length || this.currentValue || Array.isArray(this.currentValue) && this.currentValue.length) return;
      if (this.multiple) {
        this.currentValue = checkedItem.map(function (item) {
          return item[_this.valueKey.value];
        });
      } else {
        this.currentValue = checkedItem[0][this.valueKey.value];
      }
    }
  },
  created: function created() {
    this.currentValue = this.value;
    if (this.multiple) {
      if (_typeof(this.value) === 'object' && !this.value.length) {
        this.currentValue = [];
      }
    }
    if (this.dataList) {
      this.list = this.dataList || [];
      return;
    }
    if (this.dataList && this.currentValue) this.getCurrentObj();
    if (this.params) {
      this.pageInit();
    }
  },

  methods: {
    pageInit: function pageInit() {
      var _this2 = this;

      var arr = Object.keys(this.params);
      if (arr.length) {
        var flag = arr.some(function (o) {
          return _this2.params[o] === null;
        });
        if (flag && !this.nullRequest) return;
      }
      this.getData();
    },
    getCurrentObj: function getCurrentObj() {
      var _this3 = this;

      if (!this.list.length) return;
      var currentObj = null;
      var key = this.valueKey.value;
      if (!this.multiple) {
        if (!this.currentValue) {
          currentObj = {};
        } else {
          currentObj = this.list.find(function (obj) {
            return obj[key] === _this3.currentValue;
          }) || {};
        }
      } else {
        currentObj = [];
        this.currentValue.forEach(function (id) {
          var obj = _this3.list.find(function (obj) {
            return obj[key] === id;
          });
          if (obj) currentObj.push(obj);
        });
      }
      this.selectObj = currentObj;
      this.$emit('currentObj', currentObj);
    },
    remoteMethod: function remoteMethod(query) {
      if (this.$attrs.remote !== undefined && this.$attrs.remote !== false && this.$attrs.remote !== null) {
        this.getData({ keyWord: query });
      }
    },
    getData: function getData() {
      var _this4 = this;

      var otherData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.getList) return;
      this.loading = true;
      this.getList(_extends({}, this.params, otherData), this.showMsg).then(function (_ref) {
        var _ref$data = _ref.data,
            data = _ref$data === undefined ? [] : _ref$data;

        if (data.length) {
          if (!_this4.multiple) {
            if (_this4.currentValue) {
              var flag = data.some(function (obj) {
                return obj[_this4.valueKey.value] === _this4.currentValue;
              });
              if (!flag) {
                _this4.currentValue = '';
              }
            }

            if (!_this4.currentValue && _this4.isDefault) {
              _this4.currentValue = data[0][_this4.valueKey.value];
            }
          }
        }
        _this4.list = data;
        _this4.getCurrentObj();
        _this4.$emit('selectList', _this4.list);
        _this4.loading = false;
      }).catch(function (err) {
        _this4.loading = false;
        return Promise.reject(err);
      });
    }
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-select", _vm._g(_vm._b({
    attrs: {
      loading: _vm.loading,
      "loading-text": "加载中",
      filterable: _vm.filterable,
      clearable: _vm.clearable,
      "remote-method": _vm.remoteMethod,
      multiple: _vm.multiple
    },
    on: { clear: _vm.remoteMethod },
    model: {
      value: _vm.currentValue,
      callback: function callback($$v) {
        _vm.currentValue = $$v;
      },
      expression: "currentValue"
    }
  }, "el-select", _vm.$attrs, false), _vm.$listeners), _vm._l(_vm.list, function (item) {
    return _c("el-option", {
      key: item[_vm.valueKey.value],
      attrs: {
        label: item[_vm.valueKey.label],
        value: item[_vm.valueKey.value],
        disabled: item.disabled
      }
    });
  }));
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

/* style */
var __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-2a2f0322_0", { source: "\n.el-select {\n  width: 100%;\n}\n", map: { "version": 3, "sources": ["mSelect.vue"], "names": [], "mappings": ";AAAA;EACE,YAAY;CACb", "file": "mSelect.vue", "sourcesContent": [".el-select {\n  width: 100%;\n}\n"] }, media: undefined });
};
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* component normalizer */
function __vue_normalize__$2(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {};

  {
    component.__file = "D:\\work\\myCommon\\src\\components\\mSelect.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  {
    var hook = void 0;
    if (style) {
      hook = function hook(context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook !== undefined) {
      if (component.functional) {
        // register for functional component in vue file
        var originalRender = component.render;
        component.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = component.beforeCreate;
        component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
  }

  return component;
}
/* style inject */
function __vue_create_injector__$2() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var mSelect = __vue_normalize__$2({ render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 }, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, __vue_create_injector__$2, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'm-table',
  props: {
    tableData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    layout: {
      type: String,
      default: 'total,sizes,prev, pager, next, jumper'
    },
    showNum: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Function
    },
    numFiexd: Boolean,
    showPage: {
      type: Boolean,
      default: true
    },
    forced: Boolean,
    showsummary: {
      type: Boolean,
      default: false
    },
    summarymethod: {
      type: Function
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    numTitle: {
      type: String,
      default: '序号'
    },
    total: Number,
    selection: {
      type: Boolean,
      default: false
    },
    expand: Boolean,
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    page: {
      type: Object,
      default: function _default() {
        return {
          pageIndex: 1,
          pageSize: 15
        };
      }
    },
    pageSizes: {
      type: Array,
      default: function _default() {
        return [15, 30, 45, 60];
      }
    }
  },
  inheritAttrs: false,
  computed: {
    list: function list() {
      var _this = this;

      if (this.total || !this.showPage) {
        return this.tableData;
      }
      return this.tableData.filter(function (obj, index) {
        return index >= (_this.page.pageIndex - 1) * _this.page.pageSize && index < _this.page.pageIndex * _this.page.pageSize;
      });
    },
    summaryProps: function summaryProps() {
      return this.columns.filter(function (obj) {
        return obj.isSummary;
      }).map(function (item) {
        return item.prop;
      });
    },
    isShowSummary: function isShowSummary() {
      return this.columns.some(function (obj) {
        return obj.isSummary;
      });
    }
  },
  watch: {
    tableData: function tableData() {
      if (this.total === '' || this.total === null || isNaN(this.total)) this.page.pageIndex = 1;
    }
  },
  methods: {
    getKey: function getKey(str) {
      if (this.forced) return (str || '') + Math.random() * Date.now();
      return str;
    },
    getColumns: function getColumns(obj, scope) {
      var listeners = null;
      if (obj.listeners) {
        listeners = Object.keys(obj.listeners).reduce(function (x, y) {
          return _extends({}, x, defineProperty({}, y, obj.listeners[y].bind(null, scope)));
        }, {});
      }
      return _extends({}, obj, {
        disabled: obj.disabled || scope.row.disabled,
        readonly: obj.readonly || scope.row.readonly,
        listeners: listeners
      });
    },
    summaryDefault: function summaryDefault(param) {
      var _this2 = this;

      var columns = param.columns,
          data = param.data;

      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 0) {
          sums[index] = '合计';
          return;
        } else {
          if (_this2.summaryProps.indexOf(column.property) < 0) return;
        }
        var values = data.map(function (item) {
          return Number(item[column.property]);
        });
        if (!values.every(function (value) {
          return isNaN(value);
        })) {
          sums[index] = values.reduce(function (prev, curr) {
            var value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
        sums[index] = parseFloat(sums[index] || 0).toFixed(2);
        if (column.className === 'currency' && sums[index]) {
          sums[index] = (sums[index] + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
        if (column.className === 'Percentage' && sums[index]) {
          sums[index] = sums[index] + '%';
        }
      });
      return sums;
    },
    handleSizeChange: function handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit('pageChange', this.page);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.page.pageIndex = val;
      this.$emit('pageChange', this.page);
    },
    toggleRowSelection: function toggleRowSelection(rows) {
      var _this3 = this;

      rows.forEach(function (row) {
        _this3.$refs.commontable.toggleRowSelection(row);
      });
    },
    clearSelection: function clearSelection() {
      this.$refs.commontable.clearSelection();
    },
    handleSelectionChange: function handleSelectionChange(arr) {
      if (this.$listeners['selection-change']) return;
      this.$emit('selectionChange', arr);
    },
    sortChange: function sortChange(sortObj) {
      if (this.$listeners['sort-change']) return;
      this.$emit('sortChange', sortObj);
    },
    rowClick: function rowClick(row, event, column) {
      if (this.$listeners['row-click']) return;
      this.$emit('rowClick', row, event, column);
    },
    cellClick: function cellClick(row, event, column) {
      if (this.$listeners['cell-click']) return;
      this.$emit('cellClick', row, event, column);
    },
    currentChange: function currentChange(val) {
      if (this.$listeners['current-change']) return;
      this.$emit('currentChange', val);
    },
    filtetag: function filtetag(column, value, row) {
      if (typeof column.filterMethod === 'function') {
        return column.filterMethod(column, value, row);
      } else {
        return row[column.prop] === value;
      }
    },
    goto: function goto(obj) {
      this.$emit('gotolink', obj);
    },
    currentObj: function currentObj(scope, data, key) {
      this.$emit('currentObj', scope.row, data, key, scope.$index);
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_c("el-table", _vm._g(_vm._b({
    ref: "commontable",
    attrs: {
      data: _vm.list,
      border: _vm.border,
      stripe: _vm.stripe,
      "summary-method": _vm.summarymethod || _vm.summaryDefault,
      "show-summary": _vm.isShowSummary
    },
    on: {
      "row-click": _vm.rowClick,
      "cell-click": _vm.cellClick,
      "selection-change": _vm.handleSelectionChange,
      "sort-change": _vm.sortChange,
      "current-change": _vm.currentChange
    }
  }, "el-table", _vm.$attrs, false), _vm.$listeners), [_vm.expand ? _c("el-table-column", {
    attrs: { type: "expand" },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(scope) {
        return [_vm._t("expand", null, {
          row: scope.row,
          $index: scope.$index
        })];
      }
    }])
  }) : _vm._e(), _vm._v(" "), _vm.selection && _vm.list.length ? _c("el-table-column", {
    attrs: {
      type: "selection",
      selectable: _vm.selectable,
      align: "center"
    }
  }) : _vm._e(), _vm._v(" "), _vm.showNum && _vm.list.length ? _c("el-table-column", {
    attrs: {
      label: _vm.numTitle,
      align: "center",
      width: "60",
      fixed: _vm.numFiexd
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function fn(scope) {
        return [_vm._t("mnum", [_c("span", { staticStyle: { "margin-left": "10px" } }, [_vm._v(_vm._s(scope.$index + 1 + (_vm.page.pageIndex - 1) * _vm.page.pageSize))])], {
          row: scope.row,
          num: scope.$index + 1 + (_vm.page.pageIndex - 1) * _vm.page.pageSize,
          $index: scope.$index
        })];
      }
    }])
  }) : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (obj) {
    return [_c("el-table-column", _vm._b({
      key: _vm.getKey(obj.prop),
      attrs: {
        "class-name": obj.className || obj.el,
        align: obj.align || "center",
        "filter-method": obj.filters ? _vm.filtetag.bind(null, obj) : null
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function fn(scope) {
          return [_vm._t(obj.prop, [!obj.el ? _c("span", [_vm._v("\n                " + _vm._s(scope.row[obj.prop]) + "\n              ")]) : obj.el === "boolean" ? _c("span", [_vm._v("\n              " + _vm._s(scope.row[obj.prop] === true ? obj.trueLabel : obj.falseLabel) + "\n            ")]) : _c("m-item", {
            attrs: {
              column: _vm.getColumns(obj, scope),
              row: scope.row
            },
            on: {
              currentObj: function currentObj(data, key) {
                return _vm.currentObj(scope, data, key);
              }
            }
          })], {
            row: scope.row,
            $index: scope.$index,
            column: obj
          })];
        }
      }])
    }, "el-table-column", obj, false))];
  })], 2), _vm._v(" "), _vm._t("page", [_vm.showPage ? _c("el-pagination", {
    staticStyle: { "text-align": "right" },
    attrs: {
      "current-page": _vm.page.pageIndex,
      "page-sizes": _vm.pageSizes,
      "page-size": _vm.page.pageSize,
      layout: _vm.layout,
      total: _vm.total || _vm.tableData.length
    },
    on: {
      "size-change": _vm.handleSizeChange,
      "current-change": _vm.handleCurrentChange
    }
  }) : _vm._e()])], 2);
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = undefined;
/* functional template */
var __vue_is_functional_template__$3 = false;
/* component normalizer */
function __vue_normalize__$3(template, style, script, scope, functional, moduleIdentifier, createInjector, createInjectorSSR) {
  var component = (typeof script === 'function' ? script.options : script) || {};

  {
    component.__file = "D:\\work\\myCommon\\src\\components\\mTable.vue";
  }

  if (!component.render) {
    component.render = template.render;
    component.staticRenderFns = template.staticRenderFns;
    component._compiled = true;

    if (functional) component.functional = true;
  }

  component._scopeId = scope;

  return component;
}
/* style inject */
function __vue_create_injector__$3() {
  var head = document.head || document.getElementsByTagName('head')[0];
  var styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  return function addStyle(id, css) {
    if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return; // SSR styles are present.

    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

    if (!style.ids.includes(id)) {
      var code = css.source;
      var index = style.ids.length;

      style.ids.push(id);

      if (isOldIE) {
        style.element = style.element || document.querySelector('style[data-group=' + group + ']');
      }

      if (!style.element) {
        var el = style.element = document.createElement('style');
        el.type = 'text/css';

        if (css.media) el.setAttribute('media', css.media);
        if (isOldIE) {
          el.setAttribute('data-group', group);
          el.setAttribute('data-next-index', '0');
        }

        head.appendChild(el);
      }

      if (isOldIE) {
        index = parseInt(style.element.getAttribute('data-next-index'));
        style.element.setAttribute('data-next-index', index + 1);
      }

      if (style.element.styleSheet) {
        style.parts.push(code);
        style.element.styleSheet.cssText = style.parts.filter(Boolean).join('\n');
      } else {
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  };
}
/* style inject SSR */

var mTable = __vue_normalize__$3({ render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 }, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, __vue_create_injector__$3, undefined);

var components = [_Input, _InputNumber, _Radio, _RadioGroup, _Checkbox, _CheckboxGroup, _Switch, _Select, _Option, _DatePicker, _Form, _FormItem, _Table, _TableColumn, _Tag, _Col, _Cascader];
var install = function install(Vue, opts) {
  if (install.installed) return;
  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
  components.map(function (component) {
    Vue.component(component.name, component);
  });
  Vue.component(mForm.name, mForm);
  Vue.component(mItem.name, mItem);
  Vue.component(mSelect.name, mSelect);
  Vue.component(mTable.name, mTable);
};
if (window.Vue) {
  install(window.Vue);
}
var index = {
  install: install,
  mForm: mForm,
  mItem: mItem,
  mSelect: mSelect,
  mTable: mTable
};

module.exports = index;
