'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dropdown = require('./dropdown.js');

var _dropdown2 = _interopRequireDefault(_dropdown);

var _selectPanel = require('./select-panel.js');

var _selectPanel2 = _interopRequireDefault(_selectPanel);

var _getString = require('./get-string.js');

var _getString2 = _interopRequireDefault(_getString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * This component is designed to be a multi-selct component which supports
 * the selection of several items in a picklist.  It was meant to mimic the
 * style of react-select but the multi-select behavior didn't work for our
 * our needs.
 *
 * Arguments:
 * - options: The {value, label}[] options to be displayed
 * - values: The currently selected values []
 * - onSelectedChanged: An event to notify the caller of new values
 * - valueRenderer: A fn to support overriding the message in the component
 * - isLoading: Show a loading indicator
 */


var MultiSelect = function (_Component) {
    _inherits(MultiSelect, _Component);

    function MultiSelect() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MultiSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            expanded: false,
            expandedStyle: {},
            wrapperStyle: {}
        }, _this.containerRef = null, _this.dropdownRef = null, _this.backDropRef = null, _this.contentHeight = 0, _this.handleSelectedChanged = function (selected) {
            var _this$props = _this.props,
                onSelectedChanged = _this$props.onSelectedChanged,
                disabled = _this$props.disabled;


            if (disabled) {
                return;
            }

            if (onSelectedChanged) {
                onSelectedChanged(selected);
            }
        }, _this.handleToggleExpanded = function (expanded) {
            if (expanded) {
                if (_this.dropdownRef && _this.dropdownRef.dropdownContentRef) {
                    var clientHeight = document.body.clientHeight;

                    var containerOffset = _this.containerRef.getBoundingClientRect();
                    var contentOffset = _this.dropdownRef.dropdownContentRef.getBoundingClientRect();

                    _this.backDropRef.style.display = 'block';
                    var backDropOffset = _this.backDropRef.getBoundingClientRect();
                    var dropdownContentRef = _this.dropdownRef.dropdownContentRef;

                    _this.backDropRef.appendChild(dropdownContentRef);
                    dropdownContentRef.style.minWidth = containerOffset.width + 'px';
                    dropdownContentRef.style.top = '';
                    if (clientHeight < containerOffset.bottom + contentOffset.height - 20) {
                        dropdownContentRef.style.left = containerOffset.left - backDropOffset.left + 'px';
                        dropdownContentRef.style.bottom = '20px';
                    } else {
                        dropdownContentRef.style.top = containerOffset.bottom - backDropOffset.top + 'px';
                        dropdownContentRef.style.left = containerOffset.left - backDropOffset.left + 'px';
                    }
                }
            } else {
                _this.dropdownRef.wrapper.appendChild(_this.dropdownRef.dropdownContentRef);
                _this.dropdownRef.dropdownContentRef.style.top = '100%';
                _this.dropdownRef.dropdownContentRef.style.left = '';
                _this.dropdownRef.dropdownContentRef.style.bottom = '';
            }

            _this.setState({
                expanded: expanded
            });
        }, _this.handleBackDropClick = function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (_this.dropdownRef) {
                _this.dropdownRef.toggleExpanded(false);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MultiSelect, [{
        key: 'getSelectedText',
        value: function getSelectedText() {
            var _props = this.props,
                options = _props.options,
                selected = _props.selected;


            var selectedOptions = selected.map(function (s) {
                return options.find(function (o) {
                    return o.value === s;
                });
            });

            var selectedLabels = selectedOptions.map(function (s) {
                return s ? s.label : "";
            });

            return selectedLabels.join(", ");
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var _props2 = this.props,
                options = _props2.options,
                selected = _props2.selected,
                valueRenderer = _props2.valueRenderer,
                overrideStrings = _props2.overrideStrings;


            var style = {
                display: 'inline-block',
                height: '40px',
                lineHeight: '40px'
            };

            var noneSelected = selected.length === 0;
            var allSelected = selected.length === options.length;

            var customText = valueRenderer && valueRenderer(selected, options);

            if (noneSelected) {
                return _react2.default.createElement(
                    'span',
                    { className: 'noneSelected', style: Object.assign({}, styles.noneSelected, style) },
                    customText || (0, _getString2.default)("selectSomeItems", overrideStrings)
                );
            }

            if (customText) {
                return _react2.default.createElement(
                    'span',
                    { style: style },
                    customText
                );
            }

            return _react2.default.createElement(
                'span',
                { style: style },
                allSelected ? (0, _getString2.default)("allItemsAreSelected", overrideStrings) : this.getSelectedText()
            );
        }
    }, {
        key: 'render',


        // handleUpdateContent = (expanded) => {
        //     if (expanded && this.dropdownRef && this.dropdownRef.dropdownContentRef) {
        //         console.log(this.dropdownRef);
        //         const {
        //             height: contentHeight,
        //         } = this.dropdownRef.dropdownContentRef.getBoundingClientRect();
        //         if (this.contentHeight !== contentHeight) {
        //            this.handleToggleExpanded(expanded);
        //         }
        //     }
        // }

        value: function render() {
            var _this2 = this;

            var _props3 = this.props,
                ItemRenderer = _props3.ItemRenderer,
                options = _props3.options,
                selected = _props3.selected,
                selectAllLabel = _props3.selectAllLabel,
                isLoading = _props3.isLoading,
                disabled = _props3.disabled,
                disableSearch = _props3.disableSearch,
                filterOptions = _props3.filterOptions,
                shouldToggleOnHover = _props3.shouldToggleOnHover,
                hasSelectAll = _props3.hasSelectAll,
                overrideStrings = _props3.overrideStrings;
            var _state = this.state,
                expanded = _state.expanded,
                contentStyle = _state.contentStyle;


            return _react2.default.createElement(
                'div',
                { className: 'multi-select' },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'multi-select-body',
                        ref: function ref(_ref3) {
                            _this2.containerRef = _ref3;
                        }
                    },
                    _react2.default.createElement(
                        _dropdown2.default,
                        {
                            isLoading: isLoading,
                            contentComponent: _selectPanel2.default,
                            shouldToggleOnHover: shouldToggleOnHover,
                            contentProps: {
                                ItemRenderer: ItemRenderer,
                                options: options,
                                selected: selected,
                                hasSelectAll: hasSelectAll,
                                selectAllLabel: selectAllLabel,
                                onSelectedChanged: this.handleSelectedChanged,
                                // onToggleExpanded: this.handleUpdateContent,
                                disabled: disabled,
                                disableSearch: disableSearch,
                                filterOptions: filterOptions,
                                overrideStrings: overrideStrings
                            },
                            disabled: disabled,
                            arrowIcon: true,
                            onToggleExpanded: this.handleToggleExpanded,
                            contentStyle: contentStyle,
                            ref: function ref(_ref2) {
                                _this2.dropdownRef = _ref2;
                            }
                        },
                        this.renderHeader()
                    )
                ),
                _react2.default.createElement('div', {
                    className: 'multi-select-backdrop',
                    style: Object.assign({}, styles.backDrop, { display: expanded ? 'block' : 'none' }),
                    onMouseDown: this.handleBackDropClick,
                    onTouchStart: this.handleBackDropClick,
                    ref: function ref(_ref4) {
                        _this2.backDropRef = _ref4;
                    }
                })
            );
        }
    }]);

    return MultiSelect;
}(_react.Component);

MultiSelect.defaultProps = {
    hasSelectAll: true,
    shouldToggleOnHover: false,
    optionHeight: 41,
    searchHeight: 62
};


var styles = {
    noneSelected: {
        color: "#999"
    },
    backDrop: {
        // width: '100%',
        // height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999
    }
};

exports.default = MultiSelect;
exports.Dropdown = _dropdown2.default;