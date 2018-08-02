import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember body class', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    assert.ok(document.body.classList.contains('yolo'), 'yolo class is set.');
  });

  test('visiting /test', async function(assert) {
    await visit('/test');
    assert.equal(currentURL(), '/test');

    assert.ok(document.body.classList.contains('yolo'), 'yolo class is set from application route.');
    assert.ok(document.body.classList.contains('another-yolo'), 'another-yolo class is set from test route.');
    assert.notOk(document.body.classList.contains('null'), 'body has no null class');
  });

  test('visiting /binding-test', async function(assert) {
    await visit('/binding-test');
    assert.equal(currentURL(), '/binding-test');

    assert.ok(document.body.classList.contains('yolo'), 'yolo class is set from application route.');
    assert.ok(document.body.classList.contains('early-binding-class'), 'Initial value is populated.');

    await click('button');

    assert.notOk(document.body.classList.contains('early-binding-class'), 'Initial value is removed.');
    assert.ok(document.body.classList.contains('late-binding-class'), 'New value is populated.');
  });
});
