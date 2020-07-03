'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loadingIndicator = require('./loading-indicator.js');

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

            // if (newExpanded && _this.selectPanel) {
            //     //_this.selectPanel.focusSearch();
            // }

            // if (!newExpanded && _this.wrapper) {
            //     //_this.wrapper.focus();
            // }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Dropdown, [{
        key: 'selectPanel',
        value: null
    }, {
        key: 'dropdownContentRef',
        value: null
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            // document.addEventListener('touchstart', this.handleDocumentClick);
            // document.addEventListener('mousedown', this.handleDocumentClick);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // document.removeEventListener('touchstart', this.handleDocumentClick);
            // document.removeEventListener('mousedown', this.handleDocumentClick);
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
                contentProps = _props2.contentProps,
                headerStyle = _props2.headerStyle;
            //contentStyle = _props2.contentStyle || {};

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
            var dropdownHeaderStyle = headerStyle ? _extends({}, styles.dropdownHeader, headerStyle) : styles.dropdownHeader;
            var selected = contentProps.selected;
            var headerClassName = 'dropdown-heading';
            headerClassName = selected.length ? headerClassName.concat(' selected-item') : headerClassName;
            headerClassName = expanded ? headerClassName.concat(' expanded') : headerClassName;
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
                className: headerClassName,
                style: _extends({}, dropdownHeaderStyle, focusedHeaderStyle),
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
            }))) : _react2.default.createElement('span', { style: _extends({}, arrowStyle, focusedArrowStyle) }))), _react2.default.createElement('div', {
                className: 'dropdown-content',
                style: _extends({}, styles.panelContainer, !expanded ? styles.panelContainerCollapsed : {}),
                ref: function ref(_ref3) {
                    return _this4.dropdownContentRef = _ref3;
                }
            }, _react2.default.createElement(ContentComponent, _extends({}, contentProps, { ref: function ref(_ref4) {
                    _this4.selectPanel = _ref4;
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
        display: 'flex',
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
        whiteSpace: 'nowrap',
        alignItems: 'center'
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
    dropdownHeader: {
        boxSizing: 'border-box',
        backgroundColor: '#fff',
        borderColor: '#dfe1e5 #dfe1e5 #dfe1e5',
        borderRadius: 4,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        border: '2px solid #dfe1e5',
        color: '#333',
        cursor: 'pointer',
        display: 'table',
        borderSpacing: 0,
        borderCollapse: 'separate',
        height: 40,
        outline: 'none',
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
    },
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
        visibility: 'hidden',
        msOverflowStyle: '-ms-autohiding-scrollbar',
        display: 'flex'
        // transition: 'all .25s',
        // transform: 'translate3d(0, 0, 0)', // 'scale(1)',
    },
    panelContainerCollapsed: {
        maxHeight: 0,
        top: '100%',
        visibility: 'hidden',
        opacity: 0,
        transform: 'scale(.9)'
    }
};

exports.default = Dropdown;