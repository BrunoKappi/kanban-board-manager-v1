export type SubRouteType = {
    tab: string;
    path: string;
    text: string;
  };
  
  export type RouteType = {
    tab: string;
    path: string;
    text: string;
    subRoutes: SubRouteType[];
  };
  
  export type PrimaryRoutesType = RouteType[];
  
  export type primaryRoutesIndexType = {
    sap: number;
    adm: number;
    movimentacao: number;
    cadastro: number;
  };