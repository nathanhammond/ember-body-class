import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

import { addClass, removeClass } from '../utils/body-class';

export default Mixin.create({
  actions: {
    loading(/* transition, route */) {
      const document = getOwner(this).lookup('service:-document');
      const body = document.body;
      let router = this._router || this.router;

      addClass(body, 'loading');

      router.on('didTransition', function() {
        removeClass(body, 'loading');
      });

      return true;
    },

    error: function(/* error, transition */) {
      const document = getOwner(this).lookup('service:-document');
      const body = document.body;
      let router = this._router || this.router;

      addClass(body, 'error');

      router.on('didTransition', function() {
        removeClass(body, 'error');
      });

      return true;
    }
  }
});
