import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

import { getTarget, addClass, removeClass } from '../utils/body-class';

export default Mixin.create({
  actions: {
    loading(/* transition, route */) {
      const owner = getOwner(this);
      const target = getTarget(owner);

      addClass(target, 'loading');

      this.router.on('didTransition', function() {
        removeClass(target, 'loading');
      });

      return true;
    },

    error: function(/* error, transition */) {
      const owner = getOwner(this);
      const target = getTarget(owner);

      addClass(target, 'error');

      this.router.on('didTransition', function() {
        removeClass(target, 'error');
      });

      return true;
    }
  }
});
