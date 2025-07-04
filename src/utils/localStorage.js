// localStorage.js

// Load state from localStorage
export const loadState = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) return undefined; // No saved state
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Could not load state', err);
      return undefined;
    }
  };
  
  // Save state to localStorage
  export const saveState = (key, state) => {
    try {
      if (typeof state !== 'object') {
        console.error('State must be an object');
        return;
      }
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Could not save state', err);
    }
  };
  
  // Remove state from localStorage
  export const clearState = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('Could not clear state', err);
    }
  };
  