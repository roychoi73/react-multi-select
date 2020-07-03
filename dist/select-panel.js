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


var defaultScrollbarComponent = function (_Component) {
    _inherits(defaultScrollbarComponent, _Component);

    function defaultScrollbarComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, defaultScrollbarComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = defaultScrollbarComponent.__proto__ || Object.getPrototypeOf(defaultScrollbarComponent)).call.apply(_ref, [this].concat(args))), _this), _this.scrollTop = function () {}, _this.update = function () {}, _this.render = function () {
            return _react2.default.createElement(
                'div',
                null,
                _this.props.children
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return defaultScrollbarComponent;
}(_react.Component);

;

var SelectPanel = function (_Component2) {
    _inherits(SelectPanel, _Component2);

    function SelectPanel() {
        var _ref2;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, SelectPanel);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = SelectPanel.__proto__ || Object.getPrototypeOf(SelectPanel)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
            searchHasFocus: false,
            searchText: "",
            focusIndex: -1,
            clearAllHover: false
        }, _this2.inputRef = null, _this2.scrollbarRef = null, _this2.expanded = false, _this2.selectAll = function () {
            var _this2$props = _this2.props,
                onSelectedChanged = _this2$props.onSelectedChanged,
                options = _this2$props.options;

            var allValues = options.map(function (o) {
                return o.value;
            });

            onSelectedChanged(allValues);
        }, _this2.selectNone = function () {
            var onSelectedChanged = _this2.props.onSelectedChanged;


            onSelectedChanged([]);
        }, _this2.selectAllChanged = function (checked) {
            if (checked) {
                _this2.selectAll();
            } else {
                _this2.selectNone();
            }
        }, _this2.handleSearchChange = function (e) {
            _this2.setState({
                searchText: e.target.value,
                focusIndex: -1
            });
        }, _this2.handleItemClicked = function (index) {
            _this2.setState({ focusIndex: index });
        }, _this2.clearSearch = function () {
            _this2.setState({ searchText: "" });
        }, _this2.toggleChecked = function () {
            var focusIndex = _this2.state.focusIndex;
            var _this2$props2 = _this2.props,
                selected = _this2$props2.selected,
                disabled = _this2$props2.disabled,
                onSelectedChanged = _this2$props2.onSelectedChanged;

            var options = _this2.filteredOptions();

            if (focusIndex === 0) {
                if (selected.length === options.length) {
                    _this2.selectNone();
                } else {
                    _this2.selectAll();
                }
                return;
            } else if (focusIndex < 0) {
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
        }, _this2.handleKeyDown = function (e) {
            switch (e.which) {
                case 13: // Enter
                case 32:
                    // Space
                    _this2.toggleChecked();
                    break;
                case 38:
                    // Up Arrow
                    if (e.altKey) {
                        return;
                    }

                    _this2.updateFocus(-1);
                    break;
                case 40:
                    // Down Arrow
                    if (e.altKey) {
                        return;
                    }

                    _this2.updateFocus(1);
                    break;
                default:
                    return;
            }

            e.stopPropagation();
            e.preventDefault();
        }, _this2.handleSearchFocus = function (searchHasFocus) {
            _this2.setState({
                searchHasFocus: searchHasFocus,
                focusIndex: -1
            });
        }, _this2.handleHoverChanged = function (index) {
            _this2.updateFocus(index - _this2.state.focusIndex);
        }, _this2.focus = function () {
            if (_this2.expanded && _this2.inputRef) {
                _this2.inputRef.focus();
            }
        }, _this2.expandedChange = function (expanded) {
            if (!_this2.expanded && expanded) {
                _this2.expanded = expanded;
                if (_this2.inputRef) {
                    _this2.inputRef.focus();
                }
                if (typeof _this2.props.onToggleExpanded === 'function') {
                    _this2.props.onToggleExpanded(expanded);
                }
            } else if (!expanded) {
                _this2.expanded = expanded;
                _this2.setState({
                    focusIndex: -1
                });
            }
        }, _this2.clearSearchText = function () {
            _this2.setState({
                searchText: ''
            });
        }, _this2.handleClearAllButtonFocus = function (clearAllHover) {
            _this2.setState({
                clearAllHover: clearAllHover
            });
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    // componentDidUpdate() {
    //     if (typeof this.props.onToggleExpanded === 'function') {
    //         this.props.onToggleExpanded(this.expanded);
    //     }
    // }

    // componentDidMount() {
    //     document.body.addEventListener()
    // }

    // componentWillReceiveProps() {

    // }

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
            var _this3 = this;

            var focusIndex = this.state.focusIndex;
            var options = this.props.options;


            var newFocus = focusIndex + offset;
            newFocus = Math.max(0, newFocus);
            newFocus = Math.min(newFocus, options.length);

            this.setState({ focusIndex: newFocus }, function () {
                try {
                    var container = _this3.panelRef.parentElement;
                    var scrollTop = container.scrollTop;

                    var _container$getBoundin = container.getBoundingClientRect(),
                        height = _container$getBoundin.height;

                    var focusItemTop = 46 + (_this3.props.disableSearch ? 0 : 36) + newFocus * 36;
                    if (newFocus === 0) {
                        container.scrollTo(0, 0);
                    } else if (offset > 0 && height + scrollTop < focusItemTop) {
                        container.scrollBy(0, 36);
                    } else if (offset < 0 && scrollTop + 36 > focusItemTop) {
                        container.scrollBy(0, -36);
                    }
                } catch (e) {
                    // 
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _state = this.state,
                focusIndex = _state.focusIndex,
                searchText = _state.searchText,
                clearAllHover = _state.clearAllHover;
            var _props3 = this.props,
                ItemRenderer = _props3.ItemRenderer,
                selectAllLabel = _props3.selectAllLabel,
                disabled = _props3.disabled,
                disableSearch = _props3.disableSearch,
                hasSelectAll = _props3.hasSelectAll,
                hasClearAll = _props3.hasClearAll,
                overrideStrings = _props3.overrideStrings,
                _props3$scrollbarComp = _props3.scrollbarComponent,
                scrollbarComponent = _props3$scrollbarComp === undefined ? defaultScrollbarComponent : _props3$scrollbarComp;


            var selectAllOption = {
                label: selectAllLabel || (0, _getString2.default)("selectAll", overrideStrings),
                value: ""
            };
            var clearAllContainerStyle = disableSearch ? Object.assign({}, styles.clearAllButtonContainer, { paddingTop: '12px' }) : styles.clearAllButtonContainer;
            var clearAllButtonStyle = clearAllHover ? Object.assign({}, styles.clearAllButton, { textDecoration: 'underline' }) : styles.clearAllButton;
            var Scrollbars = scrollbarComponent;
            return _react2.default.createElement(
                Scrollbars,
                {
                    ref: function ref(_ref5) {
                        _this4.scrollbarRef = _ref5;
                    }
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'select-panel',
                        style: styles.panel,
                        role: 'listbox'
                        //onKeyDown={this.handleKeyDown}
                        , onKeyDownCapture: this.handleKeyDown,
                        ref: function ref(_ref4) {
                            return _this4.panelRef = _ref4;
                        }
                    },
                    !disableSearch && _react2.default.createElement(
                        'div',
                        { style: styles.searchContainer },
                        _react2.default.createElement('input', {
                            autoFocus: true,
                            ref: function ref(_ref3) {
                                _this4.inputRef = _ref3;
                            },
                            value: searchText,
                            className: 'dropdown-search-input',
                            placeholder: (0, _getString2.default)("search", overrideStrings),
                            type: 'text',
                            onChange: this.handleSearchChange,
                            style: _extends({}, styles.search)
                            //onFocus={() => this.handleSearchFocus(true)}
                            , onBlur: function onBlur() {
                                return _this4.handleSearchFocus(false);
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
                    hasClearAll && _react2.default.createElement(
                        'div',
                        { 'class': 'clear-all-continer', style: clearAllContainerStyle },
                        _react2.default.createElement(
                            'span',
                            { className: 'clear-all-button', style: clearAllButtonStyle, onClick: this.selectNone, onMouseEnter: function onMouseEnter() {
                                    return _this4.handleClearAllButtonFocus(true);
                                },
                                onMouseLeave: function onMouseLeave() {
                                    return _this4.handleClearAllButtonFocus(false);
                                } },
                            'Clear All'
                        )
                    ),
                    hasSelectAll && _react2.default.createElement(_selectItem2.default, {
                        focused: focusIndex === 0,
                        checked: this.allAreSelected(),
                        option: selectAllOption,
                        allOption: true,
                        onSelectionChanged: this.selectAllChanged,
                        onClick: function onClick() {
                            return _this4.handleItemClicked(0);
                        },
                        ItemRenderer: ItemRenderer,
                        disabled: disabled,
                        onHoverChanged: function onHoverChanged() {
                            _this4.handleHoverChanged(0);
                        }
                    }),
                    _react2.default.createElement(_selectList2.default, _extends({}, this.props, {
                        options: this.filteredOptions(),
                        focusIndex: focusIndex - 1,
                        onClick: function onClick(e, index) {
                            return _this4.handleItemClicked(index + 1);
                        },
                        ItemRenderer: ItemRenderer,
                        disabled: disabled,
                        onHoverChanged: function onHoverChanged(index) {
                            _this4.handleHoverChanged(index + 1);
                        }
                    }))
                )
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
        padding: '6px 30px 6px 10px',
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
        padding: '16px 10px 14px'
    },
    searchIcon: {
        position: 'absolute',
        width: '24px',
        height: '24px',
        top: '18px',
        right: '15px'
    },
    clearAllButton: {
        border: 'none',
        fontSize: '13px',
        color: '#4285f4',
        cursor: 'pointer',
        margin: '0px 20px'
    },
    clearAllButtonContainer: {
        borderBottom: '1px solid #6d738133',
        paddingBottom: '11px'
    }
};

exports.default = SelectPanel;