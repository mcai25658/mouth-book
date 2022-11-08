import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log(mode);

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(),  viteCompression()],
    server: {
      host: '0.0.0.0',
      port: process.env.VITE_PORT as unknown as number,
      proxy: {
        '/api': {
          target: process.env.VITE_HOST,
          secure: false,
          changeOrigin: true,
        },
      },
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            additionalData: `true; @import "${resolve('./src/assets//theme/variables.less')}"`,
            hack: `true; @import "${resolve('./src/assets//theme/primary-theme.less')}"`,
          },
        },
      },
    },

    build: {
      emptyOutDir: true, // 打包前清空原有打包資料夾
    },
  });
};


