import Ember from 'ember';
import Route from '@ember/routing/route';
import { addClass, removeClass } from '../utils/body-class';
import { getOwner } from '@ember/application';
import { observer } from '@ember/object';

const WeakMapReference = WeakMap || Ember.WeakMap;
const addedClasses = new WeakMapReference();

export function initialize() {
  Route.reopen({
    classNames: null,

    _bodyClassAdd() {
      const owner = getOwner(this);
      const document = owner.lookup('service:-document');
      const body = document.body;

      const toAdd = this.get('classNames');
      addedClasses.set(this, toAdd);

      if (Array.isArray(toAdd)) {
        toAdd.forEach(function(className) {
          addClass(body, className);
        });
      }
    },

    _bodyClassRemove() {
      const owner = getOwner(this);
      const document = owner.lookup('service:-document');
      const body = document.body;

      const toRemove = addedClasses.get(this);
      addedClasses.delete(this);

      if (Array.isArray(toRemove)) {
        toRemove.forEach(function(className) {
          removeClass(body, className);
        });
      }
    },

    activate() {
      this._super(...arguments);
      this._bodyClassAdd();
    },

    deactivate() {
      this._super(...arguments);
      this._bodyClassRemove();
    },

    _classNamesObserver: observer('classNames', function() {
      this._bodyClassRemove();
      this._bodyClassAdd();
    })
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
