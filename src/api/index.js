export const Post = (item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    window.localStorage.clear()
    window.localStorage.setItem('item', item)
    console.log('done')
    resolve(true)
  }, 3000);
  })
}