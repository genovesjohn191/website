declare module 'grapesjs' {
    export interface Editor {
      // Define the properties and methods used
      // Example:
      setComponents(components: any): void;
      // Add other methods and properties as needed
    }
  
    export function init(options: any): Editor;
  
    export default {
      init: (options: any) => Editor
    };
  }
  