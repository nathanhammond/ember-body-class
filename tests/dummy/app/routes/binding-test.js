import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ['early-binding-class'],

  actions: {
    addClass() {
      this.set('classNames', ['late-binding-class'])
    }
  }
});
