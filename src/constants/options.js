export const fac = [
  {
    value: "Sciences exactes",
    label: "Sciences exactes",
    departements: [
      {
        value: "Informatique",
        label: "Informatique",
        filieres: [
          { value: "Ingéniorat", label: "Ingéniorat" },
          { value: "Informatique", label: "Informatique" },
          { value: "Informatique LMD", label: "Informatique RN" },
          { value: "Informatique MI", label: "Informatique MI" },
          { value: "Informatique RN-SI", label: "Informatique RN-SI" },
          { value: "Informatique RN-RS", label: "Informatique RN-RS" },
          { value: "ASR", label: "ASR" },
          { value: "GL", label: "GL" },
          { value: "IA", label: "IA" },
          { value: "RS", label: "RS" },
          { value: "SIA", label: "SIA" },
        ],
      },
      {
        value: "SM",
        label: "Sciences de la matière",
        filieres: [
          { value: "Chimie", label: "Chimie" },
          { value: "Physique et SM", label: "Physique et SM" },
        ],
      },
      {
        value: "Recherche Opérationnelle",
        label: "Recherche Opérationnelle",
        filieres: [{ value: "RO", label: "RO" }],
      },
      {
        value: "Mathématiques",
        label: "Mathématiques",
        filieres: [{ value: "Mathématiques", label: "Mathématiques" }],
      },
    ],
  },
  {
    value: "Technologie",
    label: "Technologie",
    departements: [
      {
        value: "genie electrique",
        label: "Génie Electrique",
      },
      {
        value: "genie mecanique",
        label: "Génie Mécanique",
      },
      {
        value: "genie civil",
        label: "Génie Civil",
      },
      {
        value: "genie informatique",
        label: "Génie Informatique",
      },
      {
        value: "genie des procedes",
        label: "Génie des Procédés",
      },
      {
        value: "genie des materiaux",
        label: "Génie des Matériaux",
      },
      {
        value: "genie industriel",
        label: "Génie Industriel",
      },
    ],
  },
  {
    value: "Sciences de la nature et de la vie",
    label: "Sciences de la nature et de la vie",
  },
];

export const anneeOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
];
export const sessionType = [
  { value: "Normal", label: "Normal" },
  { value: "Rattrapage", label: "Rattrapage" },
  { value: "Remplacement", label: "Remplacement" },
];
export const nonSupportedFaculites = [
  "Sciences de la nature et de la vie",
  "Technologie",
];
