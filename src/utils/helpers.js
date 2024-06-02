import axios from "axios";

export const getSelectStyles = (theme, customStyles) => ({
  ...customStyles, // Merge custom styles
  control: (base) => ({
    ...base,
    borderColor: "gray",
    color: "white",
    backgroundColor: theme !== "dark" && "#f3f4f6",
  }),
});

export const getThemeClass = (darkClass, lightClass, theme) => {
  return theme === "dark" ? darkClass : lightClass;
};

export const checkFilters = (filters) => {
  const emptyFilters = Object.values(filters).some((value) => value === "");

  if (emptyFilters) {
    throw new Error(
      "Veuillez sélectionner tout les filtres avant de rechercher ✍🏽"
    );
  }
};

export const fetchData = async (
  filters,
  url = "https://eplan-backend.onrender.com/plannings/filtre"
) => {
  const res = await axios.get(url, { params: filters });
  const data = res.data;
  if (data.length === 0) {
    throw new Error(
      "Aucun planning correspondant aux filtres sélectionnés ❌📅"
    );
  }

  return data;
};
