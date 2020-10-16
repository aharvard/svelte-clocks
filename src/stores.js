import { readable } from "svelte/store";

export const time = readable(
  {
    s: new Date().getSeconds(),
    m: new Date().getMinutes(),
    h: new Date().getHours(),
    now: Math.round(Date.now() / 1000),
  },
  function start(set) {
    const interval = setInterval(() => {
      set({
        s: new Date().getSeconds(),
        m: new Date().getMinutes(),
        h: new Date().getHours(),
        now: Math.round(Date.now() / 1000),
      });
    }, 1000);

    return function stop() {
      clearInterval(interval);
    };
  }
);
