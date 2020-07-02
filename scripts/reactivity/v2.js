function reactive(raw) {
  Object.keys(raw).forEach(key => {
    const dep = new Dep()

    let value = raw[key]

    Object.defineProperty(raw, key, {
      get () {
        dep.depend()
        return value
      },
      set (newValue) {
        value = newValue
        dep.notify()
      }
    })
  })

  return raw
}