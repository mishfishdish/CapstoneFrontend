// vite.config.ts
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {parse, serialize} from 'cookie';

export default defineConfig({
    base: '/',
    plugins: [
        react(),
        {
            name: 'stub-token-middleware',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const url = new URL(req.url || '', 'http://localhost');
                    const token = url.searchParams.get('token');
                    if (token) {
                        console.log("hello")
                        res.setHeader(
                            'Set-Cookie',
                            serialize('stub-token', token, {
                                path: '/',
                                maxAge: 60 * 60,
                            })
                        );
                    }
                    next();
                });
            },
        },
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq, req) => {
                        const cookieHeader = req.headers?.cookie;
                        console.log('[Proxy] Cookie header:', cookieHeader);
                        const cookies = cookieHeader ? parse(cookieHeader) : {};
                        const token = cookies['stub-token'] || 'default';
                        console.log('[Proxy] Forwarding token:', token);
                        proxyReq.setHeader('x-stub-token', token);
                    });
                },
            },
        },
    },
});

