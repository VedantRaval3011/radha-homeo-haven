// This utility function will parse badge strings that might be over-serialized
export const parseBadges = (badgeData) => {
    if (!badgeData) return [];
    
    // If already an array of simple strings, return as is
    if (Array.isArray(badgeData) && 
        badgeData.every(item => typeof item === 'string' && !item.startsWith('['))) {
      return badgeData;
    }
    
    try {
      // Deep unwrap function to handle extreme nesting
      const deepUnwrap = (data) => {
        if (!data) return [];
        
        // If it's a simple string without JSON markers, return as single item
        if (typeof data === 'string' && !data.includes('[') && !data.includes('{')) {
          return [data];
        }
        
        // Process single strings
        if (typeof data === 'string') {
          try {
            // Try to parse the string
            const parsed = JSON.parse(data);
            return deepUnwrap(parsed);
          } catch (e) {
            // If can't parse, return as is
            return [data];
          }
        }
        
        // Process arrays
        if (Array.isArray(data)) {
          // Flatten nested arrays and process each item
          const results = [];
          for (const item of data) {
            const unwrapped = deepUnwrap(item);
            results.push(...unwrapped);
          }
          return results;
        }
        
        // Handle objects or other types
        return [String(data)];
      };
      
      // Start the unwrapping process
      const result = deepUnwrap(badgeData);
      
      // Ensure all results are strings and filter out empty strings
      return result
        .map(String)
        .filter(item => item.trim() !== '')
        .map(item => item.trim());
    } catch (e) {
      console.error("Error parsing badges:", e);
      return [];
    }
  };