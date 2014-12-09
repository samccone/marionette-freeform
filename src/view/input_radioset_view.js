define(function(require) {
	'use strict';

	var Marionette = require('marionette');
	var Element = require('src/model/element');


	var InputRadiosetView = Marionette.CollectionView.extend({

		_class: 'InputRadiosetView',

		tagName: 'fieldset',

		getChildView: function() {
			// circular dependency
			var ElementView = require('./element_view');
			return ElementView;
		},

		constructor: function(options) {
			// validate model
			if (! (options.model instanceof Element)) throw new Error('InputView requires an Element model.');

			options.collection = options.model.get('values');

			Marionette.CollectionView.call(this, options);

			// listen for external changes to the model
			this.listenTo(this.model, 'change:value', this.onModelChangeValue);

			// these steps allow the view to consume an existing dom element
			this.listenTo(this, 'render', this.setAttributes);
			var className = this.model.get('className');
			if (className) this.$el.addClass(className);

		},

		xtriggers: {},

		xchildTriggers: {
			'change': 'child:change'
		},

		xonChildChange: function() {
			// debugger;
		},

		xonInputChange: function() {
			var value = this.getInputValue();
			this.model.set('value', value, { from: this });
		},

		getInputValue: function() {
			return this.$el.val();
		},
		setInputValue: function(value) {
			return this.$el.val(value);
		},

		xonModelChangeValue: function(model, value, options) {
			if (options.from !== this) {
				this.$el.val(value);
			}
		}
	});

	return InputRadiosetView;

});
