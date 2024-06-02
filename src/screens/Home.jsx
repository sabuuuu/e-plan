import { useMemo, useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Table from "./Table.jsx";
import Logo from "/assets/unilogo.png";
import LogoI from "/assets/unilogo2.jpg";
import { getThemeClass, checkFilters, fetchData } from "../utils/helpers.js";
import {
  anneeOptions,
  nonSupportedFaculites,
  fac,
  sessionType,
} from "./../constants/options.js";

import { ThemeContext } from "./ThemeContext";
import useHomeState from "../hooks/useHomeState.js";
import FilterBox from "../components/FilterBox.jsx";
import Button from "../components/Button.jsx";
import ErrorComponent from "../components/ErrorComponent.jsx";

function Home() {
  const { theme } = useContext(ThemeContext);
  const [isFetching, setIsFetching] = useState(false);
  const {
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
  } = useHomeState();
  const getDepartements = (faculte) => {
    const selectedFaculte = fac.find((f) => f.value === faculte);
    return selectedFaculte?.departements || [];
  };

  const getFilieres = (departement, departements) => {
    const selectedDepartement = departements.find(
      (d) => d.value === departement
    );
    return selectedDepartement?.filieres || [];
  };

  const getBackgroundColor = (state) => {
    if (state.isSelected) {
      return theme === "light" ? "#D1CECE" : "#334155";
    }
    return theme === "light" ? "#FFFFFF" : "#374151";
  };

  const getColor = (state) => {
    if (state.isSelected) {
      return theme === "light" ? "black" : "#e5e7eb";
    }
    return theme !== "light" && "#f3f4f6";
  };

  const getHoverStyles = (state) => {
    const backgroundColor = state.isSelected
      ? theme === "light"
        ? "#e5e7eb"
        : "#374151"
      : theme === "light"
      ? "#e5e7eb"
      : "#6b7280";
    const color = state.isSelected
      ? theme === "light"
        ? "#374151"
        : "#e5e7eb"
      : theme === "light"
      ? "#374151"
      : "#e5e7eb";
    return { backgroundColor, color };
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#374151" : "white",
      borderRadius: "4px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: getBackgroundColor(state),
      color: getColor(state),
      "&:hover": getHoverStyles(state),
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e5e7eb" : "#000000",
    }),
  };
  const handleChange =
    (field, errorMessage = "Non prise en charge pour le moment 🚧") =>
    (selectedOption) => {
      setFilters({ ...filters, [field]: selectedOption.value });

      if (field === "faculte") {
        const isNonSupportedFaculte = nonSupportedFaculites.includes(
          selectedOption.value
        );
        setErrorFac(isNonSupportedFaculte ? errorMessage : null);
      }
    };

  const departements = useMemo(
    () => getDepartements(filters.faculte),
    [filters.faculte]
  );

  const filieres = useMemo(
    () => getFilieres(filters.departement, departements),
    [filters.departement, departements]
  );

  const filterBoxData = [
    {
      handleChangeFn: handleChange("faculte"),
      options: fac.map((f) => ({ value: f.value, label: f.label })),
      label: "Faculté",
      disabled: false,
      error: errorFac,
    },
    {
      handleChangeFn: handleChange("departement"),
      options: departements,
      label: "Département",
      disabled: nonSupportedFaculites.includes(filters.faculte),
      error: errorDep,
    },
    {
      handleChangeFn: handleChange("filiere"),
      options: filieres,
      label: "Filière",
      disabled: nonSupportedFaculites.includes(filters.faculte),
      error: null,
    },
    {
      handleChangeFn: handleChange("annee"),
      options: anneeOptions,
      label: "Année",
      disabled:
        nonSupportedFaculites.includes(filters.faculte) || !filieres.length,
      error: null,
    },
    {
      handleChangeFn: handleChange("semestre"),
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
      label: "Semestre",
      disabled:
        nonSupportedFaculites.includes(filters.faculte) || !filieres.length,
      error: null,
    },
    {
      handleChangeFn: handleChange("type"),
      options: sessionType,
      label: "Session",
      disabled:
        nonSupportedFaculites.includes(filters.faculte) || !filieres.length,
      error: null,
    },
  ];

  const getData = async () => {
    setIsFetching(true);
    try {
      checkFilters(filters);
      const data = await fetchData(filters);
      setPlannings(data);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const { exams, faculte, departement, filiere, annee, semestre, session } =
    useMemo(() => {
      const exams = [];
      const faculties = [];
      const departments = [];
      const filieres = [];
      const annees = [];
      const semestres = [];
      const sessions = [];

      plannings.forEach((planning) => {
        exams.push(planning.exams);
        faculties.push(planning.faculte);
        departments.push(planning.departement);
        filieres.push(planning.filiere);
        annees.push(planning.annee);
        semestres.push(planning.semestre);
        sessions.push(planning.type);
      });
      return {
        exams,
        faculte: faculties,
        departement: departments,
        filiere: filieres,
        annee: annees,
        semestre: semestres,
        session: sessions,
      };
    }, [plannings]);
  return (
    <div
      className={`font-body flex flex-col min-h-screen ${getThemeClass(
        "bg-gray-900 text-white",
        "bg-gray-200 text-black",
        theme
      )}`}
    >
      <Navbar />
      <div className="flex flex-wrap justify-center items-center">
        {/* space to add the filtering combobox */}
        <div className="w-full md:w-1/3 p-10">
          <h1
            className={`text-xl text-center  font-bold mb-4 ${getThemeClass(
              "text-indigo-200",
              "text-indigo-800",
              theme
            )}`}
          >
            Filtrer les plannigs d&apos;examen
          </h1>
          <div
            className="items-center justify-center"
            role="form"
            aria-label="Formulaire de filtrage des plannings d'examen"
            aria-labelledby="Filtrer les plannigs d'examen"
          >
            {filterBoxData.map((filterBox, index) => (
              <FilterBox
                key={index}
                handleChangefn={filterBox.handleChangeFn}
                options={filterBox.options}
                label={filterBox.label}
                theme={theme}
                disabled={filterBox.disabled}
                error={filterBox.error}
                customStyles={customStyles}
                aria-required="true"
              />
            ))}

            <Button
              disabled={isFetching}
              onClick={getData}
              aria-label="Récupérer les plannings d'examen"
            />
            <ErrorComponent
              errorMessage={errorMessage}
              aria-live="polite"
              aria-atomic="true"
              role="alert"
            />
          </div>
        </div>

        {/* space to add the table */}
        <div className="w-full md:w-2/3 p-4 flex flex-col items-center justify-center">
          {plannings.length > 0 ? (
            <div
              className={`flex justify-between items-center font-semibold text-xl mb-4 px-8 ${getThemeClass(
                "text-gray-300",
                "text-gray-700",
                theme
              )}`}
            >
              <div>
                <img src={Logo} className="rounded-xl w-2/3" />
              </div>
              <div className="ml-20">
                <h1>Faculté des {faculte}</h1>
                <h1>Département {departement}</h1>
                <h1>
                  {filiere} {annee} (S{semestre})
                </h1>
                <h1>Session {session}</h1>
                <h1>Année universitaire : 2023/2024</h1>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mb-8 px-8">
              <img src={LogoI} className=" rounded-xl w-2/4" />
            </div>
          )}
          <ErrorComponent errorMessage={errorMessagePlan} />

          <Table
            exams={exams}
            faculte={faculte}
            departement={departement}
            filiere={filiere}
            annee={annee}
            semestre={semestre}
            session={session}
            role="region"
            aria-label="Tableau des plannings d'examen"
          />
          <div className="m-20"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
