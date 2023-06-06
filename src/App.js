import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employeeData, setEmployeeData] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev');
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  return (
    <div>
      
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
      <div>
      <p>&nbsp;</p>
      <button onClick={fetchEmployees}>Fetch Employees</button>
      </div>
    </div>
  );
}

export default App;
