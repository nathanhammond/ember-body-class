import Ember from 'ember';
import Route from '@ember/routing/route';
import { getTarget, addClass, removeClass } from '../utils/body-class';
import { getOwner } from '@ember/application';
import { observer } from '@ember/object';

const WeakMapReference = WeakMap || Ember.WeakMap;
const addedClasses = new WeakMapReference();

export function initialize() {
  Route.reopen({
    classNames: null,

    _targetAddClass() {
      const owner = getOwner(this);
      const target = getTarget(owner);

      const toAdd = this.get('classNames');
      addedClasses.set(this, toAdd);

      if (Array.isArray(toAdd)) {
        toAdd.forEach(function(className) {
          addClass(target, className);
        });
      }
    },

    _targetRemoveClass() {
      const owner = getOwner(this);
      const target = getTarget(owner);

      const toRemove = addedClasses.get(this);
      addedClasses.delete(this);

      if (Array.isArray(toRemove)) {
        toRemove.forEach(function(className) {
          removeClass(target, className);
        });
      }
    },

    activate() {
      this._super(...arguments);
      this._targetAddClass();
    },

    deactivate() {
      this._super(...arguments);
      this._targetRemoveClass();
    },

    _classNamesObserver: observer('classNames', function() {
      this._targetRemoveClass();
      this._targetAddClass();
    })
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
