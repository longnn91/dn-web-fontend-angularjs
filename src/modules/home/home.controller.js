export default class HomeController {
  constructor(RandomNameService) {
    this.name = 'World';
    this.RandomNameService = RandomNameService;
  }

  changeName() {
    this.name = 'angular-tips';
  }

  getRandomName() {
    this.name = this.RandomNameService.getName();
  }
}

HomeController.$inject = ['RandomNameService'];
