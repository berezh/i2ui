import React, { useState, useCallback } from 'react';
import { SketchPicker } from 'react-color';
import './index.scss';

interface Props {
    color?: string;
    onChange: (value: string) => void;
}

export const ColorPicker: React.FC<Props> = (props) => {
    const { color, onChange } = props;
    const [open, setOpen] = useState(false);
    const handleClick = useCallback(() => setOpen(!open), [open]);
    const handleClose = useCallback(() => setOpen(false), [open]);
    const handleChange = useCallback<(color: string) => void>((color) => {
        onChange(color);
    }, []);

    return (
        <div className="color-picker">
            <div className="color-picker__watch" onClick={handleClick}>
                <div className="color-picker__color" style={{ backgroundColor: color }} />
            </div>
            {open ? (
                <div className="color-picker__popover">
                    <div className="color-picker__cover" onClick={handleClose} />
                    <SketchPicker color={color} onChange={(color) => handleChange(color.hex)} />
                </div>
            ) : null}
        </div>
    );
};
