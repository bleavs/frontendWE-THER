class User {
  constructor(userJSON) {
    this.body = userJSON.body
    this.id = userJSON.id
  }

  render() {
    return `<li data-userid='${this.id}' data-props='${JSON.stringify(this)}' class='user-element'>${this.body} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
  }
}
