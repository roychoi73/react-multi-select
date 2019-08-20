'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fuzzyMatchUtils = require('fuzzy-match-utils');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _selectItem = require('./select-item.js');

var _selectItem2 = _interopRequireDefault(_selectItem);

var _selectList = require('./select-list.js');

var _selectList2 = _interopRequireDefault(_selectList);

var _getString = require('./get-string.js');

var _getString2 = _interopRequireDefault(_getString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 */


var SelectPanel = function (_Component) {
    _inherits(SelectPanel, _Component);

    function SelectPanel() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SelectPanel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectPanel.__proto__ || Object.getPrototypeOf(SelectPanel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            searchHasFocus: false,
            searchText: "",
            focusIndex: -1
        }, _this.inputRef = null, _this.expanded = false, _this.selectAll = function () {
            var _this$props = _this.props,
                onSelectedChanged = _this$props.onSelectedChanged,
                options = _this$props.options;

            var allValues = options.map(function (o) {
                return o.value;
            });

            onSelectedChanged(allValues);
        }, _this.selectNone = function () {
            var onSelectedChanged = _this.props.onSelectedChanged;


            onSelectedChanged([]);
        }, _this.selectAllChanged = function (checked) {
            if (checked) {
                _this.selectAll();
            } else {
                _this.selectNone();
            }
        }, _this.handleSearchChange = function (e) {
            _this.setState({
                searchText: e.target.value,
                focusIndex: -1
            });
        }, _this.handleItemClicked = function (index) {
            _this.setState({ focusIndex: index });
        }, _this.clearSearch = function () {
            _this.setState({ searchText: "" });
        }, _this.toggleChecked = function () {
            var focusIndex = _this.state.focusIndex;
            var _this$props2 = _this.props,
                options = _this$props2.options,
                selected = _this$props2.selected,
                disabled = _this$props2.disabled,
                onSelectedChanged = _this$props2.onSelectedChanged;


            if (focusIndex === 0) {
                if (selected.length === options.length) {
                    _this.selectNone();
                } else {
                    _this.selectAll();
                }
                return;
            }

            if (disabled) {
                return;
            }

            var option = options[focusIndex - 1];
            var optionIndex = selected.indexOf(option.value);

            if (optionIndex < 0) {
                onSelectedChanged([].concat(_toConsumableArray(selected), [option.value]));
            } else {
                var removed = [].concat(_toConsumableArray(selected.slice(0, optionIndex)), _toConsumableArray(selected.slice(optionIndex + 1)));
                onSelectedChanged(removed);
            }
        }, _this.handleKeyDown = function (e) {
            switch (e.which) {
                case 13: // Enter
                case 32:
                    // Space
                    _this.toggleChecked();
                    break;
                case 38:
                    // Up Arrow
                    if (e.altKey) {
                        return;
                    }

                    _this.updateFocus(-1);
                    break;
                case 40:
                    // Down Arrow
                    if (e.altKey) {
                        return;
                    }

                    _this.updateFocus(1);
                    break;
                default:
                    return;
            }

            e.stopPropagation();
            e.preventDefault();
        }, _this.handleSearchFocus = function (searchHasFocus) {
            _this.setState({
                searchHasFocus: searchHasFocus,
                focusIndex: -1
            });
        }, _this.handleHoverChanged = function (index) {
            _this.updateFocus(index - _this.state.focusIndex);
        }, _this.expandedChange = function (expanded) {
            if (!_this.expanded && expanded) {
                _this.expanded = expanded;
                if (_this.inputRef) {
                    _this.inputRef.focus();
                }
            } else if (!expanded) {
                _this.expanded = expanded;
                _this.setState({
                    focusIndex: -1
                });
            }
        }, _this.clearSearchText = function () {
            _this.setState({
                searchText: ''
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SelectPanel, [{
        key: 'allAreSelected',
        value: function allAreSelected() {
            var _props = this.props,
                options = _props.options,
                selected = _props.selected;

            return options.length === selected.length;
        }
    }, {
        key: 'filteredOptions',
        value: function filteredOptions() {
            var searchText = this.state.searchText;
            var _props2 = this.props,
                options = _props2.options,
                customFilterOptions = _props2.filterOptions;


            return customFilterOptions ? customFilterOptions(options, searchText) : (0, _fuzzyMatchUtils.filterOptions)(options, searchText);
        }
    }, {
        key: 'updateFocus',
        value: function updateFocus(offset) {
            var _this2 = this;

            var focusIndex = this.state.focusIndex;
            var options = this.props.options;


            var newFocus = focusIndex + offset;
            newFocus = Math.max(0, newFocus);
            newFocus = Math.min(newFocus, options.length);

            this.setState({ focusIndex: newFocus }, function () {
                try {
                    var container = _this2.panelRef.parentElement;
                    var scrollTop = container.scrollTop;

                    var _container$getBoundin = container.getBoundingClientRect(),
                        height = _container$getBoundin.height;

                    var focusItemTop = 48 + 39 + newFocus * 39;
                    if (newFocus === 0) {
                        container.scrollTo(0, 0);
                    } else if (offset > 0 && height + scrollTop < focusItemTop) {
                        container.scrollBy(0, 39);
                    } else if (offset < 0 && scrollTop > focusItemTop) {
                        container.scrollBy(0, -39);
                    }
                } catch (e) {
                    // 
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                focusIndex = _state.focusIndex,
                searchText = _state.searchText;
            var _props3 = this.props,
                ItemRenderer = _props3.ItemRenderer,
                selectAllLabel = _props3.selectAllLabel,
                disabled = _props3.disabled,
                disableSearch = _props3.disableSearch,
                hasSelectAll = _props3.hasSelectAll,
                overrideStrings = _props3.overrideStrings;


            var selectAllOption = {
                label: selectAllLabel || (0, _getString2.default)("selectAll", overrideStrings),
                value: ""
            };

            return _react2.default.createElement(
                'div',
                {
                    className: 'select-panel',
                    style: styles.panel,
                    role: 'listbox',
                    onKeyDown: this.handleKeyDown,
                    ref: function ref(_ref3) {
                        return _this3.panelRef = _ref3;
                    }
                },
                !disableSearch && _react2.default.createElement(
                    'div',
                    { style: styles.searchContainer },
                    _react2.default.createElement('input', {
                        autoFocus: true,
                        ref: function ref(_ref2) {
                            _this3.inputRef = _ref2;
                        },
                        value: searchText,
                        className: 'dropdown-search-input',
                        placeholder: (0, _getString2.default)("search", overrideStrings),
                        type: 'text',
                        onChange: this.handleSearchChange,
                        style: _extends({}, styles.search)
                        //onFocus={() => this.handleSearchFocus(true)}
                        , onBlur: function onBlur() {
                            return _this3.handleSearchFocus(false);
                        }
                    }),
                    _react2.default.createElement(
                        'div',
                        { style: _extends({}, styles.searchIcon) },
                        !!searchText ? _react2.default.createElement(
                            'svg',
                            { onClick: this.clearSearchText, width: '24', height: '24', viewBox: '0 0 24 24', style: { cursor: 'pointer' } },
                            _react2.default.createElement(
                                'defs',
                                null,
                                _react2.default.createElement('path', { id: 'multiselect-clear', d: 'M0 9a9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9zm12.808 2.885a.653.653 0 1 1-.923.924L9 9.924l-2.885 2.885a.651.651 0 0 1-.924 0 .654.654 0 0 1 0-.924L8.076 9 5.19 6.115a.654.654 0 0 1 .924-.923L9 8.076l2.885-2.884a.653.653 0 1 1 .923.923L9.924 9l2.884 2.885z' })
                            ),
                            _react2.default.createElement('use', { fill: '#6D7381', fillRule: 'nonzero', opacity: '.4', transform: 'translate(3 3)', xlinkHref: '#multiselect-clear' })
                        ) : _react2.default.createElement(
                            'svg',
                            { width: '20', height: '20', viewBox: '0 0 20 20', style: { marginTop: '4px' } },
                            _react2.default.createElement(
                                'defs',
                                null,
                                _react2.default.createElement('path', { id: 'multiselect-search', d: 'M13.436 12.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM7.5 13a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z' })
                            ),
                            _react2.default.createElement('use', { fill: '#6D7381', fillRule: 'nonzero', transform: 'translate(1 1)', xlinkHref: '#multiselect-search' })
                        )
                    )
                ),
                hasSelectAll && _react2.default.createElement(_selectItem2.default, {
                    focused: focusIndex === 0,
                    checked: this.allAreSelected(),
                    option: selectAllOption,
                    onSelectionChanged: this.selectAllChanged,
                    onClick: function onClick() {
                        return _this3.handleItemClicked(0);
                    },
                    ItemRenderer: ItemRenderer,
                    disabled: disabled,
                    onHoverChanged: function onHoverChanged() {
                        _this3.handleHoverChanged(0);
                    }
                }),
                _react2.default.createElement(_selectList2.default, _extends({}, this.props, {
                    options: this.filteredOptions(),
                    focusIndex: focusIndex - 1,
                    onClick: function onClick(e, index) {
                        return _this3.handleItemClicked(index + 1);
                    },
                    ItemRenderer: ItemRenderer,
                    disabled: disabled,
                    onHoverChanged: function onHoverChanged(index) {
                        _this3.handleHoverChanged(index + 1);
                    }
                }))
            );
        }
    }]);

    return SelectPanel;
}(_react.Component);

var styles = {
    panel: {
        height: '100%',
        boxSizing: 'border-box',
        transition: 'all 200ms'
    },
    search: {
        display: "block",
        height: '32px',
        maxWidth: "100%",
        borderRadius: "4px",
        backgroundColor: 'rgba(134, 147, 201, 0.1)',
        boxSizing: 'border-box',
        lineHeight: '24px',
        border: 0,
        borderColor: '#dee2e4',
        padding: '10px',
        width: "100%",
        outline: "none",
        fontSize: '14px'
    },
    searchFocused: {
        borderColor: "#4285f4"
    },
    searchContainer: {
        position: 'relative',
        width: "100%",
        boxSizing: 'border-box',
        padding: "0.5em"
    },
    searchIcon: {
        position: 'absolute',
        width: '24px',
        height: '24px',
        top: '10px',
        right: '10px'
    }
};

exports.default = SelectPanel;