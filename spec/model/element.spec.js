/* global describe, it, expect, beforeEach */
/* jshint expr: true */
define(function(require) {
	'use strict';

	var Element = require('src/model/element');

	describe('Element', function() {

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

			it('should throw an error', function() {
				expect(this.error).to.exist;
				expect(this.error.message).to.equal('Element requires a type.');
			});

		});

		describe('with type text', function() {
			beforeEach(function() {
				this.options = { type: 'text' };
				this.element = new Element(this.options);
			});

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
			});
			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});

		});

		describe('with type password', function() {
			beforeEach(function() {
				this.options = { type: 'password' };
				this.element = new Element(this.options);
			});

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
			});
			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});

		});

		describe('with type textarea', function() {
			beforeEach(function() {
				this.options = { type: 'textarea' };
				this.element = new Element(this.options);
			});

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
			});
			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});

		});

		describe('with type select', function() {
			beforeEach(function() {
				this.options = { type: 'select' };
				this.element = new Element(this.options);
			});

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
			});
			it('should have a default value of ""', function() {
				expect(this.element.get('value')).to.equal('');
			});
			it('should have show_label_before set to true', function() {
				expect(this.element.get('show_label_before')).to.be.true;
			});

		});

		describe('with type checkbox', function() {
			beforeEach(function() {
				this.options = { type: 'checkbox' };
				this.element = new Element(this.options);
			});

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
			});
			it('should have a default value of false', function() {
				expect(this.element.get('value')).to.be.false;
			});
			it('should have show_label_before set to null', function() {
				expect(this.element.get('show_label_before')).to.be.null;
			});
			it('should have show_label_after set to true', function() {
				expect(this.element.get('show_label_after')).to.be.true;
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
					expect(this.error.message).to.equal('Element requires a type.');
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
					expect(this.error.message).to.equal('Element requires a type.');
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

				it('should be valid', function() {
					expect(this.element.isValid()).to.be.true;
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
			});

		});

		describe('with type submit, reset, or button', function() {
			beforeEach(function() {
				this.submit_element = new Element({ type: 'submit' });
				this.reset_element = new Element({ type: 'reset' });
				this.button_element = new Element({ type: 'button' });
			});

			it('should be valid', function() {
				expect(this.submit_element.isValid()).to.be.true;
				expect(this.reset_element.isValid()).to.be.true;
				expect(this.button_element.isValid()).to.be.true;
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

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
			});
			it('should not throw an error', function() {
				expect(this.error).to.be.null;
			});
		});

		describe('with a related model and related key', function() {
			this.timeout(0); // DNR

			beforeEach(function() {
				this.error = null;
				this.related_model = new Backbone.Model({ foo: 'related_value' });
				this.new_related_model = new Backbone.Model({ foo: 'new_related_value' });
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

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
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
			it('should not throw an error if initial value is invalid', function() {
				var element;
				var error;
				var RelatedModel = Backbone.Model.extend({
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
				this.validatorSpy = this.sinon.spy(related_model.validators, 'foo');
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
				var RelatedModel = Backbone.Model.extend({
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

				element.set('value','foo');
				expect(element.get('error')).to.equal('Error message from related model.');
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
			});

		});

		describe('with a related model but no related key', function() {
			beforeEach(function() {
				this.error = null;
				this.related_model = new Backbone.Model({ foo: 'related_value' });
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

			it('should be valid', function() {
				expect(this.element.isValid()).to.be.true;
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