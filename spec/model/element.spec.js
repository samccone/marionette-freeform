/* global describe, it, expect, beforeEach */
/* jshint expr: true */
define(function(require) {
	'use strict';

	var Model = require('src/model/model');
	var Element = require('src/model/element');
	var ElementList = require('src/model/element_list');
	var log = require('src/lib/log'); /* jshint ignore: line */

	describe('Element', function() {
		this.timeout(0);

		describe('with no type', function() {
			beforeEach(function() {
				this.error = null;
				this.options = { foo: 'bar' };
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not exist', function() {
				expect(this.element).to.not.exist;
			});
			it('should throw an error', function() {
				expect(this.error).to.exist;
				expect(this.error.message).to.equal('Element requires a valid type.');
			});

		});

		describe('with a null type', function() {
			beforeEach(function() {
				this.error = null;
				this.options = { type: null };
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not exist', function() {
				expect(this.element).to.not.exist;
			});
			it('should throw an error', function() {
				expect(this.error).to.exist;
				expect(this.error.message).to.equal('Element requires a valid type.');
			});

		});

		describe('with type as an empty string', function() {
			beforeEach(function() {
				this.error = null;
				this.options = { type: '' };
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not exist', function() {
				expect(this.element).to.not.exist;
			});
			it('should throw an error', function() {
				expect(this.error).to.exist;
				expect(this.error.message).to.equal('Element requires a valid type.');
			});

		});

		describe('with an invalid type', function() {
			beforeEach(function() {
				this.error = null;
				this.options = { type: 'foo' };
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not exist', function() {
				expect(this.element).to.not.exist;
			});
			it('should throw an error', function() {
				expect(this.error).to.exist;
				expect(this.error.message).to.equal('Element requires a valid type.');
			});

		});

		describe('with type text', function() {
			beforeEach(function() {
				this.options = { type: 'text' };
				this.element = new Element(this.options);
			});

			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});
			it('should have show_error set to true', function() {
				expect(this.element.get('show_error')).to.be.true;
			});

		});

		describe('with type password', function() {
			beforeEach(function() {
				this.options = { type: 'password' };
				this.element = new Element(this.options);
			});

			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});
			it('should have show_error set to true', function() {
				expect(this.element.get('show_error')).to.be.true;
			});

		});

		describe('with type textarea', function() {
			beforeEach(function() {
				this.options = { type: 'textarea' };
				this.element = new Element(this.options);
			});

			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});
			it('should have show_error set to true', function() {
				expect(this.element.get('show_error')).to.be.true;
			});

		});

		describe('with type select', function() {
			describe('with no values', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'select',
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should not exist', function() {
					expect(this.element).to.not.exist;
				});
				it('should throw an error', function() {
					expect(this.error).to.exist;
					expect(this.error.message).to.equal('Select Element requires a list of values.');
				});
			});
			describe('with an empty values array', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'select',
						values: []
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should exist', function() {
					expect(this.element).to.exist;
				});
				it('should not throw an error', function() {
					expect(this.error).to.not.exist;
				});
				it('should have a default value of ""', function() {
					expect(this.element.get('value')).to.equal('');
				});
				it('should have show_label_before set to true', function() {
					expect(this.element.get('show_label_before')).to.be.true;
				});			});
			describe('with a values array', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'select',
						values: [
							{ value: 'foo', label: 'Foo' },
							{ value: '', label: 'None' },
							{ value: 'bar', label: 'Bar' },
						]
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should exist', function() {
					expect(this.element).to.exist;
				});
				it('should not throw an error', function() {
					expect(this.error).to.not.exist;
				});
				it('should convert values array to a Collection', function() {
					expect(this.element.get('values') instanceof Backbone.Collection).to.be.true;
				});
				it('should have a default value of ""', function() {
					expect(this.element.get('value')).to.equal('');
				});
				it('should have show_label_before set to true', function() {
					expect(this.element.get('show_label_before')).to.be.true;
				});
				it('should have show_error set to true', function() {
					expect(this.element.get('show_error')).to.be.true;
				});
				it('should set "selected" to true on the first matching option', function() {
					expect(this.element.get('values').at(1).get('selected')).to.be.true;
				});
			});
			describe('with a values collection', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'select',
						values: new Backbone.Collection([
							{ value: 'foo', label: 'Foo' },
							{ value: '', label: 'None' },
							{ value: 'bar', label: 'Bar' },
						])
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should exist', function() {
					expect(this.element).to.exist;
				});
				it('should not throw an error', function() {
					expect(this.error).to.not.exist;
				});
				it('should have a default value of ""', function() {
					expect(this.element.get('value')).to.equal('');
				});
				it('should have show_label_before set to true', function() {
					expect(this.element.get('show_label_before')).to.be.true;
				});
				it('should have show_error set to true', function() {
					expect(this.element.get('show_error')).to.be.true;
				});
				it('should set "selected" to true on the first matching option', function() {
					expect(this.element.get('values').at(1).get('selected')).to.be.true;
				});
			});

		});

		describe('with type checkbox', function() {
			beforeEach(function() {
				this.options = { type: 'checkbox' };
				this.element = new Element(this.options);
			});

			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to null', function() {
				expect(this.element.get('show_label_before')).to.be.null;
			});
			it('should have show_label_after set to true', function() {
				expect(this.element.get('show_label_after')).to.be.true;
			});
			it('should have show_error set to true', function() {
				expect(this.element.get('show_error')).to.be.true;
			});

		});

		describe('with type radio', function() {
			describe('with no value defined', function() {
				beforeEach(function() {
					this.error;
					this.options = { type: 'radio' };
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should not exist', function() {
					expect(this.element).to.not.exist;
				});
				it('should throw an error', function() {
					expect(this.error).to.exist;
					expect(this.error.message).to.equal('Radio Element requires a value.');
				});
			});
			describe('with a value defined', function() {
				beforeEach(function() {
					this.options = { type: 'radio', value: '' };
					this.element = new Element(this.options);
				});

				it('should have "checked" set to false by default', function() {
					expect(this.element.get('checked')).to.be.false;
				});
				it('should have show_label_before set to null', function() {
					expect(this.element.get('show_label_before')).to.be.null;
				});
				it('should have show_label_after set to true', function() {
					expect(this.element.get('show_label_after')).to.be.true;
				});
			});

		});

		describe('with type radioset', function() {
			describe('with no values', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'radioset',
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should not exist', function() {
					expect(this.element).to.not.exist;
				});
				it('should throw an error', function() {
					expect(this.error).to.exist;
					expect(this.error.message).to.equal('Radioset Element requires a list of values.');
				});
			});
			describe('with a values array', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'radioset',
						values: [
							{ value: '', label: 'None' },
							{ value: 'foo', label: 'Foo' },
							{ value: '', label: 'Bar' },
						]
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should exist', function() {
					expect(this.element).to.exist;
				});
				it('should not throw an error', function() {
					expect(this.error).to.not.exist;
				});
				it('should have a default value of ""', function() {
					expect(this.element.get('value')).to.equal('');
				});
				it('should have show_label_before set to true', function() {
					expect(this.element.get('show_label_before')).to.be.true;
				});
				it('should have show_error set to true', function() {
					expect(this.element.get('show_error')).to.be.true;
				});
				it('should convert values array to an ElementList', function() {
					var values = this.element.get('values');
					expect(values instanceof ElementList).to.be.true;
				});
				it('should set "type" of each child radio to "radio"', function() {
					var values = this.element.get('values');
					var types = values.pluck('type');
					expect(_.isArray(types)).to.be.true;
					_.each(types, function(type) {
						expect(type).to.equal('radio');
					});
				});
				it('should set "name" of each child radio to its cid', function() {
					var values = this.element.get('values');
					var names = values.pluck('name');
					expect(_.isArray(names)).to.be.true;
					_.each(names, function(name) {
						expect(name).to.equal(this.element.cid);
					}, this);
				});
				it('should set "checked" to true for first child radio with same value', function() {
					var values = this.element.get('values');
					var same_value = values.findWhere({value: this.element.get('value')});
					// check that the test is setup correctly
					// one of the test values defined in beforeEach above should have a matching value
					expect(same_value).to.exist;
					expect(same_value.get('checked')).to.be.true;
				});
				it('should not set "checked" to true for any other child radios but the first match', function() {
					var values = this.element.get('values');
					var same_value = values.findWhere({value: this.element.get('value')});
					// check that the test is setup correctly
					// one of the test values defined in beforeEach above should have a matching value
					expect(same_value).to.exist;
					var others = values.filter(function(value) {
						return (value !== same_value);
					});
					expect(_.isArray(others)).to.be.true;
					expect(others.length).to.equal(2); // test data validation
					_.each(others, function(other) {
						expect(other.get('checked')).to.be.false;
					});
				});
				it('should set disabled on each child radio when disabled');
			});
			describe('with a values backbone.collection', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'radioset',
						values: new Backbone.Collection([
							{ value: '', label: 'None' },
							{ value: 'foo', label: 'Foo' },
							{ value: 'bar', label: 'Bar' },
						])
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should exist', function() {
					expect(this.element).to.exist;
				});
				it('should not throw an error', function() {
					expect(this.error).to.not.exist;
				});
				it('should have a default value of ""', function() {
					expect(this.element.get('value')).to.equal('');
				});
				it('should have show_label_before set to true', function() {
					expect(this.element.get('show_label_before')).to.be.true;
				});
				it('should have show_error set to true', function() {
					expect(this.element.get('show_error')).to.be.true;
				});
				it('should convert values collection to an ElementList', function() {
					var values = this.element.get('values');
					expect(values instanceof ElementList).to.be.true;
				});
				it('should set "type" of each child radio to "radio"', function() {
					var values = this.element.get('values');
					var types = values.pluck('type');
					expect(_.isArray(types)).to.be.true;
					_.each(types, function(type) {
						expect(type).to.equal('radio');
					});
				});
				it('should set "name" of each child radio to its cid', function() {
					var values = this.element.get('values');
					var names = values.pluck('name');
					expect(_.isArray(names)).to.be.true;
					_.each(names, function(name) {
						expect(name).to.equal(this.element.cid);
					}, this);
				});
				it('should set "checked" to true for first child radio with same value', function() {
					var values = this.element.get('values');
					var same_value = values.findWhere({value: this.element.get('value')});
					// check that the test is setup correctly
					// one of the test values defined in beforeEach above should have a matching value
					expect(same_value).to.exist;
					expect(same_value.get('checked')).to.be.true;
				});
				it('should not set "checked" to true for any other child radios but the first match', function() {
					var values = this.element.get('values');
					var same_value = values.findWhere({value: this.element.get('value')});
					// check that the test is setup correctly
					// one of the test values defined in beforeEach above should have a matching value
					expect(same_value).to.exist;
					var others = values.filter(function(value) {
						return (value !== same_value);
					});
					expect(_.isArray(others)).to.be.true;
					expect(others.length).to.equal(2); // test data validation
					_.each(others, function(other) {
						expect(other.get('checked')).to.be.false;
					});
				});
				it('should set disabled on each child radio when disabled');
			});
		});

		describe('with type buttonfield', function() {
			describe('with no input', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'buttonfield',
						button: {
							type: 'submit',
						}
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should not exist', function() {
					expect(this.element).to.not.exist;
				});
				it('should throw an error', function() {
					expect(this.error).to.exist;
					expect(this.error.message).to.equal('Buttonfield Element requires an input and a button.');
				});
			});
			describe('with no button', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'buttonfield',
						input: {
							type: 'text',
						}
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should not exist', function() {
					expect(this.element).to.not.exist;
				});
				it('should throw an error', function() {
					expect(this.error).to.exist;
					expect(this.error.message).to.equal('Buttonfield Element requires an input and a button.');
				});
			});
			describe('with input and button', function() {
				beforeEach(function() {
					this.error = null;
					this.options = {
						type: 'buttonfield',
						input: {
							type: 'text',
						},
						button: {
							type: 'submit',
						}
					};
					try {
						this.element = new Element(this.options);
					} catch(e) {
						this.error = e;
					}
				});

				it('should not throw an error', function() {
					expect(this.error).to.be.null;
				});
				it('should have a default value of ""', function() {
					expect(this.element.get('value')).to.equal('');
				});
				it('should have show_label_before set to true', function() {
					expect(this.element.get('show_label_before')).to.be.true;
				});
				it('should have show_error set to true', function() {
					expect(this.element.get('show_error')).to.be.true;
				});
			});

		});

		describe('with type submit, reset, or button', function() {
			beforeEach(function() {
				this.submit_element = new Element({ type: 'submit' });
				this.reset_element = new Element({ type: 'reset' });
				this.button_element = new Element({ type: 'button' });
			});

			it('should have a default label matching its type', function() {
				expect(this.submit_element.get('label')).to.equal('Submit');
				expect(this.reset_element.get('label')).to.equal('Reset');
				expect(this.button_element.get('label')).to.not.exist;
			});
			it('should have show_label_before set to false', function() {
				expect(this.submit_element.get('show_label_before')).to.be.false;
				expect(this.reset_element.get('show_label_before')).to.be.false;
				expect(this.button_element.get('show_label_before')).to.be.false;
			});
			it('should have show_label_after set to false', function() {
				expect(this.submit_element.get('show_label_after')).to.be.false;
				expect(this.reset_element.get('show_label_after')).to.be.false;
				expect(this.button_element.get('show_label_after')).to.be.false;
			});
			it('should have show_error set to false', function() {
				expect(this.submit_element.get('show_error')).to.be.false;
				expect(this.reset_element.get('show_error')).to.be.false;
				expect(this.button_element.get('show_error')).to.be.false;
			});

		});

		describe('with a bad related model', function() {
			beforeEach(function() {
				this.error = null;
				this.bad_model = { foo: 'bar' };
				this.options = {
					type: 'text',
					related_key: 'foo',
					related_model: this.bad_model
				};
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not exist', function() {
				expect(this.element).to.not.exist;
			});
			it('should throw an error', function() {
				expect(this.error).to.exist;
				expect(this.error.message).to.equal('Related model must be a model.');
			});
		});

		describe('with no related model', function() {
			beforeEach(function() {
				this.error = null;
				this.options = {
					type: 'text'
				};
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not throw an error', function() {
				expect(this.error).to.be.null;
			});
		});

		describe('with a related model and related key', function() {
			this.timeout(0); // DNR

			beforeEach(function() {
				this.error = null;
				this.related_model = new Model({ foo: 'related_value' });
				this.new_related_model = new Model({ foo: 'new_related_value' });
				this.options = {
					type: 'text',
					related_key: 'foo',
					related_model: this.related_model
				};
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not throw an error', function() {
				expect(this.error).to.be.null;
			});
			it('should get its initial value from the related model', function() {
				expect(this.element.get('value')).to.equal('related_value');
			});
			it('element value should get updated when the related value changes', function() {
				this.related_model.set('foo','related_changed_value');
				expect(this.element.get('value')).to.equal('related_changed_value');
			});
			it('related value should get updated when the element value changes', function() {
				this.element.set('value','element_changed_value');
				expect(this.related_model.get('foo')).to.equal('element_changed_value');
			});
			it('related value should get not updated when the element value is invalid', function() {
				// add a validator that always returns an error message
				this.related_model.validators = {
					'foo': function() { return 'invalid'; }
				};
				this.element.set('value','element_changed_value');
				expect(this.related_model.get('foo')).to.equal('related_value');
			});
			it('should not throw an error if initial value is invalid', function() {
				var element;
				var error;
				var RelatedModel = Model.extend({
					validators: {
						'foo': function(foo) {
							// this validator always fails, to prove the test
							return 'Value is erroneous.';
						}
					}
				});
				var related_model = new RelatedModel({
					foo: 'bar',
				});
				var options = {
					type: 'text',
					related_key: 'foo',
					related_model: related_model
				};
				try {
					element = new Element(options);
				} catch(e) {
					error = e;
				}

				expect(error).to.not.exist;
				expect(element).to.exist;
			});
			it('should set element.error to related_model.validationError', function() {
				var element;
				var error;
				var RelatedModel = Model.extend({
					validators: {
						'foo': function(foo) {
							// this validator always fails, to prove the test
							return 'Error message from related model.';
						}
					}
				});
				var related_model = new RelatedModel({
					foo: 'bar',
				});
				this.validator_spy = this.sinon.spy(related_model.validators, 'foo');
				var options = {
					type: 'text',
					related_key: 'foo',
					related_model: related_model
				};
				try {
					element = new Element(options);
				} catch(e) {
					error = e;
				}

				element.set('value', 'foo');
				expect(this.validator_spy).to.have.been.calledWith('foo');
				expect(element.get('error')).to.equal('Error message from related model.');
			});

			describe('when related model doesn’t have per-attribute validation', function() {
				beforeEach(function() {
					this.console_spy = this.sinon.spy(window.console, 'error');
					this.related_model = new Backbone.Model({ foo: 'related_value' });
					this.options = {
						type: 'text',
						related_key: 'foo',
						related_model: this.related_model
					};
					this.element = new Element(this.options);
				});

				it('should log an error to console', function() {
					expect(this.console_spy).to.have.been.calledWith('Related model doesn’t have a validateAttribute method.');
				});
			});


			describe('when related model changes', function() {
				it('should update its values', function() {
					expect(this.element.get('value')).to.equal('related_value');
					this.element.set('related_model', this.new_related_model);
					expect(this.element.get('value')).to.equal('new_related_value');
				});
				it('should stop listening to the old related model', function() {
					expect(this.element.get('value')).to.equal('related_value');
					this.element.set('related_model', this.new_related_model);
					expect(this.element.get('value')).to.equal('new_related_value');
					this.related_model.set('foo', 'bar');
					expect(this.element.get('value')).to.equal('new_related_value');
				});
				describe('when new related model doesn’t have per-attribute validation', function() {
					beforeEach(function() {
						this.console_spy = this.sinon.spy(window.console, 'error');
						this.related_model = new Model({ foo: 'related_value' });
						this.options = {
							type: 'text',
							related_key: 'foo',
							related_model: this.related_model
						};
						this.element = new Element(this.options);
					});
					it('should log an error to console', function() {
						this.element.set('related_model', new Backbone.Model());
						expect(this.console_spy).to.have.been.calledWith('Related model doesn’t have a validateAttribute method.');
					});
				});

			});

		});

		describe('with a related model but no related key', function() {
			beforeEach(function() {
				this.error = null;
				this.related_model = new Model({ foo: 'related_value' });
				this.options = {
					type: 'text',
					value: 'element_value',
					related_model: this.related_model
				};
				try {
					this.element = new Element(this.options);
				} catch(e) {
					this.error = e;
				}
			});

			it('should not throw an error', function() {
				expect(this.error).to.be.null;
			});
			it('should not get its initial value from the related model', function() {
				expect(this.element.get('value')).to.equal('element_value');
			});
		});


	});

});
