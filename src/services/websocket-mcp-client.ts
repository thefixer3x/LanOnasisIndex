/**
 * WebSocket MCP Client for Lanonasis
 * Provides WebSocket fallback for MCP connections
 */

export interface MCPMessage {
  id?: string;
  method?: string;
  type?: string;
  params?: any;
  result?: any;
  error?: any;
}

export interface ConnectionOptions {
  apiKey: string;
  endpoint?: string;
  reconnectAttempts?: number;
  reconnectDelay?: number;
}

export class WebSocketMCPClient {
  private ws: WebSocket | null = null;
  private apiKey: string;
  private endpoint: string;
  private reconnectAttempts: number;
  private reconnectDelay: number;
  private currentReconnectAttempt: number = 0;
  private messageQueue: MCPMessage[] = [];
  private messageHandlers: Map<string, (response: MCPMessage) => void> = new Map();
  private eventHandlers: {
    onOpen?: (event: Event) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
    onMessage?: (message: MCPMessage) => void;
  } = {};

  constructor(options: ConnectionOptions) {
    this.apiKey = options.apiKey;
    this.endpoint = options.endpoint || 'wss://mcp.lanonasis.com/ws';
    this.reconnectAttempts = options.reconnectAttempts || 3;
    this.reconnectDelay = options.reconnectDelay || 1000;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Add API key to WebSocket URL as query parameter
        const url = new URL(this.endpoint);
        url.searchParams.set('api_key', this.apiKey);
        
        this.ws = new WebSocket(url.toString());

        this.ws.onopen = (event) => {
          console.log('WebSocket MCP connection established');
          this.currentReconnectAttempt = 0;
          this.flushMessageQueue();
          this.eventHandlers.onOpen?.(event);
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: MCPMessage = JSON.parse(event.data);
            
            // Handle response to specific request
            if (message.id && this.messageHandlers.has(message.id)) {
              const handler = this.messageHandlers.get(message.id);
              handler?.(message);
              this.messageHandlers.delete(message.id);
            }
            
            // Handle general messages
            this.eventHandlers.onMessage?.(message);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onerror = (event) => {
          console.error('WebSocket error:', event);
          this.eventHandlers.onError?.(event);
          reject(new Error('WebSocket connection failed'));
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket closed:', event.code, event.reason);
          this.ws = null;
          this.eventHandlers.onClose?.(event);
          
          // Attempt reconnection if not a deliberate close
          if (event.code !== 1000 && this.currentReconnectAttempt < this.reconnectAttempts) {
            this.reconnect();
          }
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  private reconnect(): void {
    this.currentReconnectAttempt++;
    console.log(`Reconnection attempt ${this.currentReconnectAttempt}/${this.reconnectAttempts}`);
    
    setTimeout(() => {
      this.connect().catch((error) => {
        console.error('Reconnection failed:', error);
      });
    }, this.reconnectDelay * this.currentReconnectAttempt);
  }

  private flushMessageQueue(): void {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.send(message);
      }
    }
  }

  send(message: MCPMessage): Promise<MCPMessage> {
    return new Promise((resolve, reject) => {
      if (!message.id) {
        message.id = this.generateId();
      }

      // Store handler for response
      this.messageHandlers.set(message.id, (response) => {
        if (response.error) {
          reject(new Error(response.error.message || 'Unknown error'));
        } else {
          resolve(response);
        }
      });

      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message));
      } else {
        // Queue message if not connected
        this.messageQueue.push(message);
        if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
          this.connect().catch(reject);
        }
      }

      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.messageHandlers.has(message.id!)) {
          this.messageHandlers.delete(message.id!);
          reject(new Error('Request timeout'));
        }
      }, 30000);
    });
  }

  async initialize(): Promise<MCPMessage> {
    return this.send({
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {}
      }
    });
  }

  async listTools(): Promise<MCPMessage> {
    return this.send({
      method: 'tools/list'
    });
  }

  async callTool(name: string, args: any): Promise<MCPMessage> {
    return this.send({
      method: 'tools/call',
      params: {
        name,
        arguments: args
      }
    });
  }

  async createMemory(title: string, content: string, type: string, tags?: string[]): Promise<MCPMessage> {
    return this.callTool('create_memory', {
      title,
      content,
      type,
      tags: tags || []
    });
  }

  async searchMemories(query: string, options?: {
    type?: string;
    limit?: number;
    threshold?: number;
  }): Promise<MCPMessage> {
    return this.callTool('search_memories', {
      query,
      ...options
    });
  }

  ping(): Promise<MCPMessage> {
    return this.send({
      type: 'ping'
    });
  }

  close(): void {
    if (this.ws) {
      this.ws.close(1000, 'Client closing connection');
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  on(event: 'open' | 'close' | 'error' | 'message', handler: Function): void {
    switch (event) {
      case 'open':
        this.eventHandlers.onOpen = handler as (event: Event) => void;
        break;
      case 'close':
        this.eventHandlers.onClose = handler as (event: CloseEvent) => void;
        break;
      case 'error':
        this.eventHandlers.onError = handler as (event: Event) => void;
        break;
      case 'message':
        this.eventHandlers.onMessage = handler as (message: MCPMessage) => void;
        break;
    }
  }

  private generateId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}