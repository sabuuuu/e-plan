import { useState, useMemo } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "/assets/unilogo.png";

import PropTypes from "prop-types";

const Table = ({
  exams,
  faculte,
  departement,
  filiere,
  annee,
  semestre,
  session,
}) => {
  const thCommonClasses =
    "px-6 py-5 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black";

  const thInfoCommonClasses =
    "px-6 py-5 bg-blue-900 text-center leading-4 font-bold text-gray-200 uppercase tracking-wider border-r border-opacity-40 border-black";

  const [loading, setLoader] = useState(false);

  const handleDownload = async () => {
    const capture = document.querySelector(".planning");
    setLoader(true);
    const doc = new jsPDF("p", "mm", "a4");
    const margins = 10; // Adjust margins as needed
    const maxWidth = doc.internal.pageSize.getWidth() - margins * 2;
    const maxHeight = doc.internal.pageSize.getHeight() - margins * 2;

    const canvas = await html2canvas(capture);

    const imgData = canvas.toDataURL("image/png");

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    doc.addImage(imgData, "PNG", margins, margins, scaledWidth, scaledHeight);
    doc.save("planning.pdf");
    setLoader(false);
  };
  const extractProperty = (array, property) => {
    return Array.from(new Set(array.flat().map((item) => item[property])));
  };
  const examsName = useMemo(() => extractProperty(exams, "name"), [exams]);
  const examsDate = useMemo(() => extractProperty(exams, "date"), [exams]);
  const examsHeure = useMemo(() => extractProperty(exams, "time"), [exams]);
  const salles = useMemo(() => extractProperty(exams, "salle"), [exams]);
  const profs = useMemo(() => extractProperty(exams, "profs"), [exams]);
  return (
    <div className="w-full overflow-x-auto rounded-lg">
      <div className="align-middle inline-block min-w-full">
        <table className="min-w-full ">
          <thead>
            <tr>
              <th className={thCommonClasses}>Module</th>
              <th className={thCommonClasses}>Date</th>
              <th className={thCommonClasses}>Horraire</th>
              <th className={thCommonClasses}>Lieu</th>
              <th className={`${thCommonClasses} border-black tracking-wider`}>
                Surveillants
              </th>
            </tr>
          </thead>
          <tbody className="bg-indigo-900 divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap ">
                <ul className="list-inside text-white">
                  {examsName.map((name, i) => (
                    <li
                      key={i}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 text-sm hover:text-gray-400 "
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <ul className="list-inside text-white">
                  {examsDate.map((date) => (
                    <li
                      key={date}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 text-sm hover:text-gray-400 "
                    >
                      {date}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <ul className="list-inside text-white">
                  {examsHeure.map((time, i) => (
                    <li
                      key={i}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 text-sm hover:text-gray-400 "
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <ul className="list-inside text-white">
                  {salles.map((salle, i) => (
                    <li
                      key={i}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 text-sm hover:text-gray-400 "
                    >
                      {salle.type} {salle.num} {salle.batiment}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <ul className="list-inside text-white">
                  {profs.map((professors, index) => (
                    <li
                      key={`professor-group-${index}`}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 text-sm hover:text-gray-400"
                    >
                      {professors && professors.length > 0 ? (
                        <div>
                          {professors.map((professor, idx) =>
                            professor && professor.name ? (
                              <div
                                className="inline"
                                key={`professor-${professor._id}-${index}-${idx}`}
                              >
                                {" "}
                                {professor.name}
                              </div>
                            ) : null
                          )}
                        </div>
                      ) : (
                        <div key={`no-professors-${index}`}>
                          Aucun enseignant
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* */}
      <div className="planning w-full bg-white p-6 absolute -top-2/3 -left-full">
        <div className="flex justify-between items-center text-black font-semibold text-xl mb-36 px-8">
          <div>
            <img src={Logo} className=" rounded-md w-2/3" />
          </div>
          <div className="">
            <h1>Université Abderrahmane Mira de Bejaia</h1>
            <h1>Faculté des {faculte}</h1>
            <h1>Département {departement}</h1>
            <h1>
              {filiere} {annee}(S{semestre})
            </h1>
            <h1>Session {session}</h1>
            <h1>Année universitaire : 2023/2024</h1>
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg mb-6">
          <div className="align-middle inline-block min-w-full ">
            <table className="min-w-full ">
              <thead>
                <tr>
                  <th className={thInfoCommonClasses}>Module</th>
                  <th className={thInfoCommonClasses}>Date</th>
                  <th className={thInfoCommonClasses}>Horraire</th>
                  <th className={thInfoCommonClasses}>Lieu</th>
                  <th
                    className={`${thInfoCommonClasses} border-black tracking-wider`}
                  >
                    Surveillants
                  </th>
                </tr>
              </thead>
              <tbody className="bg-blue-100 divide-y divide-blue-800 text-gray-900 text-lg">
                <tr>
                  <td className="px-6 py-4  whitespace-no-wrap ">
                    <ul className="list-inside">
                      {examsName.map((name) => (
                        <li
                          key={name}
                          className="border-b p-4 hover:text-gray-400 "
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap">
                    <ul className=" list-inside">
                      {examsDate.map((date) => (
                        <li
                          key={date}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 py-4 hover:text-gray-400 "
                        >
                          {date}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <ul className="">
                      {examsHeure.map((time) => (
                        <li
                          key={time}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 "
                        >
                          {time}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <ul className="">
                      {salles.map((salle) => (
                        <li
                          key={salle}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 "
                        >
                          {salle.type} {salle.num} {salle.batiment}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <ul className="">
                      {profs.map((professors, index) => (
                        <li
                          key={`professor-group-${index}`}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400"
                        >
                          {professors && professors.length > 0 ? (
                            <div>
                              {professors.map((professor, idx) =>
                                professor && professor.name ? (
                                  <div
                                    className="inline"
                                    key={`professor-${professor._id}-${index}-${idx}`}
                                  >
                                    {" "}
                                    {professor.name}
                                  </div>
                                ) : null
                              )}
                            </div>
                          ) : (
                            <div key={`no-professors-${index}`}>
                              Aucun enseignant
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* */}
      <div className="flex justify-center mt-4">
        {exams.length > 0 && (
          <button
            disabled={loading}
            onClick={handleDownload}
            className={`bg-indigo-900 hover:bg-indigo-700 text-white py-3 px-4 rounded-md w-full lg:w-1/4 md:w-1/3 ${
              loading && "opacity-50 cursor-wait"
            }`}
          >
            {loading ? (
              <span>En cours de téléchargement...</span>
            ) : (
              <span>Télécharger</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
Table.propTypes = {
  exams: PropTypes.array.isRequired,
  faculte: PropTypes.array.isRequired,
  departement: PropTypes.array.isRequired,
  filiere: PropTypes.array.isRequired,
  annee: PropTypes.array.isRequired,
  semestre: PropTypes.array.isRequired,
  session: PropTypes.array.isRequired,
};
