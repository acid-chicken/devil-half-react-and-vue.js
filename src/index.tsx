import './index.sss'

const main = document.body.firstElementChild || document.body.appendChild(document.createElement('main'))

const hasEsModuleProperty = (x: unknown): x is { __esModule: unknown } => !!(typeof x == 'object' && x && Object.prototype.hasOwnProperty.call(x, '__esModule'))
const hasDefaultExport = (x: object): x is { default: unknown } => 'default' in x
const loadModule = (promise: Promise<unknown>) => promise
  .then(x => hasEsModuleProperty(x) && typeof x.__esModule == 'boolean' && x.__esModule && hasDefaultExport(x) ? x.default : x)

Promise.all([
  import('./getReact'),
  /*
  import('react-dom'),
  */
  import('vue'),
  new Promise<unknown>(callback => addEventListener('DOMContentLoaded', callback)),
  ...([
    import('./react/components/item'),
    import('./vue/components/item'),
  ] as Promise<{
    default: typeof HTMLElement
    name: string
  }>[]).map(x => x.then(x => customElements.define(x.name, x.default))),
].map(loadModule)).then(x => x as Parameters<(
  getReact: typeof import('./getReact').default,
  /*
  ReactDOM: typeof import('react-dom'),
  */
  Vue: typeof import('vue').default,
  ..._: unknown[]) => void>)
  .then(([
    getReact,
    /*
    ReactDOM,
    */
    Vue,
  ]) => new Vue({
    el: main.appendChild(document.createElement('div')),
    render(overrideWithVue) {
      /*
      let React = getReact()

      ReactDOM.render(
        <react-item message="Hello, React!">
          <span slot="bottom">Yeah!</span>
        </react-item>,
        main.insertBefore(
          document.createElement('div'),
          main.firstChild?.nextSibling || null))
      */
      const React = getReact(overrideWithVue)

      return (
        <div>
          <vue-item message="I'm on Vue.js!" />
        </div>
      ) as unknown as Vue.VNode
    },
  }))
