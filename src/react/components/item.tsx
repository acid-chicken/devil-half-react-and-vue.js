import { DOMModel, byAttrVal, createCustomElement } from '@adobe/react-webcomponent'
import { boundMethod } from 'autobind-decorator'
import React from 'react'

type ItemProps = {
  message: string
}

class ItemModel extends DOMModel {
  @byAttrVal
  message: string = 'Hello world!'
}

class ItemComponent extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props)
  }

  @boundMethod
  onClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation()

    const root = (e.currentTarget || e.target).parentNode

    if (root instanceof ShadowRoot) {
      const vue = document.createElement('vue-item')
      vue.setAttribute('message', 'I\'m on Vue.js!')
      vue.slot = 'bottom'
      root.host.appendChild(vue)
    }
  }

  render() {
    return (
      <section onClick={this.onClick}>
        <h1>{this.props.message}</h1>
        <p>Click to bring a Vue.js component.</p>
        <slot name="bottom"></slot>
        <style>{`
          :host > section {
            background: #20232a;
            border-radius: 8px;
            color: #61dafb;
            cursor: pointer;
            margin: 8px 0 0;
            padding: 8px;
          }
        `}</style>
      </section>
    )
  }
}

const Item = createCustomElement(ItemComponent, ItemModel, 'openShadowRoot')

export const name = 'react-item'

export default Item
