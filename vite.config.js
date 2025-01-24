import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
    plugins: [
        uni()
    ],
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/cooked-recommend': {
                target: 'http://120.46.149.115:8085',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cooked-recommend/, ''),
                secure: false,
                ws: true,
                configure: (proxy, options) => {
                    // proxy.on('error', (err, req, res) => {
                    //     console.error('代理错误:', err);
                    // });
                    // proxy.on('proxyReq', (proxyReq, req, res) => {
                    //     console.log('代理请求:', {
                    //         method: req.method,
                    //         url: req.url,
                    //         headers: proxyReq.getHeaders()
                    //     });
                    // });
                    // proxy.on('proxyRes', (proxyRes, req, res) => {
                    //     console.log('代理响应:', {
                    //         statusCode: proxyRes.statusCode,
                    //         headers: proxyRes.headers
                    //     });
                    // });
                }
            },
            '/img-server': {
                target: 'http://120.46.149.116:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/img-server/, ''),
                secure: false,
                ws: true
            }
        }
    }
})
