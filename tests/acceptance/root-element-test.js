import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { getTarget } from 'ember-body-class/utils/body-class';

module('Acceptance | ember body class', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    const config = this.owner.resolveRegistration('config:environment');
    config['ember-body-class'] = { useRootElement: true };

    this.owner.resolveRegistration = function() { return config; };
  });

  test('visiting /', async function(assert) {
    const target = getTarget(this.owner);

    await visit('/');
    assert.equal(currentURL(), '/');

    assert.ok(target.classList.contains('yolo'), 'yolo class is set.');
  });

  test('visiting /test', async function(assert) {
    const target = getTarget(this.owner);

    await visit('/test');
    assert.equal(currentURL(), '/test');

    assert.ok(target.classList.contains('yolo'), 'yolo class is set from application route.');
    assert.ok(target.classList.contains('another-yolo'), 'another-yolo class is set from test route.');
    assert.notOk(target.classList.contains('null'), 'body has no null class');
  });

  test('visiting /binding-test', async function(assert) {
    const target = getTarget(this.owner);

    await visit('/binding-test');
    assert.equal(currentURL(), '/binding-test');

    assert.ok(target.classList.contains('yolo'), 'yolo class is set from application route.');
    assert.ok(target.classList.contains('early-binding-class'), 'Initial value is populated.');

    await click('button');

    assert.notOk(target.classList.contains('early-binding-class'), 'Initial value is removed.');
    assert.ok(target.classList.contains('late-binding-class'), 'New value is populated.');
  });
});
