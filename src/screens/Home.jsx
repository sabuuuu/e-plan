import React ,{ useState ,useEffect ,useMemo} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AxiosInstance from './Axios.jsx'
import Combobox from './Combo.jsx'
import Table from './Table.jsx'

const faculteOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

const specialiteOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

const filiereOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

const anneeOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
];

function Home() {
  const [plannings, setPlannings] = useState([]);
  const [filters, setFilters] = useState({
      faculte : '',
      specialite : '',
      filiere : '',
      annee : '',
      semestre : '',
      type : '',
      session : '',
  });
  
  const GetData = async () => {
    try {
      const response = await AxiosInstance.get(`planning/`, { params: filters });
      setPlannings(response.data);
      console.log('Data:', response.data);
    } catch (error) {
      console.log('Fetch error:', error);
    } 
  }  

  const salles = plannings.map((planning) => planning.exams.map((exam) => exam.salle));
  const exams = useMemo(() => {
    return plannings.map((planning) => planning.exams);
  })
  const handleGetSchedule = () => {
    GetData();
  };

  return (
    <div className="font-body text-white flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      <div className="flex  flex-wrap justify-center items-center">
        {/* space to add the filtering combobox */}
        <div className="w-full md:w-1/2 p-4">
          <div className="flex flex-col items-center justify-center">
          <Combobox
              options={faculteOptions} // Assuming you have an array of faculty options
              selectedValue={filters.faculte}
              onChange={(value) => setFilters({ ...filters, faculte: value })}
            />

            <Combobox
              options={specialiteOptions} // Assuming you have an array of specialty options
              selectedValue={filters.specialite}
              onChange={(value) => setFilters({ ...filters, specialite: value })}
            />

            <Combobox
              options={filiereOptions} // Assuming you have an array of major options
              selectedValue={filters.filiere}
              onChange={(value) => setFilters({ ...filters, filiere: value })}
            />
            <Combobox
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
              ]}
              selectedValue={filters.filter1} // Pass current filter value
              onChange={(value) => setFilters({ ...filters, filter1: value })} // Update filter state
            />
             <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGetSchedule}
              >
                Rechercher
              </button>
          </div>
        </div>

        {/* space to add the table */}
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <Table exams={exams} salles={salles}/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home