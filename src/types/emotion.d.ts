import '@emotion/react';
import { Theme, Interpolation } from '@emotion/react';

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>;
  }
}
