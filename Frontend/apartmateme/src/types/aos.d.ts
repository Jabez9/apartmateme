declare module "aos" {
  interface AOSOptions {
    duration?: number;
    once?: boolean;
    // add more options here if needed
    [key: string]: unknown;
  }

  const AOS: {
    init: (options?: AOSOptions) => void;
    refresh: () => void;
  };
  export default AOS;
}
