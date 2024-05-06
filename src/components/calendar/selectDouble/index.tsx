import { DATA_TEST_ID } from '@constants/data-test-id';
import { FC } from 'react';
import { StyledSelect } from './styled';

type DropdownDoubleProps = {
    isDouble: boolean;
    defaultsItems: string[];
    selectedItems: string[];
    defaultItem: string;
    onSelectItem: (name: string) => void;
};

export const SelectDouble: FC<DropdownDoubleProps> = ({
    defaultsItems,
    selectedItems,
    onSelectItem,
    defaultItem,
    isDouble = true,
}) => {
    const items = isDouble
        ? defaultsItems
              .filter((element) => !selectedItems.includes(element))
              .map((element) => ({ label: element, value: element }))
        : selectedItems.map((element) => ({ label: element, value: element }));

    const onChange = (value: string) => {
        onSelectItem(value);
    };

    return (
        <StyledSelect
            data-test-id={DATA_TEST_ID.modalCreateExerciseSelect}
            defaultValue={defaultItem || 'Выбор типа тренировки'}
            onChange={onChange}
            options={items}
        />
    );
};
