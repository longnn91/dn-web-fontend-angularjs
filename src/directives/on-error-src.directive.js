export default class OnErrorSourceDirective {

  static $inject = [];
  static instance;

  static getInstance() {
    if (!OnErrorSourceDirective.instance) {
      OnErrorSourceDirective.instance = new OnErrorSourceDirective();
    }
    return OnErrorSourceDirective.instance;
  }

  constructor() {
    this.restrict = 'A';
  }

  link(scope, element, attrs) {
    element.bind('error', () => {
      if (attrs.hiddenImage && attrs.hiddenImage === 'true') {
        element.hide();
      }
      if (attrs.onErrorSrc && attrs.src !== attrs.onErrorSrc) {
        attrs.$set('src', attrs.onErrorSrc);
      } else if (!attrs.onErrorSrc) {
        attrs.$set('src', '/images/error.png');
      }
    });
  }
}
