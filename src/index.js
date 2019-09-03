// @flow
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
import React, {Component, Fragment} from 'react';

import Dropdown from './dropdown.js';
import SelectPanel from './select-panel.js';
import getString from './get-string.js';

import type {
    Option,
} from './select-item.js';

type Props = {
    options: Array<Option>,
    selected: Array<any>,
    onSelectedChanged?: (selected: Array<any>) => void,
    valueRenderer?: (
        selected: Array<any>,
        options: Array<Option>
    ) => string,
    ItemRenderer?: Function,
    selectAllLabel?: string,
    isLoading?: boolean,
    disabled?: boolean,
    disableSearch?: boolean,
    shouldToggleOnHover: boolean,
    hasSelectAll: boolean,
    filterOptions?: (options: Array<Option>, filter: string) => Array<Option>,
    overrideStrings?: {[string]: string},
    optionHeight?: number,
    searchHeight?: number
};

class MultiSelect extends Component<Props> {
    static defaultProps = {
        hasSelectAll: true,
        shouldToggleOnHover: false,
        optionHeight: 41,
        searchHeight: 62,
    }

    state = {
        expanded: false,
        expandedStyle: {},
        wrapperStyle: {},
    }

    containerRef = null;
    dropdownRef = null;
    backDropRef = null

    contentHeight = 0;

    getSelectedText() {
        const {options, selected} = this.props;

        const selectedOptions = selected
            .map(s => options.find(o => o.value === s));

        const selectedLabels = selectedOptions.map(s => s ? s.label : "");

        return selectedLabels.join(", ");
    }

    renderHeader() {
        const {
            options,
            selected,
            valueRenderer,
            overrideStrings,
        } = this.props;

        const style = {
            display: 'inline-block',
            height: '40px',
            lineHeight: '40px',
        };

        const noneSelected = selected.length === 0;
        const allSelected = selected.length === options.length;

        const customText = valueRenderer && valueRenderer(selected, options);

        if (noneSelected) {
            return <span className="noneSelected" style={Object.assign({}, styles.noneSelected, style)}>
                {customText || getString("selectSomeItems", overrideStrings)}
            </span>;
        }

        if (customText) {
            return <span style={style}>{customText}</span>;
        }

        return <span style={style}>
            {allSelected
                ? getString("allItemsAreSelected", overrideStrings)
                : this.getSelectedText()
            }
        </span>;
    }

    handleSelectedChanged = (selected: Array<any>) => {
        const {onSelectedChanged, disabled} = this.props;

        if (disabled) {
            return;
        }

        if (onSelectedChanged) {
            onSelectedChanged(selected);
        }
    }

    handleToggleExpanded = (expanded) => {
        if (expanded) {
            if (this.dropdownRef && this.dropdownRef.dropdownContentRef) {
                const {
                    clientHeight,
                } = document.body;
                const containerOffset = this.containerRef.getBoundingClientRect();
                const contentOffset = this.dropdownRef.dropdownContentRef.getBoundingClientRect();

                this.backDropRef.style.display = 'block';
                const backDropOffset = this.backDropRef.getBoundingClientRect();
                const dropdownContentRef = this.dropdownRef.dropdownContentRef;

                this.backDropRef.appendChild(dropdownContentRef);
                dropdownContentRef.style.minWidth = `${containerOffset.width}px`;
                dropdownContentRef.style.top = '';
                if (clientHeight < containerOffset.bottom + contentOffset.height - 20) {
                    dropdownContentRef.style.left = `${containerOffset.left - backDropOffset.left}px`;
                    dropdownContentRef.style.bottom = '20px';
                } else {
                    dropdownContentRef.style.top = `${containerOffset.bottom - backDropOffset.top}px`;
                    dropdownContentRef.style.left = `${containerOffset.left - backDropOffset.left}px`;
                }
            }

        } else {
            this.dropdownRef.wrapper.appendChild(this.dropdownRef.dropdownContentRef);
            this.dropdownRef.dropdownContentRef.style.top = '100%';
            this.dropdownRef.dropdownContentRef.style.left = '';
            this.dropdownRef.dropdownContentRef.style.bottom = '';
        }

        this.setState({
            expanded,
        });
    }

    handleBackDropClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.dropdownRef) {
            this.dropdownRef.toggleExpanded(false);
        }
    }

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

    render() {
        const {
            ItemRenderer,
            options,
            selected,
            selectAllLabel,
            isLoading,
            disabled,
            disableSearch,
            filterOptions,
            shouldToggleOnHover,
            hasSelectAll,
            overrideStrings,
        } = this.props;

        const {
            expanded,
            contentStyle,
        } = this.state;

        return <div className="multi-select">
            <div
                className="multi-select-body"
                ref={ref => {
                    this.containerRef = ref;
                }}
            >
                <Dropdown
                    isLoading={isLoading}
                    contentComponent={SelectPanel}
                    shouldToggleOnHover={shouldToggleOnHover}
                    contentProps={{
                        ItemRenderer,
                        options,
                        selected,
                        hasSelectAll,
                        selectAllLabel,
                        onSelectedChanged: this.handleSelectedChanged,
                        // onToggleExpanded: this.handleUpdateContent,
                        disabled,
                        disableSearch,
                        filterOptions,
                        overrideStrings,
                    }}
                    disabled={disabled}
                    arrowIcon
                    onToggleExpanded={this.handleToggleExpanded}
                    contentStyle={contentStyle}
                    ref={ref => {
                        this.dropdownRef = ref;
                    }}
                >
                    {this.renderHeader()}
                </Dropdown>
            </div>
            <div
                className="multi-select-backdrop"
                style={Object.assign({}, styles.backDrop, {display: expanded ? 'block'  : 'none'})}
                onMouseDown={this.handleBackDropClick}
                onTouchStart={this.handleBackDropClick}
                ref={ref => {
                    this.backDropRef = ref;
                }}
            ></div>
        </div>;
    }
}

const styles = {
    noneSelected: {
        color: "#999",
    },
    backDrop: {
        // width: '100%',
        // height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
    },
};

export default MultiSelect;
export {Dropdown};
