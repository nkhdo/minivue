const mountApp = (component, container) => {
  let isMounted = false
  let vdom
  watchEffect(() => {
    if (!isMounted) {
      // mount the app
      vdom = component.render()
      mount(vdom, container)
      isMounted = true 
    } else {
      // patch
      const newVdom = component.render()
      patch(newVdom, vdom)
      vdom = newVdom
    }
  })
}