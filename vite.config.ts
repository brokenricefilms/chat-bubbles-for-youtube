import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: "https://ongedit.github.io/chat-bubbles-for-youtube",
    server: {
        port: 3000
    },
    plugins: [react()]
})
