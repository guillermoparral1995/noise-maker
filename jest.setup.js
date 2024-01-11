/* eslint-env node */

/**
 * This is a hacky workaround to avoid getting console errors for PrimeReact CSS imports
 * https://stackoverflow.com/a/75757070
 */
module.exports = () => {
  const originalConsoleError = console.error;
  console.error = function (...data) {
    if (
      typeof data[0]?.toString === 'function' &&
      data[0].toString().includes('Error: Could not parse CSS stylesheet')
    )
      return;
    originalConsoleError(...data);
  };
};
