import AbstractView from './abstractView.js';

export default class Setting extends AbstractView {
  constructor() {
    super();
    this.setTitle('setting');
  }

  async getHtml() {
    return `
		<h1>setting</h1>
		`;
  }
}
