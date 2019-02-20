export default class LoginComponent {
  static $inject = ['AuthService'];

  constructor(AuthService) {
    this.AuthService = AuthService;

  }

  $onInit() {
    this.AuthService.login({ username: 'shenlong', password: 'Secret123' })
    .then((response) => {
      console.log(response);
    })
  }
}
