import Route from '@ember/routing/route';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Route.extend(BodyClassMixin, {
  classNames: ['yolo']
});
