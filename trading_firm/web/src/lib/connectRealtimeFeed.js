function noop() {}

export function connectRealtimeFeed({
  wsUrl = "",
  sseUrl = "",
  wsRetryMs = 1800,
  sseRetryMs = 2400,
  openTimeoutMs = 2600,
  onMessage = noop,
  onActiveChange = noop,
  onOpen = noop,
}) {
  const supportsWs = typeof window.WebSocket === "function";
  const supportsSse = typeof window.EventSource === "function";
  if (!supportsWs && !supportsSse) {
    return noop;
  }

  let socket = null;
  let stream = null;
  let retryTimer = null;
  let stopped = false;

  const clearRetryTimer = () => {
    if (retryTimer) {
      window.clearTimeout(retryTimer);
      retryTimer = null;
    }
  };

  const closeSocket = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  const closeStream = () => {
    if (stream) {
      stream.close();
      stream = null;
    }
  };

  const stop = () => {
    stopped = true;
    clearRetryTimer();
    closeSocket();
    closeStream();
    onActiveChange(false);
  };

  const scheduleRetry = (delayMs, start) => {
    if (stopped || retryTimer) return;
    retryTimer = window.setTimeout(() => {
      retryTimer = null;
      if (!stopped) {
        start();
      }
    }, delayMs);
  };

  const startSse = (start) => {
    if (!supportsSse || stopped || !sseUrl) return;
    closeStream();
    stream = new EventSource(sseUrl);
    onActiveChange(true);
    onOpen("sse");

    stream.onmessage = (ev) => {
      onMessage(ev.data);
    };

    stream.onerror = () => {
      if (stream) {
        stream.close();
        stream = null;
      }
      onActiveChange(false);
      scheduleRetry(sseRetryMs, start);
    };
  };

  const start = () => {
    if (stopped) return;

    if (!supportsWs || !wsUrl) {
      startSse(start);
      return;
    }

    closeSocket();
    socket = new window.WebSocket(wsUrl);
    let opened = false;
    const openDeadline = window.setTimeout(() => {
      if (!opened && socket) {
        socket.close();
      }
    }, openTimeoutMs);

    socket.onopen = () => {
      opened = true;
      window.clearTimeout(openDeadline);
      onActiveChange(true);
      onOpen("ws");
    };

    socket.onmessage = (ev) => {
      onMessage(ev.data);
    };

    socket.onerror = () => {
      onActiveChange(false);
    };

    socket.onclose = () => {
      window.clearTimeout(openDeadline);
      if (socket) {
        socket = null;
      }
      onActiveChange(false);
      if (stopped) return;
      if (!opened && supportsSse) {
        startSse(start);
        return;
      }
      scheduleRetry(wsRetryMs, start);
    };
  };

  start();
  return stop;
}
