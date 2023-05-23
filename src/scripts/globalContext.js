import { createContext } from "react";

const GlobalContext = createContext({ userAgent: {}, setUserAgent: () => {} });

export default GlobalContext;
