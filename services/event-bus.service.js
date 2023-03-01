export const eventBus = {
    on,
    emit,
    showSuccessMsg,
    showErrorMsg,
  }
  
  function on(eventName, listener) {
    const callListener = ({ detail }) => {
      listener(detail)
    }
    window.addEventListener(eventName, callListener)
    return () => {
      window.removeEventListener(eventName, callListener)
    }
  }
  
  function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
  }
  
  function showSuccessMsg(txt) {
    emit('show-msg', { txt, type: 'success' })
  }
  
  function showErrorMsg(txt) {
    emit('show-msg', { txt, type: 'error' })
  }