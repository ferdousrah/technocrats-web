declare module 'isotope-layout' {
  export default class Isotope {
    constructor(element: HTMLElement | string, options?: any)
    arrange(options?: any): void
    layout(): void
    reloadItems(): void
    destroy(): void
  }
}

declare module 'imagesloaded' {
  export default function imagesLoaded(
    elem: Element | NodeList | Array<Element> | string,
    callback?: any
  ): any
}

declare module 'react-modal' {
  import * as React from 'react'
  export default class Modal extends React.Component<any, any> {}
  export function setAppElement(element: string | HTMLElement): void
}
