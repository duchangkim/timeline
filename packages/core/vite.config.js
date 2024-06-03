/* global __dirname */

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // 라이브러리 엔트리 파일 경로
      name: 'TimelineCore', // 라이브러리 이름
      fileName: (format) => `@duchi-timeline-core.${format}.js`, // 출력 파일 이름
    },
  },
});
