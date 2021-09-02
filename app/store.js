import { useEffect, useState } from './common.js'

const createStore = () => {
  let actions = []
  let allActions = []
  let data = []
  let listeners = []

  const subscribe = (cb) => {
    listeners.push(cb)
    return () => {
      const idx = listeners.indexOf(cb)
      listeners.splice(idx, 1)
    }
  }

  const init = async function() {
    const res = await fetch('/api/select')
    data = await res.json()
  }

  const add = (filePath) => {
    actions.push({
      action: 'add',
      filePath
    })
    listeners.forEach(cb => cb(data))
  }

  const remove = (filePath) => {
    actions.push({
      action: 'remove',
      filePath
    })
    listeners.forEach(cb => cb(data))
  }

  const toggle = (filePath) => {
    if (data.indexOf(filePath) >= 0) {
      remove(filePath)
    } else {
      add(filePath)
    }
  }

  const update = () => {
    allActions = allActions.concat(actions)
    data = actions.reduce((acc, cur) => {
      const { action, filePath } = cur
      const idx = acc.indexOf(filePath)
      if (action === 'add' && idx < 0) {
        acc.push(filePath)
      }
      if (action === 'remove' && idx >= 0) {
        acc.splice(idx, 1)
      }
      return acc
    }, data)
    actions = []
  }

  const getData = () => {
    return data
  }

  const getActions = () => {
    return allActions
  }

  subscribe(update)
  init()

  return {
    subscribe, add, remove, init, toggle, getData, getActions
  }
}

const store = createStore()
store.init();

const useStore = () => {
  const [, update] = useState(0)
  useEffect(() => {
    return store.subscribe(() => {
      update(v => (v + 1) % 2)
    })
  }, [])
  return store
}

export { useStore }