import { Layout } from '../../../components/layout';
import { MousePositionProvider } from '../../../components/mouse-provider';
import { DirectionContent } from './content';

import s from './index.module.css';

export function DirectionPage() {
  return (    
    <MousePositionProvider className={s.provider}>
      <Layout hideMenu={true}>
        <DirectionContent/>
      </Layout>
    </MousePositionProvider>
  );
}
