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
    searchHeight?: number,
    scrollbarComponent?: any
};

class MultiSelect extends Component<Props> {
    static defaultProps = {
        hasSelectAll: true,
        shouldToggleOnHover: false,
        optionHeight: 41,
        searchHeight: 62,
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('scroll', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onResize);
    }

    expanded = false;

    containerRef = null;
    dropdownRef = null;
    backDropRef = null

    contentHeight = 0;

    onResize = () => {
        if (this.expanded) {
            this.handleToggleExpanded(this.expanded);
        }
    }

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
        this.expanded = expanded;

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
                dropdownContentRef.style.maxHeight = 0;
                dropdownContentRef.style.transition = 'all .25s';
                dropdownContentRef.style.height = `${contentOffset.height}px`

                if (clientHeight < containerOffset.bottom + contentOffset.height - 20) {
                    dropdownContentRef.style.left = `${containerOffset.left - backDropOffset.left}px`;
                    if (clientHeight < backDropOffset.bottom) {
                        dropdownContentRef.style.bottom = `${backDropOffset.bottom - clientHeight + 20}px`;
                    } else {
                        dropdownContentRef.style.bottom = '20px';
                    }
                } else {
                    dropdownContentRef.style.top = `${containerOffset.bottom - backDropOffset.top}px`;
                    dropdownContentRef.style.left = `${containerOffset.left - backDropOffset.left}px`;
                }

                dropdownContentRef.style.visibility = 'visible';
                dropdownContentRef.style.maxHeight = '300px';
                if (this.dropdownRef.selectPanel) {
                    this.dropdownRef.selectPanel.focus();
                    if (this.dropdownRef.selectPanel.scrollbarRef){
                        this.dropdownRef.selectPanel.scrollbarRef.update();
                    }
                }
            }
        } else {
            this.backDropRef.style.display = 'none';
            const dropdownContentRef = this.dropdownRef.dropdownContentRef;
            this.dropdownRef.wrapper.appendChild(this.dropdownRef.dropdownContentRef);
            dropdownContentRef.style.top = '100%';
            dropdownContentRef.style.left = '';
            dropdownContentRef.style.bottom = '';
            dropdownContentRef.style.transition = 'unset';
            dropdownContentRef.style.visibility = 'hidden';
        }
    }

    handleBackDropClick = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.handleToggleExpanded(false);

        if (this.dropdownRef) {
            this.dropdownRef.toggleExpanded(false);
        }
    }

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
            scrollbarComponent,
        } = this.props;

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
                        onToggleExpanded: this.handleToggleExpanded,
                        disabled,
                        disableSearch,
                        filterOptions,
                        overrideStrings,
                        scrollbarComponent,
                    }}
                    disabled={disabled}
                    arrowIcon
                    ref={ref => {
                        this.dropdownRef = ref;
                    }}
                >
                    {this.renderHeader()}
                </Dropdown>
            </div>
            <div
                className="multi-select-backdrop"
                style={styles.backDrop}
                onMouseDown={this.handleBackDropClick}
                onTouchStart={this.handleBackDropClick}
                ref={ref => {
                    this.backDropRef = ref;
                }}
            />
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
        display: 'none',
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
