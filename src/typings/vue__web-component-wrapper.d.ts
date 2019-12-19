declare module '@vue/web-component-wrapper' {
  export default function wrap(Vue: typeof import('vue').default, Component: typeof Vue.Component | typeof Vue.AsyncComponent): typeof HTMLElement
}
