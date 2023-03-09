const button = document.createElement('button');
var count = 0
button.innerHTML = `Times Clicked: ${count}`
button.addEventListener('click', () => {
  count += 1;
  button.innerHTML = `Times Clicked: ${count}`
})
class ButtonCount extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(button);
  }
}
customElements.define("button-count", ButtonCount);