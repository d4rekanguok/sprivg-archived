import { html } from "./common.js"
import { useStore } from './store.js'

export const Block = ({ item, isSelected }) => {
  const store = useStore()
  return html`
    <figure class="block">
      <button
        class="block-button"
        onClick=${() => store.toggle(item)}
        data-selected=${isSelected}
      >
        <img class="block-image" key=${item} src=${item} />
      </button>
    </figure>
  `;
};
