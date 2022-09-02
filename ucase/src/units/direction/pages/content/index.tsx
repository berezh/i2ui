import React, { useRef } from 'react';
import { useMouseMeta } from '../../../../lib/hooks/mouse';
import { MouseTip } from '../../components/mouse-tip';

import s from './index.module.css';

export function DirectionContent() {
  const objectRef = useRef<HTMLDivElement>(null);
  const meta = useMouseMeta(objectRef?.current);

  return (    
      <div className={s.root}>
        <div ref={objectRef} className={s.object}>
          {meta?.distance}<br/>
          {meta?.ratio}
        </div>
        <MouseTip />
      </div>
  );
}
