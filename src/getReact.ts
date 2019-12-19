import React from 'react'
import { CreateElement, VNode, VNodeData } from 'vue'

type Data = {
  attrs: Record<string, unknown>
  on: Record<string, Function>
  [key: string]: unknown
}

/*
function getReact(): typeof React
function getReact(h: CreateElement): {
  createElement(tagName: string, attrsOrChildren?: Record<string, unknown> | null, ...children: (string | Element)[]): Element
}
*/
function getReact(h?: CreateElement) {
  return h ? {
    createElement(tagName: string, attrsOrChildren?: Record<string, unknown> | null, ...children: (string | Element)[]) {
      const keys = Object.getPrototypeOf(attrsOrChildren || 0).constructor.name == 'Object' && Object.entries(attrsOrChildren as Record<string, unknown>)
      const data = keys && keys.reduce<Data>((a, [k, v]) => (
        k.startsWith('$') ?
          a[k.substr(1)] = v :
          k.match(/^on[A-Z]/) ?
            a.on[k.replace(/^on([A-Z])/, (_, x) => x.toLowerCase())] = v as Function :
            a.attrs[k] = v,
        a), {
        attrs: {},
        on: {},
      })
      return h(tagName, data || children as VNodeData, data ? children as unknown as VNode[] : undefined) as unknown as Element
    },
  } : React
}

export default getReact
