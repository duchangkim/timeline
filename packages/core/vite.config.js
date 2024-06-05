/* global __dirname */

import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // 라이브러리 엔트리 파일 경로
      name: 'TimelineCore', // 라이브러리 이름
      fileName: (format) => `@duchi-timeline-core.${format}.js`, // 출력 파일 이름
    },
    sourcemap: true,
    // https://ko.vitejs.dev/guide/build.html#library-mode
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.js'],
  },
});
