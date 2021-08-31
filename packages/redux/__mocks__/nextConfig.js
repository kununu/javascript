jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    server: {name: 'app-profiles'},
  },
}));
