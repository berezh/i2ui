import React, { useRef } from 'react';
import { Layout } from '../../../components/layout';
import { useMouseMeta } from '../../../lib/hooks/mouse';
import { MouseTip } from '../components/mouse-tip';

import s from './index.module.css';

export function DirectionPage() {
  const objectRef = useRef<HTMLDivElement>(null);
  const meta = useMouseMeta(objectRef);

  return (
    <Layout hideMenu={true}>
      <div className={s.root}>
        <div ref={objectRef} className={s.object}>
          {meta?.distance}
        </div>
        <MouseTip />
      </div>
    </Layout>
  );
}
