export const config = {
  isClient: typeof window !== 'undefined',
  isServer: typeof window === 'undefined',
};
