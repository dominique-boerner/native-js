export class AppButton extends HTMLElement {
  static EVENT_UPDATE = "app-button-update";
  static EVENT_ON_CLICK = "app-button-on-click";

  static get observedAttributes() {
    return ['label'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // styling and internal dom
    shadow.innerHTML = `
    <style>
    button {
      background: #000000;
      color: #ffffff;
      padding: 1rem 1.2rem;
      border-radius: 1rem;
      border: none;
      cursor: pointer;
    }
    </style>
    
    <button>${this.getAttribute("label")}</button>
    `;

    // set reference from shadow dom
    this.button = shadow.querySelector("button");

    // bubble event up
    // this.addEventListener("click", (e) => {
    //   this.dispatchEvent(new CustomEvent(AppButton.EVENT_ON_CLICK, {
    //     detail: { event: e },
    //     bubbles: true,
    //     composed: true
    //   }));
    // });

    // incoming render event
    this.addEventListener(AppButton.EVENT_UPDATE, (e) => {
      this.render(e);
    });
  }

  addClickListener(callback) {
    this.button.addEventListener("click", callback);
  }

  render(updateEvent) {
    const label = updateEvent.detail?.label;
    if (label) this.button.innerText = label;
  }
}

customElements.define("app-button", AppButton);
