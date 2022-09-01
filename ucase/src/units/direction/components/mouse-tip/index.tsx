import React, { useState, useMemo } from 'react';

import s from './index.module.css';

export interface MousePosition {
  x: number;
  y: number;
}

export function MouseTip() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const mouseStyle = useMemo<React.CSSProperties>(() => {
    return position ? { top: position.y + 10, left: position.x + 10 } : { display: 'none' };
  }, [position]);

  return (
    <div className={s.root} style={mouseStyle}>
      {`X:${position.x} Y:${position.y}`}
      <br />
      {`S:`}
    </div>
  );
}
