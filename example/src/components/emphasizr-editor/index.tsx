import React, { useCallback, FormEvent, useState } from 'react';
import { InputGroup, NumericInput, Button, Icon } from '@blueprintjs/core';
import { AddStateDialog } from './components/add-dialog';
import { EuStateOption, IndexEuStateOption } from '../../interfaces';

import './index.scss';

interface Props {
    options: EuStateOption[];
    updateTagOption: (params: IndexEuStateOption) => void;
    removeTagOption: (index: number) => void;
    addTagOption: (option: EuStateOption) => void;
    reset: () => void;
}

export const EmphasizerEditor: React.FC<Props> = (props) => {
    const { options, updateTagOption, removeTagOption, addTagOption, reset } = props;
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleChange = useCallback<(params: IndexEuStateOption) => void>((params) => {
        updateTagOption({ ...params });
    }, []);

    const handleRemove = useCallback<(index: number) => void>((index) => {
        removeTagOption(index);
    }, []);

    const handleAddTag = useCallback<(tag: EuStateOption) => void>((tag) => {
        addTagOption(tag);
        setIsAddOpen(false);
    }, []);

    const handleAddCancel = useCallback<() => void>(() => {
        setIsAddOpen(false);
    }, []);

    return (
        <div className="emphasizer-editor">
            <div className="emphasizer-editor__action">
                <Button small={true} icon="add" intent="primary" onClick={() => setIsAddOpen(true)}>
                    Add
                </Button>
                <Button small={true} icon="reset" onClick={() => reset()}>
                    Reset
                </Button>
                <AddStateDialog isOpen={isAddOpen} onAdd={handleAddTag} onCancel={handleAddCancel} />
            </div>
            <div className="emphasizer-editor__container">
                {options.map((x, i) => (
                    <div key={i} className="emphasizer-editor__item">
                        <div>
                            <InputGroup
                                value={x.name}
                                onChange={(e: FormEvent<HTMLInputElement>) =>
                                    handleChange({ ...x, index: i, name: e.currentTarget.value })
                                }
                            ></InputGroup>
                        </div>
                        <div>
                            <NumericInput
                                buttonPosition="none"
                                value={x.population}
                                onValueChange={(value) => handleChange({ ...x, index: i, population: value })}
                            />
                        </div>
                        <div>
                            <NumericInput
                                buttonPosition="none"
                                value={x.area}
                                onValueChange={(value) => handleChange({ ...x, index: i, area: value })}
                            />
                        </div>
                        <div>
                            <NumericInput
                                buttonPosition="none"
                                value={x.gdpTotal}
                                onValueChange={(value) => handleChange({ ...x, index: i, gdpTotal: value })}
                            />
                        </div>
                        <div>
                            <NumericInput
                                buttonPosition="none"
                                value={x.gdpCapital}
                                onValueChange={(value) => handleChange({ ...x, index: i, gdpCapital: value })}
                            />
                        </div>
                        <div>
                            <Button onClick={() => handleRemove(i)}>
                                <Icon icon="small-cross" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
