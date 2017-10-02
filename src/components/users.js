class Users {
  constructor() {
    this.users = []
    this.initBindingsAndEventListeners()
    this.adapter = new UsersAdapter()
    this.fetchAndLoadUsers()
  }

  initBindingsAndEventListeners() {
    this.usersForm = document.getElementById('new-user-form')
    this.userInput = document.getElementById('new-user-body')
    this.usersNode = document.getElementById('users-container')
    this.usersForm.addEventListener('submit',this.handleAddUser.bind(this))
    this.usersNode.addEventListener('click',this.handleDeleteUser.bind(this))
  }

  fetchAndLoadUser() {
    this.adapter.getUsers()
    .then( usersJSON => usersJSON.forEach( user => this.users.push( new User(user) )))
      .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
  }

  handleAddUser() {
    event.preventDefault()
    const body = this.userInput.value
    this.adapter.createUser(body)
    .then( (userJSON) => this.users.push(new User(userJSON)) )
    .then(  this.render.bind(this) )
    .then( () => this.userInput.value = '' )
  }

  handleDeleteUser() {
    if (event.target.dataset.action === 'delete-user' && event.target.parentElement.classList.contains("user-element")) {
      const userId = event.target.parentElement.dataset.userid
      this.adapter.deleteUser(userId)
      .then( resp => this.removeDeletedUser(resp) )
    }
  }

  removeDeletedUser(deleteResponse) {
    this.users = this.users.filter( user => user.id !== deleteResponse.userId )
    this.render()
  }

  usersHTML() {
    return this.users.map( user => user.render() ).join('')
  }



  render() {

    this.usersNode.innerHTML = `<ul>${this.usersHTML()}</ul>`
  }

}
