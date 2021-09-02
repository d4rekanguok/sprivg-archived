import { render, html, useState, useEffect } from './common.js'
import { Nav } from './nav.js'
import { useStore } from './store.js'

const App = () => {
  const [data, setData] = useState([])
  const store = useStore()
  const selected = store.getData()
  useEffect(() => {
    const getSvgs = async () => {
      try {
        const res = await fetch('/api/svg')
        const data = await res.json()
        const first20 = data.slice(0, 20)
        setData(first20)
      } catch(err) {
        // do nothing
      }
    }

    getSvgs()
  }, [])

  return html`
    <main>
      <${Nav} />
      <section>
        ${data.map(item => {
          const isSelected = selected.indexOf(item) >= 0
          return html`
            <button onClick=${() => store.toggle(item)} style=${{ border: isSelected ? '1px solid blue' : 'none' }}>
              <img key=${item} src=${item} />
            </button>
          `
        })}
      </section>
    </main>
  `
}

render(html`<${App} />`, document.querySelector('#app'))