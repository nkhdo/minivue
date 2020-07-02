function mount(vnode, container) {
  const { tag, props, children } = vnode;

  // create the element
  const el = vnode.el = document.createElement(tag)

  // attributes
  if (props) {
    for (let key in props) {
      const value = props[key]
      el.setAttribute(key, value)
    }
  }

  // children
  if (typeof children === 'string') {
    el.textContent = children
  } else {
    children.forEach(child => {
      mount(child, el)
    })
  }

  // mount
  container.appendChild(el)
}