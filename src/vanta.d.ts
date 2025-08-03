declare module 'vanta/dist/vanta.net.min' {
  interface VantaEffect {
    destroy: () => void;
  }

  interface VantaOptions {
    el: HTMLElement;
    THREE: typeof import('three');
    color: number;
    backgroundColor: number;
    points: number;
    maxDistance: number;
    spacing: number;
  }

  const NET: {
    default: (options: VantaOptions) => VantaEffect;
  };

  export = NET;
}
