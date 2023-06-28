import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './employee.css'


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
        
         await axios.post('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev', {
          empId:empId,
          emp_Name: empName,
          designation:designation,
          salary: salary
        });

    addEmployee({ empId, empName, designation, salary });
    setEmpId('');
    setEmpName('');
    setDesignation('');
    setSalary('');

  }catch (error) {
    console.error(error);
  }
  fetchEmployees();

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

  const removeData = async (Id) => {

    console.log('epid which is going to be deleted=' + Id);
    try {
    await axios.delete('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev/', 
    {
      data: {
        empId: Id
      }
    });
    
  } catch (error) {
    console.error('Error in deleting employees:', error);
  }
      fetchEmployees();

}

const updateData = (empid) => {
  //  let url = `https://jsonplaceholder.typicode.com/users/${id}`
  console.log('id', empid)
  //  axios.delete(url).then(res => {
  //      const del = employees.filter(employee => id !== employee.id)
  //      setEmployees(del)
  //      console.log('res', res)
  //  })
}

  return (
    <div className="App">
          <div className="topHeader">
              <h1>Employee Management App</h1>
          </div>
          <div className="grid-container">
            <div className="grid-child purple">
                    <form className="employee-form" onSubmit={handleSubmit}>
                      
                      <div className="form-group">
                        <label htmlFor="name">Employee Id:</label>
                          
                            <input
                              type="text"
                              value={empId}
                              onChange={(e) => setEmpId(e.target.value)}
                            />
                      </div>
                      
                      <div className="form-group">
                      <label htmlFor="name">Employee Name:</label>
                        <input
                          type="text"
                          value={empName}
                          onChange={(e) => setEmpName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="name">Designation:</label>
                        
                        <input
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                      <label htmlFor="name">Salary:</label>
                        <input
                          type="text"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                        />
                      </div>
                        <div className="ButtonPositionDiv" >
                          <button className="addEmpButton" type="submit">Add Employee</button>
                        </div>
                </form>

                <p>&nbsp;</p>
                </div>
                <div className="grid-child green">
                  <div className="employee-list">
                        <table className='tableClass'>
                          <thead >
                            <tr>
                              <th> EID </th>
                              <th>Name</th>
                              <th>Designation</th>
                              <th>Salary</th>
                              <th>Remove</th>
                              <th>Update</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employeeData.map((employee) => (
                              <tr key={employee.empid}>
                                <td>{employee.empId}</td>
                                <td>{employee.emp_Name}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.salary}</td>
                                <td className="operation">
                                    <button className="deleteButton" onClick={() => removeData(employee.empId)}>
                                      Delete
                                    </button>
                                </td>
                                <td className="operation">
                                    <button className="updateButton" onClick={() => updateData(employee.empId)}>
                                      Update
                                    </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p>&nbsp;</p>
                       
                    </div>
                        <div className="ButtonPositionDiv">
                            <button className="fetchEmpButton" onClick={fetchEmployees}>Fetch Employees</button>
                        </div>
                    </div>
            
            
            </div>
    </div>
  );
}

export default App;
