import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [employeeData, setEmployeeData] = useState([]);

  const [employees, setEmployees] = useState([]);//addEmp

  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        
        const response = await axios.post('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev', {
          empId:empId,
          emp_Name: empName,
          designation:designation,
          salary: salary,
        });

    addEmployee({ empId, empName, designation, salary });
    setEmpId('');
    setEmpName('');
    setDesignation('');
    setSalary('');

    try {
      const response = await axios.get('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev');
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    
  }catch (error) {
    console.error(error);
  }
 } ;

  const addEmployee = (employee) => {     //addEmp
    setEmployees([...employees, employee]);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev');
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div className="App">
      <div >
          <h1>Employee Management App</h1>
          
          <form onSubmit={handleSubmit}>
      <label>
        Employee ID:
        <input
          type="text"
          value={empId}
          onChange={(e) => setEmpId(e.target.value)}
        />
      </label>
      <label>
        Employee Name:
        <input
          type="text"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        />
      </label>
      <label>
        Designation:
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </label>
      <label>
        Salary:
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </label>
      <button type="submit">Add Employee</button>
    </form>

          <p>&nbsp;</p>
      </div>
      <div className="container">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee) => (
                  <tr key={employee.empid}>
                    <td>{employee.empId}</td>
                    <td>{employee.emp_Name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>&nbsp;</p>
            <button className="buttonPos" onClick={fetchEmployees}>Fetch Employees</button>
        </div>
    </div>
  );
}

export default App;
