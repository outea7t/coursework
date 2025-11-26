import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {});

declare global {
  interface Window {
    electronAPI: {/* тут можно расширять апи */};
  }
}
