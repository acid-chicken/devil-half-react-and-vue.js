declare module '@adobe/react-webcomponent' {
  export class DOMModel {
  }

  export function byAttrVal(...args: unknown[])

  export function byBooleanAttrVal(...args: unknown[])

  export function byChildContentVal(...args: unknown[])

  export function byChildModelVal(...args: unknown[])

  export function byChildrenRefArray(...args: unknown[])

  export function byChildrenTypeArray(...args: unknown[])

  export function byContent(...args: unknown[])

  export function byContentVal(...args: unknown[])

  export function byJsonAttrVal(...args: unknown[])

  export function byModel(...args: unknown[])

  export function createCustomElement(ReactComponent: typeof import('react').Component, Model: typeof DOMModel, renderRoot?: string): typeof HTMLElement

  export function registerEvent(...args: unknown[])
}
