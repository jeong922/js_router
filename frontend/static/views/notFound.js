import AbstractView from './abstractView.js';

export default class NotFound extends AbstractView {
  constructor() {
    super();
    this.setTitle('not found');
  }

  async getHtml() {
    return `
		<h1>not found</h1>
		`;
  }
}
