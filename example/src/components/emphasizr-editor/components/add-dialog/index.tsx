import { Button, Dialog, InputGroup, NumericInput } from '@blueprintjs/core';
import React, { useCallback, useState } from 'react';

import './index.scss';
import { EuStateOption } from '../../../../interfaces';

interface AddTagDialogProps {
    isOpen: boolean;
    onAdd: (option: EuStateOption) => void;
    onCancel: () => void;
}

export const AddStateDialog: React.FC<AddTagDialogProps> = (props) => {
    const { isOpen, onCancel, onAdd } = props;
    const [enabled, setEnabled] = useState(false);
    const [name, setName] = useState('');
    const [population, setPopulation] = useState('');
    const [area, setArea] = useState('');
    const [gdpTotal, setGdpTotal] = useState('');
    const [gdpCapital, setGdpCapital] = useState('');

    function updateEnabled(name: string, population: string, area: string, gdpTotal: string, gdpCapital: string): void {
        setEnabled(
            (name ? true : false) &&
                (population ? true : false) &&
                (area ? true : false) &&
                (gdpTotal ? true : false) &&
                (gdpCapital ? true : false)
        );
    }

    const handleClose = useCallback(() => {
        onCancel();
        setName('');
        setPopulation('');
        setArea('');
        setGdpTotal('');
        setGdpCapital('');
    }, []);

    const handleAdd = useCallback(() => {
        onAdd({
            ...{
                name,
                population: parseFloat(population),
                area: parseFloat(area),
                gdpTotal: parseFloat(gdpTotal),
                gdpCapital: parseFloat(gdpCapital),
            },
        });
        setName('');
        setPopulation('');
        setArea('');
        setGdpTotal('');
        setGdpCapital('');
    }, [name, population, area, gdpTotal, gdpCapital]);

    return (
        <Dialog isOpen={isOpen} title="Add Tag" onClose={handleClose}>
            <div className="add-state-popup">
                <div className="add-state-popup__form">
                    <div>
                        <InputGroup
                            placeholder="Name"
                            value={name}
                            onChange={({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
                                setName(value);
                                updateEnabled(value, population, area, gdpTotal, gdpCapital);
                            }}
                        />
                    </div>
                    <div>
                        <NumericInput
                            placeholder="Population"
                            value={population}
                            onValueChange={(valueAsNumber: number, valueAsString: string) => {
                                setPopulation(valueAsString);
                                updateEnabled(name, valueAsString, area, gdpTotal, gdpCapital);
                            }}
                            buttonPosition="none"
                        />
                    </div>
                    <div>
                        <NumericInput
                            placeholder="Area"
                            value={area}
                            onValueChange={(valueAsNumber: number, valueAsString: string) => {
                                setArea(valueAsString);
                                updateEnabled(name, population, valueAsString, gdpTotal, gdpCapital);
                            }}
                            buttonPosition="none"
                        />
                    </div>
                    <div>
                        <NumericInput
                            placeholder="GDP Total"
                            value={gdpTotal}
                            onValueChange={(valueAsNumber: number, valueAsString: string) => {
                                setGdpTotal(valueAsString);
                                updateEnabled(name, population, area, valueAsString, gdpCapital);
                            }}
                            buttonPosition="none"
                        />
                    </div>
                    <div>
                        <NumericInput
                            placeholder="GDP Capital"
                            value={gdpCapital}
                            onValueChange={(valueAsNumber: number, valueAsString: string) => {
                                setGdpCapital(valueAsString);
                                updateEnabled(name, population, area, gdpTotal, valueAsString);
                            }}
                            buttonPosition="none"
                        />
                    </div>
                </div>
                <div className="add-state-popup__button">
                    <Button intent="primary" onClick={handleAdd} disabled={!enabled}>
                        Add
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </div>
            </div>
        </Dialog>
    );
};
