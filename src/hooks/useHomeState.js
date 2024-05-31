import { useState } from "react";

export default function useHomeState() {
  const [plannings, setPlannings] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessagePlan] = useState(null);
  const [errorFac, setErrorFac] = useState(null);
  const [errorDep] = useState(null);
  const [filters, setFilters] = useState({
    faculte: "",
    departement: "",
    filiere: "",
    annee: "",
    semestre: "",
    type: "",
  });

  return {
    plannings,
    setPlannings,
    errorMessage,
    setErrorMessage,
    errorMessagePlan,
    errorFac,
    setErrorFac,
    errorDep,
    filters,
    setFilters,
  };
}
