export interface SocketCallbacks<T> {
  onData: (data: T) => void;
  onError?: () => void;
}

export class BaseSocket<T> {
  private socket: WebSocket | null = null;
  private isConnected = false;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(callbacks: SocketCallbacks<T>) {
    if (this.isConnected) return;

    this.socket = new WebSocket(this.url);
    this.isConnected = true;

    this.socket.onmessage = (event) => {
      try {
        const parsed: T = JSON.parse(event.data);
        callbacks.onData(parsed);
      } catch {
        callbacks.onError?.();
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
    };

    this.socket.onerror = () => {
      this.isConnected = false;
      callbacks.onError?.();
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }
}