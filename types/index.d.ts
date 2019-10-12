import Vue, { VNode } from 'vue'

declare namespace Mcommon {
  interface mcommon {
    install(vue: typeof Vue): void
    MForm: VNode
    MItem: VNode
    MSelect: VNode
    MTable: VNode
  }
}

declare const Mcommon: Mcommon.mcommon

export = Mcommon
export as namespace Mcommon
