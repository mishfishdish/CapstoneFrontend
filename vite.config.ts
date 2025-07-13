import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    // @ts-ignore
    root: path.resolve(__dirname, 'frontend'),
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000', // your stub server
                changeOrigin: true,
                configure: (proxy) => {
                    proxy.on('proxyReq', (proxyReq, req) => {
                        const url = new URL(req.url || '', 'http://localhost')
                        const token = url.searchParams.get('token') || 'default'
                        proxyReq.setHeader('x-stub-token', token)
                    })
                }
            }
        }
    }
});