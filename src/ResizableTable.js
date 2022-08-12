import { html, css, LitElement } from 'lit';

export class ResizableTable extends LitElement {
  static styles = css`
    .table {
      border-collapse: collapse;
      width: 100vw;
    }
    .table,
    .table th,
    .table td {
      border: 1px solid #ccc;
    }
    .table th,
    .table td {
      padding: 0.5rem;
    }
    .table th {
      position: relative;
    }
    .resizer {
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      cursor: col-resize;
      user-select: none;
    }
    .resizer:hover,
    .resizing {
      border-right: 1px dashed gray;
    }
  `;

  static properties = {
    _height: { type: Number },
    resizable: { type: Boolean },
  };

  constructor() {
    super();
    this._x = 0;
    this._w = 0;
    this._isDown = false;
  }

  render() {
    return html`
      <table
        id="resizeMe"
        class="table"
        @mousedown=${this._onMouseDown}
        @mouseup=${this._onMouseUp}
      >
        <thead>
          <tr>
            <th>
              No.
              <div class="resizer" style="height: ${this._height}px" id="th-0"></div>
            </th>
            <th>
              First name
              <div class="resizer" style="height: ${this._height}px" id="th-1"></div>
            </th>
            <th>
              Last name
              <div class="resizer" style="height: ${this._height}px" id="th-2"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Andrea</td>
            <td>Ross</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Penelope</td>
            <td>Mills</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Sarah</td>
            <td>Grant</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Vanessa</td>
            <td>Roberts</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Oliver</td>
            <td>Alsop</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Jennifer</td>
            <td>Forsyth</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Michelle</td>
            <td>King</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Steven</td>
            <td>Kelly</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Julian</td>
            <td>Ferguson</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Chloe</td>
            <td>Ince</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  updated() {
    this._height = this.shadowRoot.getElementById('resizeMe').offsetHeight;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousemove', this._onMouseMove);
  }

  disconnectedCallback() {
    document.RemoveEventListener('mousemove', this._onMouseMove);
    super.disconnectedCallback();
  }

  _onMouseDown(e) {
    console.log('RESIZABLE?', this.resizable);
    if (this.resizable) {
      if (e.target.classList.contains('resizer')) {
        this._which = e.target.id.split('-')[1];
        this._isDown = true;
        this._x = e.clientX;
  
        this._styles = window.getComputedStyle(e.path[1]);
        this._w = parseInt(this._styles.width, 10);
  
        e.target.classList.add('resizing');
      }
    }
  }

  _onMouseUp(e) {
    console.log('RESIZABLE?', this.resizable);
    if (this.resizable) {
      if (this._isDown) this._isDown = false;
      if (this.shadowRoot.querySelector('.resizing')) {
        this.shadowRoot.querySelector('.resizing').classList.remove('resizing');
      }
    }
  }

  _onMouseMove(e) {
    let _this = document.getElementById('resizable-table');
    console.log('RESIZABLE?', _this.resizable);
    if (_this.resizable) {
      if (_this._isDown) {
        const dx = e.clientX - _this._x;
        const ths = _this.shadowRoot.querySelectorAll('th');
        const th = ths[_this._which];
        th.style.width = `${_this._w + dx}px`;
      }
    }
  }
}
