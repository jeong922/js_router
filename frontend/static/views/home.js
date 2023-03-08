import AbstractView from './abstractView.js';

export default class Home extends AbstractView {
  constructor() {
    super();
    this.setTitle('home');
  }

  async getHtml() {
    return `
		<h1>home</h1>
		`;
  }
}
