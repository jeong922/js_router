import AbstractView from './abstractView.js';

export default class Post extends AbstractView {
  constructor() {
    super();
    this.setTitle('post');
  }

  async getHtml() {
    return `
		<h1>Post</h1>
		`;
  }
}
