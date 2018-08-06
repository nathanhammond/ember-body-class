[![npm version](https://badge.fury.io/js/ember-body-class2.svg)](http://badge.fury.io/js/ember-body-class2)
[![Travis CI](https://travis-ci.org/nathanhammond/ember-body-class.svg)](https://travis-ci.org/nathanhammond/ember-body-class)

# ember-body-class2

Easily add CSS classes on the `<body>`, including route names as well as loading and error states.

`npm install --save ember-body-class2`

This is a fork of [ember-body-class](https://github.com/stonecircle/ember-body-class). Differences:
- It removes API surface in favor of moving to a declarative pattern. This reduces the likelihood of class naming collisions.
- It does not branch for FastBoot.
- It also addresses bugs which have remained unadressed in the original.

## Usage

### Custom Classes
All routes have a `classNames` attribute of type `Array`. If you wanted to add a
class `strawberry-jam` to your route, it would look like this:

```js
import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ['strawberry-jam']
});
```

### Loading & Error Classes

Adding the `loading` and `error` classes requires you to include a mixin in your
application route. Include it like this:

```js
// app/routes/application.js
import Route from '@ember/routing/route';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Route.extend(BodyClassMixin, {
  // Add any other customizations you may have here.
});
```

### Add Class Name to Each Route

This is not recommended. The preference should be to attach a `classNames` property to each route that needs it. This is for two reasons:

- Routes may have the same names, making it not a unique identifier.
- If you relocate your route, the class name could change, resulting in unexpected CSS output changes.

Selecting your own class name on a per-route basis sidesteps both of these concerns. However, since that is still possibly a need in applications, here is an example of how it could be done:

```js
// app/initializers/route-class-name.js
import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export function initialize() {
    Route.reopen({
        classNames: computed(function() {
            const routeName = this.get('routeName');
            if (routeName === 'application') {
                return;
            }
            return [routeName.replace(/\./g, '-')];
        })
    });
}

export default {
  initialize
};
```
