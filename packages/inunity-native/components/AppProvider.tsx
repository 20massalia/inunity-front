import { createContext } from "react";

export type AppInfraContextType = {
  cookieSynced: boolean;
  
}
export const AppContext = createContext<AppInfraContextType>({cookieSynced: false});