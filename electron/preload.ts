import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // пока ничего не пробрасываем — вся математика в renderer
});

declare global {
  interface Window {
    electronAPI: {
      // тут можно расширять API при необходимости
    };
  }
}
