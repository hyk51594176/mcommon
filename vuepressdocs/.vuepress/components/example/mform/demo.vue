<template>
  <div>
    <h3>表单控制</h3>
    <m-form :model="options" :columns="optionsColumns"></m-form>
    <br>
    <h3>表单展示</h3>
    {{formData}}
    <m-form
      :model="formData"
      ref="mform"
      :size="options.size"
      no-warp
      :labelPosition="options.labelPosition"
      :columns="columns"
      :disabled="options.disabled"
      :labelWidth="options.labelWidth+"px""
    >
      <el-progress type="circle" slot="slot" :percentage="80" color="#8e71c7"></el-progress>
    </m-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        size: "small",
        labelWidth: 100
      },
      formData: {
        state: "默认渲染span,性别选中男不显示该字段",
        list: [{}]
      },
      optionsColumns: [
        {
          label: "对齐方式",
          el: "radio-group",
          prop: "labelPosition",
          type: "button",
          dataList: [
            {
              label: "左对齐",
              value: "left"
            },
            {
              label: "右对齐",
              value: "right"
            },
            {
              label: "顶部对齐",
              value: "top"
            }
          ]
        },
        {
          label: "尺寸",
          prop: "size",
          el: "radio-group",
          type: "button",
          dataList: [
            {
              label: "medium",
              value: "medium"
            },
            {
              label: "small",
              value: "small"
            },
            {
              label: "mini",
              value: "mini"
            }
          ]
        },
        {
          label: "禁用全部字段",
          prop: "disabled",
          el: "switch"
        },
        {
          label: "禁用部分字段",
          prop: "disabledArr",
          el: "select",
          collapseTags: true,
          multiple: true,
          getList: this.getSelectList
        },
        {
          label: "labelWidth",
          prop: "labelWidth",
          el: "input-number",
          min: 0
        }
      ]
    };
  },
  computed: {
    columns() {
      return [
        {
          el: "input",
          prop: "name",
          label: "姓名",
          placeholder: "请输入姓名",
          disabled: this.isDisabled("name"),
          span: 22,
          rules: {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          slots: {
            append: <el-button>搜索</el-button>
          }
        },
        {
          el: "radio-group",
          disabled: this.isDisabled("sex"),
          label: "性别",
          prop: "sex",
          dataList: [{ label: "男", value: 1 }, { label: "女", value: 0 }],
          rules: {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        },
        ...(this.formData.sex !== 1
          ? [
              {
                label: "默认渲染",
                prop: "state",
                span: 22
              }
            ]
          : []),
        {
          label: "籍贯",
          disabled: this.isDisabled("addr"),
          el: "cascader",
          prop: "addr",
          options: [
            {
              label: "浙江省",
              value: 1,
              children: [
                {
                  label: "杭州市",
                  value: 2,
                  children: [
                    {
                      label: "余杭区",
                      value: 3
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          el: "select",
          disabled: this.isDisabled("xl"),
          label: "学历",
          prop: "xl",
          dataList: [
            {
              label: "大学",
              value: 1
            },
            {
              label: "高中",
              value: 2
            },
            {
              label: "初中",
              value: 3
            }
          ]
        },
        {
          el: "date-picker",
          label: "出生年月",
          disabled: this.isDisabled("date"),
          prop: "date",
          type: "month",
          format: "yyyy年MM月"
        },
        {
          label: "备注",
          disabled: this.isDisabled("remark"),
          prop: "remark",
          span: 22,
          el: "input",
          type: "textarea"
        },

        {
          label: "render渲染",
          prop: "render",
          render: h => {
            return <el-progress type="circle" percentage={30} />;
          },
          rules: {
            required: true,
            message: "render字段不能为空"
          }
        },
        {
          label: "slot渲染",
          prop: "slot"
        },
        ...this.getOtherColumns(),
        {
          prop: "btn",
          span: 22,
          render: () => {
            return (
              <div style="text-align:center">
                <el-button
                  disabled={this.isDisabled("btn")}
                  onClick={() => {
                    this.formData.list.push({});
                  }}
                >
                  添加联动
                </el-button>
                <el-button
                  onClick={() => {
                    this.$refs.mform
                      .validate()
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}
                >
                  表单验证
                </el-button>
                <el-button
                  onClick={() => {
                    this.formData = {
                      state: "默认渲染span,性别选中男不显示该字段",
                      list: [{}]
                    };
                  }}
                >
                  重置表单
                </el-button>
              </div>
            );
          }
        }
      ];
    }
  },
  methods: {
    isDisabled(filed) {
      return (this.options.disabledArr || []).indexOf(filed) > -1;
    },
    getSelectList() {
      return Promise.resolve(
        this.columns.map(obj => ({ label: obj.label, value: obj.prop }))
      );
    },
    getList({ parent }) {
      let arr = [];
      if (parent === "zhejiang") {
        arr = [
          { label: "杭州", value: "hangzhou" },
          { label: "宁波", value: "ningbo" }
        ];
      } else if (parent === "shandong") {
        arr = [
          { label: "济南", value: "jinan" },
          { label: "泰安", value: "taian" }
        ];
      }
      return new Promise(reslove => {
        setTimeout(() => {
          reslove(arr);
        }, 1000);
      });
    },
    getOtherColumns() {
      return this.formData.list
        .map((obj, index) => {
          return [
            {
              label: `联动选择${index}`,
              prop: `list[${index}].label`,
              el: "select",
              rules: {
                required: true,
                message: "请选择省份",
                trigger: "change"
              },
              dataList: [
                {
                  label: "浙江",
                  value: "zhejiang"
                },
                {
                  label: "山东",
                  value: "shandong"
                }
              ]
            },
            {
              el: "select",
              getList: this.getList, // 异步获取数据
              prop: `list[${index}].value`,
              span: 6,
              rules: {
                required: true,
                message: "请选择城市",
                trigger: "change"
              },
              params: {
                parent: `list[${index}].label` // 请求参数
              }
            },
            {
              prop: `del${index}`,
              span: 6,
              render: (
                <el-button
                  type="danger"
                  onClick={() => {
                    this.formData.list.splice(index, 1);
                  }}
                >
                  删除
                </el-button>
              )
            }
          ];
        })
        .flat();
    }
  }
};
</script>
