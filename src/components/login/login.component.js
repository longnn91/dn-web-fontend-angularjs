export default class LoginComponent {
  static $inject = ['AuthService'];

  constructor(AuthService) {
    this.AuthService = AuthService;
  }

  $onInit() {
    let data = { username: 'shenlong', password: 'Secret123', type:"origin" };
    this.AuthService.login(data).then((response) => {
      console.log(response);
    })
  }
}
