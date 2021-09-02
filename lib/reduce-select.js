export const reduce = (data, actions) => {
  return actions.reduce((acc, cur) => {
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
}