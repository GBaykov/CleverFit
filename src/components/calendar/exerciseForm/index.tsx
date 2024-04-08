import React, { ChangeEvent, FC } from 'react';
import { Nullable } from '../../../commonTypes';
import { Checkbox, Input, InputNumber } from 'antd';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { StyledLabel, StyledWrapper } from './styled';

type ExercisesFormProps = {
    index: number;
    indexes: number[];
    weight: number;
    approaches: number;
    name: string;
    replays: number;
    isCheck: boolean;
    onChangeName: (value: string, index: number) => void;
    onChangeReplays: (value: Nullable<number>, index: number) => void;
    onChangeWeight: (value: Nullable<number>, index: number) => void;
    onChangeApproaches: (value: Nullable<number>, index: number) => void;
    onCheckedElement: (index: number) => void;
};

export const ExercisesForm: FC<ExercisesFormProps> = ({
    onChangeReplays,
    onChangeApproaches,
    onChangeWeight,
    onChangeName,
    onCheckedElement,
    weight,
    replays,
    name,
    approaches,
    index,
    indexes,
    isCheck,
}) => {
    const isChecked = indexes.includes(index);

    const onChangeNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
        onChangeName(event.currentTarget.value, index);
    };

    const onChangeApproachesHandle = (value: Nullable<number>) => {
        onChangeApproaches(value, index);
    };

    const onChangeReplaysHandle = (value: Nullable<number>) => {
        onChangeReplays(value, index);
    };

    const onChangeWeightHandle = (value: Nullable<number>) => {
        onChangeWeight(value, index);
    };

    return (
        <React.Fragment>
            <Input
                data-test-id={`${DATA_TEST_ID.modalDrawerRightInputExercise}${index}`}
                value={name}
                style={{ width: '100%', margin: '24px 0 0 0' }}
                onChange={onChangeNameHandle}
                placeholder='Упражнениe'
                addonAfter={
                    isCheck && (
                        <Checkbox
                            data-test-id={`${DATA_TEST_ID.modalDrawerRightCheckboxExercise}${index}`}
                            checked={isChecked}
                            onChange={() => onCheckedElement(index)}
                        />
                    )
                }
            />
            <StyledWrapper>
                <StyledLabel style={{ width: '120px' }}>Подходы</StyledLabel>
                <StyledWrapper style={{ width: '195px' }}>
                    <StyledLabel style={{ width: '90px' }}>Вес, кг</StyledLabel>
                    <StyledLabel style={{ width: '90px' }}>Количество</StyledLabel>
                </StyledWrapper>
            </StyledWrapper>
            <StyledWrapper>
                <InputNumber
                    data-test-id={`${DATA_TEST_ID.modalDrawerRightInputApproach}${index}`}
                    value={replays}
                    style={{ width: '120px' }}
                    addonBefore='+'
                    min={1}
                    onChange={onChangeReplaysHandle}
                />
                <StyledWrapper style={{ width: '195px' }}>
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputWeight}${index}`}
                        value={weight}
                        style={{ width: '90px' }}
                        min={0}
                        onChange={onChangeWeightHandle}
                    />
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputQuantity}${index}`}
                        value={approaches}
                        style={{ width: '90px' }}
                        min={0}
                        onChange={onChangeApproachesHandle}
                    />
                </StyledWrapper>
            </StyledWrapper>
        </React.Fragment>
    );
};
