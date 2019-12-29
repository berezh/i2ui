import { Button, Dialog, InputGroup, NumericInput } from '@blueprintjs/core';
import React, { useCallback, useState } from 'react';

import './index.scss';
import { TagProps } from '../../../../i2ui';

interface AddTagDialogProps {
    isOpen: boolean;
    onAdd: (tag: TagProps) => void;
    onCancel: () => void;
}

export const AddTagDialog: React.FC<AddTagDialogProps> = props => {
    const { isOpen, onCancel, onAdd } = props;
    const [enabled, setEnabled] = useState(false);
    const [text, setText] = useState('');
    const [rate, setRate] = useState('');

    const handleName = useCallback(
        ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
            setText(value);
            setEnabled(value && rate ? true : false);
        },
        [rate],
    );

    const handleRate = useCallback(
        (valueAsNumber: number, valueAsString: string) => {
            setRate(valueAsString);
            setEnabled(valueAsString && text ? true : false);
        },
        [text],
    );

    const handleClose = useCallback(() => {
        onCancel();
        setText('');
        setRate('');
    }, []);

    const handleAdd = useCallback(() => {
        onAdd({
            ...{
                text,
                rate: parseFloat(rate),
            },
        });
        setText('');
        setRate('');
    }, [text, rate]);

    return (
        <Dialog isOpen={isOpen} title="Add Tag" onClose={handleClose}>
            <div className="add-popup">
                <div className="add-popup__form">
                    <div>
                        <InputGroup placeholder="Name" value={text} onChange={handleName} />
                    </div>
                    <div>
                        <NumericInput
                            placeholder="Rate"
                            value={rate}
                            onValueChange={handleRate}
                            buttonPosition="none"
                        />
                    </div>
                </div>
                <div className="add-popup__button">
                    <Button intent="primary" onClick={handleAdd} disabled={!enabled}>
                        Add
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    );
};
