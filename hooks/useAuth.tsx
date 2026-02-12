import { useContext } from "react";

import { AuthContext, AuthContextDataProps } from "../contexts/authContext";

export default function useAuth(): AuthContextDataProps {
  const context = useContext(AuthContext);

  return context;
}
