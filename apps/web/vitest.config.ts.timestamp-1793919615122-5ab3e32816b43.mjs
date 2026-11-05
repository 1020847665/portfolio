// vitest.config.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///F:/Claw/portfolio/node_modules/.pnpm/vitest@2.1.9_jsdom@25.0.1/node_modules/vitest/dist/config.js";
import react from "file:///F:/Claw/portfolio/node_modules/.pnpm/@vitejs+plugin-react@4.7.0_vite@6.4.5/node_modules/@vitejs/plugin-react/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///F:/Claw/portfolio/apps/web/vitest.config.ts";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var pkg = (name) => path.resolve(__dirname, `../../packages/${name}/src`);
var vitest_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@portfolio/shared": pkg("shared"),
      "@portfolio/ui": pkg("ui"),
      "@portfolio/scenes": pkg("scenes")
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: path.resolve(__dirname, "src/test/setup.ts")
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXENsYXdcXFxccG9ydGZvbGlvXFxcXGFwcHNcXFxcd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxDbGF3XFxcXHBvcnRmb2xpb1xcXFxhcHBzXFxcXHdlYlxcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9DbGF3L3BvcnRmb2xpby9hcHBzL3dlYi92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpO1xuY29uc3QgcGtnID0gKG5hbWUpID0+IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGAuLi8uLi9wYWNrYWdlcy8ke25hbWV9L3NyY2ApO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0Bwb3J0Zm9saW8vc2hhcmVkJzogcGtnKCdzaGFyZWQnKSxcbiAgICAgICdAcG9ydGZvbGlvL3VpJzogcGtnKCd1aScpLFxuICAgICAgJ0Bwb3J0Zm9saW8vc2NlbmVzJzogcGtnKCdzY2VuZXMnKSxcbiAgICB9LFxuICB9LFxuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBzZXR1cEZpbGVzOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3Rlc3Qvc2V0dXAudHMnKSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4USxPQUFPLFVBQVU7QUFDL1IsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBSHFKLElBQU0sMkNBQTJDO0FBS3hOLElBQU0sWUFBWSxLQUFLLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBQzdELElBQU0sTUFBTSxDQUFDLFNBQVMsS0FBSyxRQUFRLFdBQVcsa0JBQWtCLElBQUksTUFBTTtBQUUxRSxJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wscUJBQXFCLElBQUksUUFBUTtBQUFBLE1BQ2pDLGlCQUFpQixJQUFJLElBQUk7QUFBQSxNQUN6QixxQkFBcUIsSUFBSSxRQUFRO0FBQUEsSUFDbkM7QUFBQSxFQUNGO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxZQUFZLEtBQUssUUFBUSxXQUFXLG1CQUFtQjtBQUFBLEVBQ3pEO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
