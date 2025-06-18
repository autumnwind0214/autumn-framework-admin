import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        host: "127.0.0.1",
        // proxy: {
        //   '/api': {
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, ''),
        //     // mock代理目标地址
        //     target: 'http://127.0.0.1:81',
        //     ws: true,
        //   },
        // },
        proxy:{}
      },
    },
  };
});
