import { Layout } from '../../../components/layout';
import { MouseProvider } from '../../../components/mouse-provider';
import { DirectionContent } from './content';

import s from './index.module.css';

export function DirectionPage() {
  return (    
    <MouseProvider className={s.provider}>
      <Layout hideMenu={true}>
        <DirectionContent/>
      </Layout>
    </MouseProvider>
  );
}
