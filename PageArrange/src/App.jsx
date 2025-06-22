import React from "react"
import { useState ,useEffect} from "react"
import './App.css'; // Assuming you have some styles in App.css

function App(){
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);
  const rowsPerPage = 10;

  useEffect(function (){
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then(function(response){
      if(!response.ok){
        throw new Error('Network response was not ok.');
      }
      return response.json();
    }).then(function (data){
      setEmployees(data);
    }).catch(function (){
      alert('failed to fetch data');
      setError(true);
    });
  },[]);

  function getCurrentEmployees(){
    var startIndex = (currentPage - 1)*rowsPerPage;
    return employees.slice(startIndex, startIndex + rowsPerPage);
  }

  function handleNext(){
    var totalPages = Math.ceil(employees.length/rowsPerPage);
    if(currentPage< totalPages){
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevious(){
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  function renderTableRows(){
    var currentEmployees = getCurrentEmployees();
    return currentEmployees.map(function (emp){
      return(
        <tr key={emp.id}>
          <td>{emp.id}</td>
          <td>{emp.name}</td>
          <td>{emp.email}</td>
          <td>{emp.role}</td>
         
        </tr>
      );
    });
  }
  if(error) return null;

  var totalPages  = Math.ceil(employees.length/rowsPerPage);



  return(
    <>
    <div style = {{padding: '20px'}} className="main-container">
      <h1>Employees Data Table</h1>
      <table border = "1" cellPadding="10" cellSpacing="0" width = "10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Eamil</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>

      </table>
<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
      </div>

    </div>
    </>
  )

}
export default App;