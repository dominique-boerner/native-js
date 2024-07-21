export class AppTable extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    // styling and internal dom
    shadow.innerHTML = `
    <style>
    table {
      border-spacing: 0;
    }
    th, td {
      padding: 1rem;
    }
    thead {
      background: #000000;
    }
    
    thead tr th {
      color: white;
    }
    
    thead tr th:first-child { border-top-left-radius: .4rem; }
    thead tr th:last-child { border-top-right-radius: .4rem; }
    
    </style>
    
    <table>
      <thead>
      <tr>
      </tr>
      </thead>
      <tbody>
      <tr>
      </tr>
      </tbody>
    </table>
    `;

    // set reference from shadow dom
    this.table = shadow.querySelector("table");
    this.thead = shadow.querySelector("thead");
    this.tbody = shadow.querySelector("tbody");

    // incoming render event
    this.addEventListener(AppTableChangeEvent.EVENT_CHANGE_DATA, (event) => {
      this.render(event);
    });
  }

  /**
   * Renders the updateEvent by updating the button label.
   *
   * @param {AppTableChangeEvent} updateEvent - The update event to render.
   */
  render(updateEvent) {
    if (updateEvent.detail?.head) {
      this.renderTableHeader(updateEvent.detail.head);
    }

    if (updateEvent.detail?.rows) {
      this.renderTableBody(updateEvent.detail.rows);
    }
  }

  renderTableHeader(head) {
    this.thead.innerHTML = head.map((t) => `<th>${t}</th>`).join("");
  }

  renderTableBody(body) {
    this.tbody.innerHTML = body.map((t) => `<td>${t}</td>`).join("");
  }
}

export class AppTableChangeEvent extends CustomEvent {
  static EVENT_CHANGE_DATA = "app-table-change-data";

  /**
   * This event updates the table and re-renders their head and body.
   *
   * @param {Object} detail - The options for the AppTable.
   * @param {Array<string>} detail.head - The array representing the header of the table.
   * @param {Array<string>} detail.rows - The array representing the rows of the table.
   */
  constructor(detail = {head: [], rows: [[]]}) {
    super(AppTableChangeEvent.EVENT_CHANGE_DATA, {
      detail
    });
  }
}

customElements.define("app-table", AppTable);
