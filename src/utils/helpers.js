export const debounce = (func, ms) => {
  let timeout
  return function (...args) {
    const context = this

    const lastCall = () => {
      timeout = null
      func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(lastCall, ms)
  }
}

export const getBrowserScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}
