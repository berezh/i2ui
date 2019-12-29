import React, { useCallback } from 'react';
import { MenuItem, Button } from '@blueprintjs/core';
import { Select, ItemRenderer, ItemPredicate } from '@blueprintjs/select';
import { SelectOption } from '../../interfaces/option';

const OptionTypeSelect = Select.ofType<SelectOption>();

interface FormSelectProps {
    options: SelectOption[];
    placeholder?: string;
    value?: string;
    onChange?: (value?: string) => void;
}

type Props = FormSelectProps;

export const OptionSelect: React.FC<Props> = props => {
    const { options, placeholder, value, onChange } = props;

    const itemRender: ItemRenderer<SelectOption> = (option, { handleClick, modifiers }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                disabled={option.disabled}
                key={option.value}
                onClick={handleClick}
                text={option.name}
            />
        );
    };

    const itemPredicate: ItemPredicate<SelectOption> = (query, item) => {
        return `${item.value} ${item.name.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;
    };

    const onItemSelect = useCallback<(item: SelectOption) => void>(
        item => {
            if (onChange) {
                onChange(item ? item.value : undefined);
            }
        },
        [onChange],
    );

    const activeItem = options.find(x => x.value === value);
    const caption = activeItem ? activeItem.name : placeholder || 'Select';

    return (
        <OptionTypeSelect
            items={options}
            activeItem={activeItem}
            itemRenderer={itemRender}
            itemPredicate={itemPredicate}
            onItemSelect={onItemSelect}
            noResults={<MenuItem disabled={true} text="No results." />}
        >
            <Button text={caption} rightIcon="caret-down" />
        </OptionTypeSelect>
    );
};
