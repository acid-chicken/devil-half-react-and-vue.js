import wrap from '@vue/web-component-wrapper'
import { boundMethod } from 'autobind-decorator'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import getReact from '../../getReact'

@Component
class ItemComponent extends Vue {
  @Prop({
    type: String,
    default: 'Hello world!',
  })
  message!: string

  @boundMethod
  onClick(e: Event) {
    e.stopPropagation()

    const host = e.currentTarget || e.target

    if (host instanceof HTMLElement) {
      const react = document.createElement('react-item')
      react.setAttribute('message', 'I\'m on React!')
      react.slot = 'bottom'
      host.appendChild(react)
    }
  }

  render(overrideWithVue: Vue.CreateElement) {
    const React = getReact(overrideWithVue)

    const onClick =
      this.onClick as unknown as (event: React.MouseEvent<HTMLElement, MouseEvent>) => void

    return (
      <section onClick={onClick}>
        <h1>{this.message}</h1>
        <p>Click to bring a React component.</p>
        <slot name="bottom"></slot>
        <style>{`
          :host > section {
            background: #35495e;
            border-radius: 8px;
            color: #41b883;
            cursor: pointer;
            margin: 8px 0 0;
            padding: 8px;
          }
        `}</style>
      </section>
    ) as unknown as Vue.VNode
  }
}

const Item = wrap(Vue, ItemComponent)

export const name = 'vue-item'

export default Item
