jest.mock('@kununu/utils/dist', () => {
  let success = true;
  let output = {};
  let successCalls = [];

  let mockCallback = jest.fn(() => () => new Promise((resolve, reject) => {
    if (!success) {
      return reject(output);
    }
    return resolve(output);
  }));

  function setCustomOutput (resolved, out = {}) {
    success = resolved;
    output = out;
  }

  function setCustomCallback (callback) {
    if (typeof callback !== 'function') {
      throw new Error('The callback must be a function');
    }
    mockCallback = callback;
  }

  function getCustomCallback () {
    return mockCallback;
  }

  function setMultipleSuccessCalls (multipleRevolved) {
    successCalls = multipleRevolved;
  }

  function clearMultipleSuccessCalls () {
    successCalls = [];
  }

  function fetchApi (...args) {
    if (successCalls.length > 0) {
      setCustomOutput(successCalls[mockCallback.mock.calls.length], output);
    }
    return mockCallback(...args);
  }

  fetchApi.setCustomOutput = setCustomOutput;
  fetchApi.setCustomCallback = setCustomCallback;
  fetchApi.getCustomCallback = getCustomCallback;
  fetchApi.setMultipleSuccessCalls = setMultipleSuccessCalls;
  fetchApi.clearMultipleSuccessCalls = clearMultipleSuccessCalls;

  return {
    fetchApi,
    isClientRender: jest.fn(),
  };
});
