import { html } from './common.js'
import { useStore } from './store.js'

export const Nav = () => {
  const store = useStore()
  const handleGenerate = () => {
    fetch('/api/select', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store.getActions())
    })
  }

  return html`
    <nav class="nav">
      <button class="button" onClick=${handleGenerate}>Generate</button>
    </nav>
  `
}