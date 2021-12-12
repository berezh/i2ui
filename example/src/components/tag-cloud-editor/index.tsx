import React, { useCallback, FormEvent, useState } from 'react';
import { TagProps } from '../../i2ui';
import { InputGroup, NumericInput, Button, Icon } from '@blueprintjs/core';
import { AddTagDialog } from './components/add-dialog';
import { UpdateTagParams } from '../../units/main/redux';

import './index.scss';

interface TagCloudEditorProps {
    options: TagProps[];
    updateTagOption: (params: UpdateTagParams) => void;
    removeTagOption: (index: number) => void;
    addTagOption: (tag?: TagProps) => void;
    reset: () => void;
}

export const TagCloudEditor: React.FC<TagCloudEditorProps> = (props) => {
    const { options, updateTagOption, removeTagOption, addTagOption, reset } = props;
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleChange = useCallback<(index: number, name: string, rate: number) => void>((index, name, rate) => {
        updateTagOption({ index, name, rate });
    }, []);

    const handleRemove = useCallback<(index: number) => void>((index) => {
        removeTagOption(index);
    }, []);

    const handleAddTag = useCallback<(tag: TagProps) => void>((tag) => {
        addTagOption(tag);
        setIsAddOpen(false);
    }, []);

    const handleAddCancel = useCallback<() => void>(() => {
        setIsAddOpen(false);
    }, []);

    return (
        <div className="tag-cloud-editor">
            <div className="tag-cloud-editor__action">
                <Button small={true} icon="add" intent="primary" onClick={() => setIsAddOpen(true)}>
                    Add
                </Button>
                <Button small={true} icon="reset" onClick={() => reset()}>
                    Reset
                </Button>
                <AddTagDialog isOpen={isAddOpen} onAdd={handleAddTag} onCancel={handleAddCancel} />
            </div>
            <div className="tag-cloud-editor__container">
                {options.map((x, i) => (
                    <div key={i} className="tag-cloud-editor__item">
                        <div>
                            <InputGroup
                                value={x.text}
                                onChange={(e: FormEvent<HTMLInputElement>) =>
                                    handleChange(i, e.currentTarget.value, x.rate)
                                }
                            ></InputGroup>
                        </div>
                        <div>
                            <NumericInput
                                buttonPosition="none"
                                value={x.rate}
                                onValueChange={(value) => handleChange(i, x.text, value)}
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
