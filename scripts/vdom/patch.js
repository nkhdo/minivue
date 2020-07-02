function patch (n1, n2) {
  const el = n1.el = n2.el

  if (n1.tag === n2.tag) {
    // props
    const newProps = n1.props || {}
    const oldProps = n2.props || {}
    // update new props
    for (let key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      // only update what changed
      if (newValue !== oldValue) {
        el.setAttribute(key, newValue)
      }
    }
    // remove old props
    for (let key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key)
      }
    }

    // children
    const newChildren = n1.children
    const oldChildren = n2.children

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        el.textContent = newChildren
      } else {
        el.innerHTML = '' // reset
        el.textContent = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') {
        el.innerHTML = '' // reset
        newChildren.forEach(child => {
          mount(child, el)
        })
      } else {
        // diff?
        const mutualChildrenCount = Math.min(newChildren.length, oldChildren.length)

        // patch mutual children
        for (let i = 0; i < mutualChildrenCount; i++) {
          patch(newChildren[i], oldChildren[i])
        }

        if (newChildren.length > mutualChildrenCount) {
          // add new children
          newChildren.slice(oldChildren.length).forEach(child => {
            mount(child, el)
          })
        }

        if (oldChildren.length > mutualChildrenCount) {
          // remove old children
          oldChildren.slice(newChildren.length).forEach(child => {
            el.removeChild(child.el)
          })
        }
      }
    }
  } else {
    // replace
    const container = el.parentElement
    container.removeChild(el)
    mount(n1, container)
  }
}