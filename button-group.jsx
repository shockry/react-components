/** @jsx React.DOM */

var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');

var outerStyle = RCSS.createClass({
    display: 'inline-block',
});

var buttonStyle = RCSS.createClass({
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderLeft: '0',
    cursor: 'pointer',
    margin: '0',
    padding: '5px 10px',
    position: 'relative', // for hover

    ':first-child': {
        borderLeft: '1px solid #ccc',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px'
    },

    ':last-child': {
        borderRight: '1px solid #ccc',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px'
    },

    ':hover': {
        backgroundColor: '#ccc'
    },

    ':focus': {
        zIndex: '2'
    }
});

var selectedStyle = RCSS.createClass({
    backgroundColor: '#ddd'
});

/* ButtonGroup is an aesthetically pleasing group of buttons.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "text": this is the text shown on the button
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with the updated value
 *     (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   value - the initial value of the button selected, defaults to null.
 *   allowEmpty - if false, exactly one button _must_ be selected; otherwise
 *     it defaults to true and _at most_ one button (0 or 1) may be selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
    propTypes: {
        value: React.PropTypes.any,
        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            text: React.PropTypes.string,
            title: React.PropTypes.string
        })).isRequired,
        onChange: React.PropTypes.func.isRequired,
        allowEmpty: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            value: null,
            allowEmpty: true
        };
    },

    render: function() {
        var value = this.props.value;
        var buttons = _(this.props.buttons).map(function(button, i)  {
                var maybeSelected = button.value === value ?
                        selectedStyle :
                        "";
                return React.DOM.button( {title:button.title,
                        id:"" + i,
                        ref:"button" + i,
                        key:"" + i,
                        className:(buttonStyle + " " + maybeSelected),
                        onClick:this.toggleSelect.bind(this, button.value)}, 
                    button.text || "" + button.value
                );
            }.bind(this));

        return React.DOM.div( {className:outerStyle}, 
            buttons
        );
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    toggleSelect: function(newValue) {
        var value = this.props.value;

        if (this.props.allowEmpty) {
            // Select the new button or unselect if it's already selected
            this.props.onChange(value !== newValue ? newValue : null);
        } else {
            this.props.onChange(newValue);
        }
    }
});

module.exports = ButtonGroup;
