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
