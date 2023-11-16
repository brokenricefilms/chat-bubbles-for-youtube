import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
    base: "https://ongedit.github.io/chat-bubbles-for-youtube",
    server: {
        port: 3000
    },
    plugins: [
        react(),
        compression()
    ]
})
