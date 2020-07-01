// @flow
/**
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 */
import {filterOptions} from 'fuzzy-match-utils';
import React, {Component} from 'react';

import SelectItem from './select-item.js';
import SelectList from './select-list.js';
import getString from "./get-string.js";

import type {Option} from './select-item.js';

type Props = {
    ItemRenderer?: Function,
    options: Array<Option>,
    selected: Array<any>,
    selectAllLabel?: string,
    onSelectedChanged: (selected: Array<any>) => void,
    disabled?: boolean,
    disableSearch?: boolean,
    hasSelectAll: boolean,
    hasClearAll: boolean,
    filterOptions?: (options: Array<Option>, filter: string) => Array<Option>,
    overrideStrings?: {[string]: string},
    onToggleExpanded?: (expanded: boolean) => void,
    scrollbarComponent?: any
};

type State = {
    searchHasFocus: boolean,
    searchText: string,
    focusIndex: number
};

class defaultScrollbarComponent extends Component {
    scrollTop = () => {}
    update = () => {}

    render = () => {
        return <div>
            {this.props.children}
        </div>;
    };
};

class SelectPanel extends Component<Props, State> {

    state = {
        searchHasFocus: false,
        searchText: "",
        focusIndex: -1,
        clearAllHover: false
    }

    inputRef = null;
    scrollbarRef = null;

    expanded = false;

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

    selectAll = () => {
        const {onSelectedChanged, options} = this.props;
        const allValues = options.map(o => o.value);

        onSelectedChanged(allValues);
    }

    selectNone = () => {
        const {onSelectedChanged} = this.props;

        onSelectedChanged([]);
    }

    selectAllChanged = (checked: boolean) => {
        if (checked) {
            this.selectAll();
        } else {
            this.selectNone();
        }
    }

    handleSearchChange = (e: {target: {value: any}}) => {
        this.setState({
            searchText: e.target.value,
            focusIndex: -1,
        });
    }

    handleItemClicked = (index: number) => {
        this.setState({focusIndex: index});
    }

    clearSearch = () => {
        this.setState({searchText: ""});
    }

    toggleChecked = () => {
        const {focusIndex} = this.state;
        const {selected, disabled, onSelectedChanged} = this.props;
        const options = this.filteredOptions();

        if (focusIndex === 0) {
            if (selected.length === options.length) {
                this.selectNone();
            } else {
                this.selectAll();
            }
            return;
        }

        if (disabled) {
            return;
        }

        const option = options[focusIndex - 1];
        const optionIndex = selected.indexOf(option.value);

        if (optionIndex < 0) {
            onSelectedChanged([...selected, option.value]);
        } else {
            const removed = [
                ...selected.slice(0, optionIndex),
                ...selected.slice(optionIndex + 1),
            ];
            onSelectedChanged(removed);
        }
    }

    handleKeyDown = (e: KeyboardEvent) => {
        switch (e.which) {
            case 13: // Enter
            case 32: // Space
                this.toggleChecked();
                break;
            case 38: // Up Arrow
                if (e.altKey) {
                    return;
                }

                this.updateFocus(-1);
                break;
            case 40: // Down Arrow
                if (e.altKey) {
                    return;
                }

                this.updateFocus(1);
                break;
            default:
                return;
        }

        e.stopPropagation();
        e.preventDefault();
    }

    handleSearchFocus = (searchHasFocus: boolean) => {
        this.setState({
            searchHasFocus,
            focusIndex: -1,
        });
    }

    allAreSelected() {
        const {options, selected} = this.props;
        return options.length === selected.length;
    }

    filteredOptions() {
        const {searchText} = this.state;
        const {options, filterOptions: customFilterOptions} = this.props;

        return customFilterOptions ?
            customFilterOptions(options, searchText) :
            filterOptions(options, searchText);
    }

    updateFocus(offset: number) {
        const {focusIndex} = this.state;
        const {options} = this.props;

        let newFocus = focusIndex + offset;
        newFocus = Math.max(0, newFocus);
        newFocus = Math.min(newFocus, options.length);

        this.setState({focusIndex: newFocus}, () => {
            try {
                const container = this.panelRef.parentElement;
                const scrollTop = container.scrollTop;
                const { height } = container.getBoundingClientRect();
                const focusItemTop = 46 + (this.props.disableSearch ? 0 : 36) + newFocus * 36;
                if (newFocus === 0) {
                    container.scrollTo(0, 0);
                } else if (offset > 0 && height + scrollTop < focusItemTop) {
                    container.scrollBy(0, 36);
                } else if (offset < 0 && scrollTop + 36 > focusItemTop) {
                    container.scrollBy(0, -36);
                }
            } catch(e) {
                // 
            }
        });
    }

    handleHoverChanged = (index) => {
        this.updateFocus(index - this.state.focusIndex);
    }

    focus = () => {
        if (this.expanded && this.inputRef) {
            this.inputRef.focus();
        }
    }

    expandedChange = (expanded) => {
        if (!this.expanded && expanded) {
            this.expanded = expanded;
            if (this.inputRef) {
                this.inputRef.focus();
            }
            if (typeof this.props.onToggleExpanded === 'function') {
                this.props.onToggleExpanded(expanded);
            }
        } else if (!expanded) {
            this.expanded = expanded;
            this.setState({
                focusIndex: -1,
            });
        }
    }

    clearSearchText = () => {
        this.setState({
            searchText: '',
        });
    }

    handleClearAllButtonFocus = (clearAllHover: boolean) => {
        this.setState({
            clearAllHover,
        });
    }

    render() {
        const {focusIndex, searchText, clearAllHover} = this.state;
        const {
            ItemRenderer,
            selectAllLabel,
            disabled,
            disableSearch,
            hasSelectAll,
            hasClearAll,
            overrideStrings,
            scrollbarComponent = defaultScrollbarComponent,
        } = this.props;

        const selectAllOption = {
            label: selectAllLabel || getString("selectAll", overrideStrings),
            value: "",
        };
        const clearAllContainerStyle = disableSearch ? Object.assign({}, styles.clearAllButtonContainer, {paddingTop:'12px'}) : styles.clearAllButtonContainer
        const clearAllButtonStyle = clearAllHover ? Object.assign({},styles.clearAllButton,{textDecoration:'underline'}): styles.clearAllButton;
        const Scrollbars = scrollbarComponent;
        return <Scrollbars
            ref={ref => {
                this.scrollbarRef = ref;
            }}
        >
            <div
                className="select-panel"
                style={styles.panel}
                role="listbox"
                //onKeyDown={this.handleKeyDown}
                onKeyDownCapture={this.handleKeyDown}
                ref={ref => this.panelRef = ref}
            >
                {!disableSearch && <div style={styles.searchContainer}>
                    <input
                        autoFocus={true}
                        ref={ref => {
                            this.inputRef = ref;
                        }}
                        value={searchText}
                        className="dropdown-search-input"
                        placeholder={getString("search", overrideStrings)}
                        type="text"
                        onChange={this.handleSearchChange}
                        style={{...styles.search}}
                        //onFocus={() => this.handleSearchFocus(true)}
                        onBlur={() => this.handleSearchFocus(false)}
                    />
                    <div style={{...styles.searchIcon}}>
                        {!!searchText ? (
                            <svg onClick={this.clearSearchText} width="24" height="24" viewBox="0 0 24 24" style={{cursor: 'pointer'}}>
                                <defs>
                                    <path id="multiselect-clear" d="M0 9a9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9zm12.808 2.885a.653.653 0 1 1-.923.924L9 9.924l-2.885 2.885a.651.651 0 0 1-.924 0 .654.654 0 0 1 0-.924L8.076 9 5.19 6.115a.654.654 0 0 1 .924-.923L9 8.076l2.885-2.884a.653.653 0 1 1 .923.923L9.924 9l2.884 2.885z"/>
                                </defs>
                                <use fill="#6D7381" fillRule="nonzero" opacity=".4" transform="translate(3 3)" xlinkHref="#multiselect-clear"/>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" style={{marginTop: '4px'}}>
                                <defs>
                                    <path id="multiselect-search" d="M13.436 12.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM7.5 13a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"/>
                                </defs>
                                <use fill="#6D7381" fillRule="nonzero" transform="translate(1 1)" xlinkHref="#multiselect-search"/>
                            </svg>
                        )}
                    </div>
                </div>}
                {
                    hasClearAll &&(
                        <div style={clearAllContainerStyle}>
                            <span style={clearAllButtonStyle} onClick={this.selectNone} onMouseEnter={()=>this.handleClearAllButtonFocus(true)} 
                                onMouseLeave={()=>this.handleClearAllButtonFocus(false)}>Clear All</span>
                        </div>
                        
                    )
                }
                {hasSelectAll &&
                <SelectItem
                    focused={focusIndex === 0}
                    checked={this.allAreSelected()}
                    option={selectAllOption}
                    allOption
                    onSelectionChanged={this.selectAllChanged}
                    onClick={() => this.handleItemClicked(0)}
                    ItemRenderer={ItemRenderer}
                    disabled={disabled}
                    onHoverChanged={() => {
                        this.handleHoverChanged(0);
                    }}
                />
                }

                <SelectList
                    {...this.props}
                    options={this.filteredOptions()}
                    focusIndex={focusIndex - 1}
                    onClick={(e, index) => this.handleItemClicked(index + 1)}
                    ItemRenderer={ItemRenderer}
                    disabled={disabled}
                    onHoverChanged={(index) => {
                        this.handleHoverChanged(index + 1);
                    }}
                />
            </div>
        </Scrollbars>;
    }
}

const styles = {
    panel: {
        height: '100%',
        boxSizing : 'border-box',
        transition: 'all 200ms',
    },
    search: {
        display: "block",
        height: '32px',
        maxWidth: "100%",
        borderRadius: "4px",
        backgroundColor: 'rgba(134, 147, 201, 0.1)',
        boxSizing : 'border-box',
        lineHeight: '24px',
        border: 0,
        borderColor: '#dee2e4',
        padding: '6px 30px 6px 10px',
        width: "100%",
        outline: "none",
        fontSize: '14px',
    },
    searchFocused: {
        borderColor: "#4285f4",
    },
    searchContainer: {
        position: 'relative',
        width: "100%",
        boxSizing : 'border-box',
        padding: '16px 10px 14px',
    },
    searchIcon: {
        position: 'absolute',
        width: '24px',
        height: '24px',
        top: '18px',
        right: '15px',
    },
    clearAllButton:{
        border:'none',
        fontSize:'13px',
        color:'#4285f4',
        cursor:'pointer',
        margin: '0px 20px',
    },
    clearAllButtonContainer:{
        borderBottom:'1px solid #6d738133',
        paddingBottom:'11px'
    }
};

export default SelectPanel;
