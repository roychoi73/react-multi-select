(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var strings = {
    selectSomeItems: "Select some items...",
    allItemsAreSelected: "All items are selected",
    selectAll: "Select All",
    search: "Search"
};

function getString(key, overrideStrings) {
    if (overrideStrings && overrideStrings[key]) {
        return overrideStrings[key];
    }

    return strings[key];
}

exports.default = getString;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * This component represents an individual item in the multi-select drop-down
 */


var DefaultItemRenderer = function (_Component) {
    _inherits(DefaultItemRenderer, _Component);

    function DefaultItemRenderer() {
        _classCallCheck(this, DefaultItemRenderer);

        return _possibleConstructorReturn(this, (DefaultItemRenderer.__proto__ || Object.getPrototypeOf(DefaultItemRenderer)).apply(this, arguments));
    }

    _createClass(DefaultItemRenderer, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                checked = _props.checked,
                option = _props.option,
                onClick = _props.onClick,
                disabled = _props.disabled;


            var style = _extends({}, styles.label, disabled ? styles.labelDisabled : undefined);

            return _react2.default.createElement(
                "span",
                {
                    className: "item-renderer"
                },
                _react2.default.createElement("input", {
                    type: "checkbox",
                    onChange: onClick,
                    checked: checked,
                    tabIndex: "-1",
                    disabled: disabled
                }),
                _react2.default.createElement(
                    "span",
                    { style: style },
                    option.label
                )
            );
        }
    }]);

    return DefaultItemRenderer;
}(_react.Component);

var SelectItem = function (_Component2) {
    _inherits(SelectItem, _Component2);

    function SelectItem() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, SelectItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = SelectItem.__proto__ || Object.getPrototypeOf(SelectItem)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
            hovered: false
        }, _this2.onChecked = function (e) {
            var onSelectionChanged = _this2.props.onSelectionChanged;
            var checked = e.target.checked;


            onSelectionChanged(checked);
        }, _this2.toggleChecked = function () {
            var _this2$props = _this2.props,
                checked = _this2$props.checked,
                onSelectionChanged = _this2$props.onSelectionChanged;

            onSelectionChanged(!checked);
        }, _this2.handleClick = function (e) {
            var onClick = _this2.props.onClick;

            _this2.toggleChecked();
            onClick(e);
        }, _this2.updateHover = function (hover) {
            //this.setState({hovered: hover});
            if (hover) {
                _this2.props.onHoverChanged();
            }
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(SelectItem, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.updateFocus();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.updateFocus();
        }
    }, {
        key: "updateFocus",
        value: function updateFocus() {
            var focused = this.props.focused;


            if (focused && this.itemRef) {
                //this.itemRef.focus();
            }
        }

        // handleKeyDown = (e: KeyboardEvent) => {
        //     switch (e.which) {
        //         case 13: // Enter
        //         case 32: // Space
        //             this.toggleChecked();
        //             break;
        //         default:
        //             return;
        //     }

        //     e.preventDefault();
        // }

    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                ItemRenderer = _props2.ItemRenderer,
                option = _props2.option,
                checked = _props2.checked,
                focused = _props2.focused,
                disabled = _props2.disabled;
            var hovered = this.state.hovered;


            var focusStyle = focused || hovered ? styles.itemContainerHover : undefined;

            return _react2.default.createElement(
                "label",
                {
                    className: "select-item",
                    role: "option",
                    "aria-selected": checked,
                    selected: checked
                    //tabIndex="-1"
                    , style: _extends({}, styles.itemContainer, focusStyle),
                    ref: function ref(_ref2) {
                        return _this3.itemRef = _ref2;
                    },
                    onMouseEnter: function onMouseEnter() {
                        return _this3.updateHover(true);
                    },
                    onMouseOut: function onMouseOut() {
                        return _this3.updateHover(false);
                    }
                },
                _react2.default.createElement(ItemRenderer, {
                    option: option,
                    checked: checked,
                    onClick: this.handleClick,
                    disabled: disabled
                })
            );
        }
    }]);

    return SelectItem;
}(_react.Component);

SelectItem.defaultProps = {
    ItemRenderer: DefaultItemRenderer,
    onHoverChanged: function onHoverChanged() {}
};


var styles = {
    itemContainer: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        color: '#666666',
        cursor: 'pointer',
        display: 'block',
        padding: '8px 10px'
    },
    itemContainerHover: {
        backgroundColor: 'rgba(134, 147, 201, 0.1)',
        outline: 0
    },
    label: {
        display: 'inline-block',
        verticalAlign: 'middle',
        borderBottomRightRadius: '2px',
        borderTopRightRadius: '2px',
        cursor: 'default',
        padding: '2px 5px'
    },
    labelDisabled: {
        opacity: 0.5
    }
};

exports.default = SelectItem;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _loadingIndicator = __webpack_require__(6);

var _loadingIndicator2 = _interopRequireDefault(_loadingIndicator);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/**
 * A generic dropdown component.  It takes the children of the component
 * and hosts it in the component.  When the component is selected, it
 * drops-down the contentComponent and applies the contentProps.
 */

var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
        var _this3 = this;

        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Dropdown);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        this.expandedChanged = false;

        this.shouldUpdateComponent = function (nextProps, nextState) {
            if (!_this3.expandedChanged && nextState.expanded !== _this3.state.expanded) {
                _this3.expandedChanged = true;
            }
            return true;
        };

        this.componentDidUpdate = function () {
            setTimeout(function () {
                if (_this3.selectPanel) {
                    _this3.selectPanel.expandedChange(_this3.state.expanded);
                    _this3.expandedChanged = false;
                }
            }, 100);
        };

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            expanded: false,
            hasFocus: false
        }, _this.handleDocumentClick = function (event) {
            if (_this.wrapper && !_this.wrapper.contains(event.target)) {
                _this.setState({ expanded: false });
            }
        }, _this.handleKeyDown = function (e) {
            switch (e.which) {
                case 27:
                    // Escape
                    _this.toggleExpanded(false);
                    break;
                case 38:
                    // Up Arrow
                    _this.toggleExpanded(false);
                    break;
                case 13: // Enter Key
                case 32: // Space
                case 40:
                    // Down Arrow
                    _this.toggleExpanded(true);
                    break;
                default:
                    return;
            }

            e.preventDefault();
        }, _this.handleFocus = function (e) {
            var hasFocus = _this.state.hasFocus;

            if (e.target === _this.wrapper && !hasFocus) {
                _this.setState({ hasFocus: true });
            }
        }, _this.handleBlur = function (e) {
            var hasFocus = _this.state.hasFocus;

            if (hasFocus) {
                _this.setState({ hasFocus: false });
            }
        }, _this.handleMouseEnter = function (e) {
            _this.handleHover(true);
        }, _this.handleMouseLeave = function (e) {
            _this.handleHover(false);
        }, _this.handleHover = function (toggleExpanded) {
            var shouldToggleOnHover = _this.props.shouldToggleOnHover;

            if (shouldToggleOnHover) {
                _this.toggleExpanded(toggleExpanded);
            }
        }, _this.toggleExpanded = function (value) {
            var isLoading = _this.props.isLoading;
            var expanded = _this.state.expanded;

            var disabled = this.props.disabled;


            if (isLoading || disabled) {
                return;
            }

            var newExpanded = value === undefined ? !expanded : !!value;

            _this.setState({ expanded: newExpanded });

            if (newExpanded && _this.selectPanel) {
                //_this.selectPanel.focusSearch();
            }

            if (!newExpanded && _this.wrapper) {
                //_this.wrapper.focus();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Dropdown, [{
        key: 'selectPanel',
        value: null
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            document.addEventListener('touchstart', this.handleDocumentClick);
            document.addEventListener('mousedown', this.handleDocumentClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('touchstart', this.handleDocumentClick);
            document.removeEventListener('mousedown', this.handleDocumentClick);
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            var _props = this.props,
                ContentComponent = _props.contentComponent,
                contentProps = _props.contentProps;

            return _react2.default.createElement('div', {
                className: 'dropdown-content',
                style: styles.panelContainer
            }, _react2.default.createElement(ContentComponent, contentProps));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _this2 = this;

            var _state = this.state,
                expanded = _state.expanded,
                hasFocus = _state.hasFocus;
            var _props2 = this.props,
                children = _props2.children,
                isLoading = _props2.isLoading,
                disabled = _props2.disabled,
                arrowIcon = _props2.arrowIcon,
                ContentComponent = _props2.contentComponent,
                contentProps = _props2.contentProps;

            var expandedHeaderStyle = expanded ? styles.dropdownHeaderExpanded : undefined;

            var focusedHeaderStyle = expanded ? styles.dropdownHeaderFocused : undefined;

            var arrowStyle = expanded ? styles.dropdownArrowUp : styles.dropdownArrowDown;
            if (arrowIcon) {
                arrowStyle = expanded ? styles.dropdownIconArrowUp : styles.dropdownIconArrowDown;
            }
            if (disabled) {
                arrowStyle = _extends({}, arrowStyle, styles.dropdownArrowDisabled);
            }

            var focusedArrowStyle = hasFocus ? styles.dropdownArrowDownFocused : undefined;

            var headingStyle = _extends({}, styles.dropdownChildren, disabled ? styles.disabledDropdownChildren : {});

            return _react2.default.createElement('div', {
                className: 'dropdown',
                tabIndex: '0',
                role: 'combobox',
                'aria-expanded': expanded,
                'aria-readonly': 'true',
                'aria-disabled': disabled,
                style: styles.dropdownContainer,
                ref: function ref(_ref2) {
                    return _this2.wrapper = _ref2;
                },
                onKeyDown: this.handleKeyDown,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave
            }, _react2.default.createElement('div', {
                className: 'dropdown-heading',
                style: _extends({}, styles.dropdownHeader, focusedHeaderStyle),
                onClick: function onClick() {
                    return _this2.toggleExpanded();
                }
            }, _react2.default.createElement('span', {
                className: 'dropdown-heading-value',
                style: headingStyle
            }, children), _react2.default.createElement('span', {
                className: 'dropdown-heading-loading-container',
                style: styles.loadingContainer
            }, isLoading && _react2.default.createElement(_loadingIndicator2.default, null)), _react2.default.createElement('span', {
                className: 'dropdown-heading-dropdown-arrow',
                style: styles.dropdownArrow
            },
            //_react2.default.createElement('span', { style: _extends({}, arrowStyle, focusedArrowStyle)
            arrowIcon ? _react2.default.createElement('svg', {
                width: '24',
                height: '24',
                viewBox: '0 0 24 24',
                style: arrowStyle
            }, _react2.default.createElement('g', { fill: 'none', 'fillRule': 'evenodd' }, _react2.default.createElement('path', {
                d: 'M6 6h12v12H6z',
                'fillRule': 'evenodd'
            }), _react2.default.createElement('path', {
                fill: '#6D7381',
                'fillRule': 'nonzero',
                d: 'M6.336 9.34a1.17 1.17 0 0 0-.01 1.63l.01.01 4.45 4.51a1.7 1.7 0 0 0 2.427 0l4.45-4.51a1.17 1.17 0 0 0 0-1.64 1.132 1.132 0 0 0-1.617 0L12 13.441l-4.047-4.1a1.132 1.132 0 0 0-1.617 0'
            }))) : _react2.default.createElement('span', { style: _extends({}, arrowStyle, focusedArrowStyle) }))),
            //expanded && this.renderPanel()
            _react2.default.createElement('div', {
                className: 'dropdown-content',
                style: _extends({}, styles.panelContainer, !expanded ? styles.panelContainerCollapsed : {})
            }, _react2.default.createElement(ContentComponent, _extends({}, contentProps, { ref: function ref(_ref3) {
                    _this4.selectPanel = _ref3;
                } }))));
        }
    }]);

    return Dropdown;
}(_react.Component);

var focusColor = '#4285f4';

var styles = {
    dropdownArrow: {
        boxSizing: 'border-box',
        display: 'table-cell',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        width: 25,
        paddingRight: 5
    },
    dropdownIconArrowDown: {
        verticalAlign: 'middle',
        transition: 'transform .25s'
    },
    dropdownArrowDown: {
        boxSizing: 'border-box',
        borderColor: '#999 transparent transparent',
        borderStyle: 'solid',
        borderWidth: '5px 5px 2.5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative'
    },
    dropdownArrowDownFocused: {
        borderColor: focusColor + ' transparent transparent'
    },
    dropdownArrowUp: {
        boxSizing: 'border-box',
        top: '-2px',
        borderColor: 'transparent transparent #999',
        borderStyle: 'solid',
        borderWidth: '0px 5px 5px',
        display: 'inline-block',
        height: 0,
        width: 0,
        position: 'relative'
    },
    dropdownIconArrowUp: {
        verticalAlign: 'middle',
        transition: 'transform .25s',
        transform: 'rotate(-180deg)'
    },
    dropdownArrowDisabled: {
        opacity: .5
    },
    dropdownChildren: {
        boxSizing: 'border-box',
        bottom: 0,
        color: '#333',
        left: 0,
        lineHeight: '40px',
        paddingLeft: 10,
        paddingRight: 30,
        position: 'absolute',
        right: 0,
        top: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },
    disabledDropdownChildren: {
        backgroundColor: 'rgba(109, 115, 129, 0.1)',
        cursor: 'default'
    },
    dropdownContainer: {
        position: 'relative',
        boxSizing: 'border-box',
        outline: 'none'
    },
    dropdownHeader: _defineProperty({
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        borderColor: '#dfe1e5 #dfe1e5 #dfe1e5',
        borderRadius: 4,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        border: '2px solid #dfe1e5',
        color: '#333',
        cursor: 'default',
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: 40,
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
    }, "cursor", 'pointer'),
    dropdownHeaderFocused: {
        borderColor: focusColor,
        boxShadow: 'none'
    },
    dropdownHeaderExpanded: {
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px'
    },
    loadingContainer: {
        cursor: 'pointer',
        display: 'table-cell',
        verticalAlign: 'middle',
        width: '16px'
    },
    panelContainer: {
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        backgroundColor: '#fff',
        //border: '2px solid #ccc',
        //borderTopColor: '#e6e6e6',
        borderRadius: '3px',
        boxShadow: '0 4px 14px -2px rgba(9, 30, 66, 0.3)',
        boxSizing: 'border-box',
        //marginTop: '10px',
        maxHeight: '300px',
        opacity: 1,
        position: 'absolute',
        top: '100%',
        minWidth: '100%',
        zIndex: 100,
        overflowY: 'auto',
        transition: 'all .25s',
        transform: 'translate3d(0, 0, 0)' // 'scale(1)',
    },
    panelContainerCollapsed: {
        maxHeight: 0,
        visibility: 'hidden',
        opacity: 0,
        transform: 'scale(.9)'
    }
};

exports.default = Dropdown;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fuzzyMatchUtils = __webpack_require__(8);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectItem = __webpack_require__(2);

var _selectItem2 = _interopRequireDefault(_selectItem);

var _selectList = __webpack_require__(7);

var _selectList2 = _interopRequireDefault(_selectList);

var _getString = __webpack_require__(1);

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
        }, _this.inputRef = null, _this.selectAll = function () {
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
            if (expanded) {
                if (_this.inputRef) {
                    _this.inputRef.focus();
                }
            } else {
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
            var focusIndex = this.state.focusIndex;
            var options = this.props.options;


            var newFocus = focusIndex + offset;
            newFocus = Math.max(0, newFocus);
            newFocus = Math.min(newFocus, options.length);

            this.setState({ focusIndex: newFocus });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

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
                    onKeyDown: this.handleKeyDown
                },
                !disableSearch && _react2.default.createElement(
                    'div',
                    { style: styles.searchContainer },
                    _react2.default.createElement('input', {
                        autoFocus: true,
                        ref: function ref(_ref2) {
                            _this2.inputRef = _ref2;
                        },
                        value: searchText,
                        className: 'dropdown-search-input',
                        placeholder: (0, _getString2.default)("search", overrideStrings),
                        type: 'text',
                        onChange: this.handleSearchChange,
                        style: _extends({}, styles.search)
                        //onFocus={() => this.handleSearchFocus(true)}
                        , onBlur: function onBlur() {
                            return _this2.handleSearchFocus(false);
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
                        return _this2.handleItemClicked(0);
                    },
                    ItemRenderer: ItemRenderer,
                    disabled: disabled,
                    onHoverChanged: function onHoverChanged() {
                        _this2.handleHoverChanged(0);
                    }
                }),
                _react2.default.createElement(_selectList2.default, _extends({}, this.props, {
                    options: this.filteredOptions(),
                    focusIndex: focusIndex - 1,
                    onClick: function onClick(e, index) {
                        return _this2.handleItemClicked(index + 1);
                    },
                    ItemRenderer: ItemRenderer,
                    disabled: disabled,
                    onHoverChanged: function onHoverChanged(index) {
                        _this2.handleHoverChanged(index + 1);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dropdown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _dropdown = __webpack_require__(3);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _selectPanel = __webpack_require__(4);

var _selectPanel2 = _interopRequireDefault(_selectPanel);

var _getString = __webpack_require__(1);

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectedChanged = function (selected) {
            var _this$props = _this.props,
                onSelectedChanged = _this$props.onSelectedChanged,
                disabled = _this$props.disabled;


            if (disabled) {
                return;
            }

            if (onSelectedChanged) {
                onSelectedChanged(selected);
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


            var noneSelected = selected.length === 0;
            var allSelected = selected.length === options.length;

            var customText = valueRenderer && valueRenderer(selected, options);

            if (noneSelected) {
                return _react2.default.createElement(
                    'span',
                    { style: styles.noneSelected },
                    customText || (0, _getString2.default)("selectSomeItems", overrideStrings)
                );
            }

            if (customText) {
                return _react2.default.createElement(
                    'span',
                    null,
                    customText
                );
            }

            return _react2.default.createElement(
                'span',
                null,
                allSelected ? (0, _getString2.default)("allItemsAreSelected", overrideStrings) : this.getSelectedText()
            );
        }
    }, {
        key: 'render',
        value: function render() {
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


            return _react2.default.createElement(
                'div',
                { className: 'multi-select' },
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
                            disabled: disabled,
                            disableSearch: disableSearch,
                            filterOptions: filterOptions,
                            overrideStrings: overrideStrings
                        },
                        disabled: disabled,
                        arrowIcon: true
                    },
                    this.renderHeader()
                )
            );
        }
    }]);

    return MultiSelect;
}(_react.Component);

MultiSelect.defaultProps = {
    hasSelectAll: true,
    shouldToggleOnHover: false
};


var styles = {
    noneSelected: {
        color: "#999"
    }
};

exports.default = MultiSelect;
exports.Dropdown = _dropdown2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * A simple loading indicator, modeled after react-select.  Since react styles
 * don't support animations, hack it so we inject the keyframe animation
 * into the document.
 */


var STYLESHEET_NAME = "__react-multi-select_style_inject__";

function findStylesheet() {
    var styleSheet = Array.from(document.styleSheets).find(function (stylesheet) {
        return stylesheet.title === STYLESHEET_NAME;
    });

    // upcast as CSSStyleSheet
    var cssStylesheet = styleSheet;

    return cssStylesheet;
}

function registerStylesheet(css) {
    try {
        if (findStylesheet()) {
            return;
        }

        var style = document.createElement("style");
        style.setAttribute("title", STYLESHEET_NAME);
        document.head && document.head.appendChild(style);

        var stylesheet = findStylesheet();
        if (!stylesheet) {
            // Someting bad happened.  Abort!
            return;
        }

        stylesheet.insertRule(css, 0);
    } catch (e) {}
}

var LoadingIndicator = function (_Component) {
    _inherits(LoadingIndicator, _Component);

    function LoadingIndicator() {
        _classCallCheck(this, LoadingIndicator);

        return _possibleConstructorReturn(this, (LoadingIndicator.__proto__ || Object.getPrototypeOf(LoadingIndicator)).apply(this, arguments));
    }

    _createClass(LoadingIndicator, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            // React styles don't support adding keyframe rules.  Create a
            // stylesheet and inject the keyframe animarion into it.
            registerStylesheet(keyFrames);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("span", {
                className: "loading-indicator",
                style: styles.loading
            });
        }
    }]);

    return LoadingIndicator;
}(_react.Component);

LoadingIndicator.propTypes = {};


var keyFrames = "\n@keyframes react-multi-select_loading-spin {\n    to {\n        transform: rotate(1turn);\n    }\n}\n";

var styles = {
    loading: {
        "animation": "react-multi-select_loading-spin 400ms infinite linear",
        "width": "16px",
        "height": "16px",
        boxSizing: "border-box",
        borderRadius: "50%",
        border: "2px solid #ccc",
        borderRightColor: "#333",
        display: "inline-block",
        position: "relative",
        verticalAlign: "middle"
    }
};

exports.default = LoadingIndicator;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _selectItem = __webpack_require__(2);

var _selectItem2 = _interopRequireDefault(_selectItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * This component represents an unadorned list of SelectItem (s).
 */


var SelectList = function (_Component) {
    _inherits(SelectList, _Component);

    function SelectList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SelectList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelectList.__proto__ || Object.getPrototypeOf(SelectList)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectionChanged = function (option, checked) {
            var _this$props = _this.props,
                selected = _this$props.selected,
                onSelectedChanged = _this$props.onSelectedChanged,
                disabled = _this$props.disabled;


            if (disabled) {
                return;
            }

            if (checked) {
                onSelectedChanged([].concat(_toConsumableArray(selected), [option.value]));
            } else {
                var _index = selected.indexOf(option.value);
                var removed = [].concat(_toConsumableArray(selected.slice(0, _index)), _toConsumableArray(selected.slice(_index + 1)));
                onSelectedChanged(removed);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SelectList, [{
        key: 'renderItems',
        value: function renderItems() {
            var _this2 = this;

            var _props = this.props,
                ItemRenderer = _props.ItemRenderer,
                options = _props.options,
                selected = _props.selected,
                focusIndex = _props.focusIndex,
                onClick = _props.onClick,
                disabled = _props.disabled,
                onHoverChanged = _props.onHoverChanged;


            return options.map(function (o, i) {
                return _react2.default.createElement(
                    'li',
                    {
                        style: styles.listItem,
                        key: o.hasOwnProperty("key") ? o.key : i
                    },
                    _react2.default.createElement(_selectItem2.default, {
                        focused: focusIndex === i,
                        option: o,
                        onSelectionChanged: function onSelectionChanged(c) {
                            return _this2.handleSelectionChanged(o, c);
                        },
                        checked: selected.includes(o.value),
                        onClick: function (_onClick) {
                            function onClick(_x) {
                                return _onClick.apply(this, arguments);
                            }

                            onClick.toString = function () {
                                return _onClick.toString();
                            };

                            return onClick;
                        }(function (e) {
                            return onClick(e, i);
                        }),
                        ItemRenderer: ItemRenderer,
                        disabled: disabled,
                        onHoverChanged: function (_onHoverChanged) {
                            function onHoverChanged() {
                                return _onHoverChanged.apply(this, arguments);
                            }

                            onHoverChanged.toString = function () {
                                return _onHoverChanged.toString();
                            };

                            return onHoverChanged;
                        }(function () {
                            return onHoverChanged(i);
                        })
                    })
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                {
                    className: 'select-list',
                    style: styles.list
                },
                this.renderItems()
            );
        }
    }]);

    return SelectList;
}(_react.Component);

var styles = {
    list: {
        margin: 0,
        paddingLeft: 0
    },
    listItem: {
        listStyle: 'none'
    }
};

exports.default = SelectList;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fuzzy-match-utils");

/***/ })
/******/ ])));