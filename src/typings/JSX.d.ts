declare namespace JSX {
  interface IntrinsicElements {
    'react-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      message: string
    }, HTMLElement>
    slot: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSlotElement> & {
      name: string
    }, HTMLSlotElement>
    'vue-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      message: string
    }, HTMLElement>
  }
}
