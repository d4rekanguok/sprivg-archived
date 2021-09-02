import { render, html, useState, useEffect } from './common.js'
import { Nav } from './nav.js'
import { Block } from './block.js'
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
        const first100 = data.slice(0, 100)
        setData(first100)
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
        <ul class="list">
        ${data.map(item => {
          const isSelected = selected.indexOf(item) >= 0
          return html`
            <li key=${item}>
              <${Block} item=${item} isSelected=${isSelected} />
            </li>`
        })}
        </ul>
      </section>
    </main>
  `
}

render(html`<${App} />`, document.querySelector('#app'))