import React ,{ useState ,useEffect ,useMemo} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Table from './Table.jsx'
import Select from 'react-select';
import axios from 'axios';
import Logo from '/assets/unilogo.png'
import LogoI from '/assets/unilogo2.jpg'
const faculteOptions = [
  { value: "Sciences exactes", label: "Sciences exactes" },
  { value: "Technologie", label: "Technologie" },
  { value: "Sciences de la nature et de la vie", label: "Sciences de la nature et de la vie" },
];

const specialiteOptions = [
  { value: "Informatique", label: "Informatique" },
  { value: "Chimie", label: "Chimie" },
  { value: "Physique et SM", label: "Physique et SM" },
  { value: "Recherche Opérationnelle", label: "Recherche Opérationnelle"},
  { value: "Mathématiques", label: "Mathématiques"},

];

const filiereOptions = [
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
];

const anneeOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
];
function Home() {
  const [plannings, setPlannings] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessagePlan, setErrorMessagPlan] = useState(null);
  const [errorFac, setErrorFac] = useState(null);
  const [errorDep, setErrorDep] = useState(null);
  const [filters, setFilters] = useState({
      faculte : '',
      departement : '',
      filiere : '',
      annee : '',
      semestre : '',
      type : '',
  });
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#374151',
      borderRadius: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#334155' : '#374151',
      color: state.isSelected ? '#e5e7eb' : '#f3f4f6',
      '&:hover': {
        backgroundColor: state.isSelected ? '#334155' : '#6b7280',
        color: state.isSelected ? '#e5e7eb' : '#e5e7eb',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb',  
    }),
  };

  const handleChangeFac = (selectedOption) => {
    setFilters({ ...filters, faculte: selectedOption.value });
    setErrorFac(null);
    if (selectedOption.value === "Technologie" || selectedOption.value === "Sciences de la nature et de la vie") {
      setErrorFac("Faculté non prise en charge pour le moment 🚧");
      return;
    }
  };
  const handleChangeDep = (selectedOption) => {
    setFilters({ ...filters, departement: selectedOption.value });
    setErrorDep(null);
    if (selectedOption.value === "Chimie" || selectedOption.value === "Physique et SM" || selectedOption.value === "Recherche Opérationnelle" || selectedOption.value === "Mathématiques") {
      setErrorDep("Département non pris en charge pour le moment 🚧");
      return;
    }
  };

  const handleChangeFil = (selectedOption) => {
    setFilters({ ...filters, filiere: selectedOption.value });
  };
  const handleChangeAn = (selectedOption) => {
    setFilters({ ...filters, annee: selectedOption.value });
  };
  const handleChangeSem = (selectedOption) => {
    setFilters({ ...filters, semestre: selectedOption.value });
  };
  const handleChangeTy = (selectedOption) => {
    setFilters({ ...filters, type: selectedOption.value });
  };

  const GetData = async () => {
    try {
        // Check if all filters are selected
        const emptyFilters = Object.values(filters).some((value) => value === "");

        if (emptyFilters) {
          setErrorMessage("Veuillez sélectionner tous les filtres avant de rechercher ✍🏽");
          return; 
        }
        setErrorMessage(null);
        const res = await axios.get('https://eplan-backend.onrender.com/plannings/filtre' ,{ params: filters });
        const data = res.data;
        setPlannings(data);
        // Check for empty results and set appropriate message
      if (data.length === 0) {
        setErrorMessagPlan("Aucun planning correspondant aux filtres sélectionnés ❌📅");
      } else {
        setErrorMessagPlan(null); 
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }  

  const exams = useMemo(() => {
    return plannings.map((planning) => planning.exams);
  })

  const faculte = useMemo(() => {
    return plannings.map((planning) => planning.faculte);
  })
  const departement = useMemo(() => {
    return plannings.map((planning) => planning.departement);
  })
  const filiere = useMemo(() => {
    return plannings.map((planning) => planning.filiere);
  })
  const annee = useMemo(() => {
    return plannings.map((planning) => planning.annee);
  })
  const semestre = useMemo(() => {
    return plannings.map((planning) => planning.semestre);
  })
  const session = useMemo(() => {
    return plannings.map((planning) => planning.type);
  })

 
  const handleGetSchedule = () => {
    GetData();
  };
  return (
    <div className="font-body text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex  flex-wrap justify-center items-center">
        {/* space to add the filtering combobox */}
        <div className="w-full md:w-1/3 p-10">
          <h1 className="text-xl text-center text-indigo-200 font-bold mb-4">Filtrer les plannigs d'examen</h1>
        <div className=' items-center shadow  justify-center '>
          <div className='my-4'>
            <label className='font-medium font-body text-gray-300'>Faculté :</label>
            <Select
                options={faculteOptions}
                onChange={handleChangeFac}
                className=" basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
                {errorFac && <p className="error-message text-red-700 text-center mt-2">{errorFac}</p>}
          </div>
          <div className='my-4'>
          <label className='font-medium font-body text-gray-300'>Département :</label>
            <Select
                options={specialiteOptions}
                onChange={handleChangeDep}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
                {errorDep && <p className="error-message text-red-700 text-center mt-2">{errorDep}</p>}
          </div>
          <div className='my-4'>
          <label className='font-medium font-body text-gray-300'>Filiére :</label>
            <Select
                options={filiereOptions}
                onChange={handleChangeFil}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
          </div>
          <div className='my-4'>
          <label className='font-medium font-body text-gray-300'>Année :</label>
            <Select
                options={anneeOptions}
                onChange={handleChangeAn}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
          </div>
          <div className='my-4'>
          <label className='font-medium font-body text-gray-300'>Semestre :</label>
            <Select
                options={[{ value: "1", label: "1" }, { value: "2", label: "2" }]}
                onChange={handleChangeSem}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
          </div>
          <div className='my-4'>
          <label className='font-medium font-body text-gray-300'>Session :</label>
            <Select
                options={[{ value: "Normal", label: "Normal" }, { value: "Rattrapage", label: "Rattrapage" },{ value: "Remplacement", label: "Remplacement" }]}
                onChange={handleChangeTy}
                className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
                styles={{
                  ...customStyles, // Merge custom styles
                  control: (base) => ({
                    ...base,
                    borderColor: 'gray',
                    color: 'white',
                    backgroundColor: '',
                  }),
                }}/>
          </div>
             <button
                className="w-full mt-2 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={handleGetSchedule}
              >
                Rechercher
              </button>
              {errorMessage && <p className="error-message text-red-700 text-center mt-2">{errorMessage}</p>}
          </div>
        </div>

        {/* space to add the table */}
        <div className="w-full md:w-2/3 p-4 flex flex-col items-center justify-center">
        {plannings.length > 0 ?(
                      <div className='flex justify-between items-center text-gray-300 font-semibold text-xl mb-4 px-8'>
                      <div>
                        <img src={Logo} className=' rounded-xl w-2/3' />
                      </div>
                      <div className='ml-20'>
                                      <h1>Faculté des {faculte}</h1>
                                      <h1>Département {departement}</h1>
                                      <h1>{filiere} {annee} (S{semestre})</h1>
                                      <h1>Session  {session}</h1>
                                      <h1>Année universitaire : 2023/2024</h1>
                                    </div>
                  </div>
          ) :(
            <div className='flex justify-center items-center mb-8 px-8'>
              <img src={LogoI} className=' rounded-xl w-2/4' />
            </div>
          )
          }
        {errorMessagePlan && <p className=" text-indigo-300 text-lg text-center mb-4">{errorMessagePlan}</p>}
          <Table exams={exams}      
                faculte={faculte}
                departement={departement}
                filiere={filiere}
                annee={annee}
                semestre={semestre}
                session={session} />
                          <div className="m-20">
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home