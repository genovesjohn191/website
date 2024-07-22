export interface SubTab {
    name: string;
    link: string;
    icon: string;
    active: boolean;
  }
  
  export interface Tab {
    name: string;
    icon: string;
    subtabs: SubTab[];
    expanded: boolean;
  }