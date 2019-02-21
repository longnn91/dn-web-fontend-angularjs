export default class ProductController {
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

ProductController.$inject = ['RandomNameService'];
