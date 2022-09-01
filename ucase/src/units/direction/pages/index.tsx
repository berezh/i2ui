import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../../../components/layout';
import { useMouse } from '../../../components/mouse-provider';
import { MouseTip } from '../components/mouse-tip';

import s from './index.module.css';

export function DirectionPage() {
  const [distance, setDistance] = useState(0);
  const position = useMouse();

  const objectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (objectRef.current) {
      const { x, y, width, height } = objectRef.current.getBoundingClientRect();
      const oX = Math.floor(x + width / 2);
      const oY = Math.floor(y + height / 2);

      const d = Math.sqrt(Math.abs(Math.pow(position.x - oX, 2) + Math.pow(position.y - oY, 2)));
      setDistance(Math.floor(d));
    }
  }, [objectRef, position]);

  return (
    <Layout hideMenu={true}>
      <div className={s.root}>
        <div ref={objectRef} className={s.object}>
          {distance}
        </div>
        <MouseTip />
      </div>
    </Layout>
  );
}
