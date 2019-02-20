export default class RandomNameService {
  constructor() {
    this.names = ['Chang', 'Tho', 'De', 'Heo', 'Chuot'];
  }

  getName() {
    let nameIndex = Math.floor( Math.random() * this.names.length);
    return this.names[nameIndex] || this.names[0];
  }
}
