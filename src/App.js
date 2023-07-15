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
  const [isAddEmpDisabled, setAddEmpDisabled] = useState(false);
  const [isIdEmpDisabled, setisIdEmpDisabled] = useState(false);
  const [highlightedRow, setHighlightedRow] = useState(null);
  
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
   
    if(empId.trim().length===0 || 
      empName.trim().length===0 ||
      designation.trim().length===0 ||
      salary.trim().length===0)
      {

        alert('Please fill complete details !!!!');

      }else{
      
      
    try {
        
         await axios.post('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev', {
          empId:empId,
          emp_Name: empName,
          designation:designation,
          salary: salary
        });
    alert('Employee with EmployeeId = ' + empId + ' and Employee Name = '+ empName +' has been added Successfully.');
    addEmployee({ empId, empName, designation, salary });
    setEmpId('');
    setEmpName('');
    setDesignation('');
    setSalary('');

  }catch (error) {
    alert('There was some error in adding employee and error message is =' + error);
    console.error(error);
  }
  fetchEmployees();
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

  const removeData = async (Id) => {

    console.log('epid which is going to be deleted=' + Id);
    try {
    await axios.delete('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev/', 
    {
      data: {
        empId: Id
      }
    });

    alert('Employee with Empid = '+ Id + ' has been deleted Successfully.');
    
  } catch (error) {
    alert('Error in deleting employees:' + error);
    console.error('Error in deleting employees:', error);
  }
      fetchEmployees();

}


const selectData = ( obj, index, event) => {
  console.log('empId:', obj.empId);
  console.log('IValue:', index, event.currentTarget);
  //event.currentTarget.disabled = true;
  setHighlightedRow(index);
  setEmpId(obj.empId);
  setEmpName(obj.emp_Name);
  setDesignation(obj.designation);
  setSalary(obj.salary);
  setAddEmpDisabled(true);
  setisIdEmpDisabled(true);
  
    
}
const updateData = async(objEmp, event) => {
  console.log('emp:', objEmp.empId);

 
  try {
      
       await axios.put('https://bbtn3h503k.execute-api.us-east-1.amazonaws.com/dev', {
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
  alert('Employee with Empid = '+ objEmp.empId + ' has not been updated. Error = '+ error);
  console.error(error);
}
alert('Employee with Empid = '+ objEmp.empId + ' has been updated Successfully.');
  fetchEmployees();
 setAddEmpDisabled(false);
 setisIdEmpDisabled(false);
 setHighlightedRow(10000);
  
  
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
                              disabled={isIdEmpDisabled}
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
                          <button className="addEmpButton" disabled={isAddEmpDisabled}  type="submit">Add Employee</button>
                         
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
                              <th>Select</th>
                              <th>Update</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employeeData.map((employee, index) => (
                              <tr key={employee.empid} className={highlightedRow === index ? 'highlighted' : 'unhighlighted'}> 
                                <td>{employee.empId}</td>
                                <td>{employee.emp_Name}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.salary}</td>
                                
                                <td className="operation">
                                    <button className="selectButton" onClick={(event) => selectData(employee, index, event)}>
                                      Select
                                    </button>
                                </td>
                                <td className="operation">
                                    <button className="updateButton" onClick={(event) => updateData(employee)}>
                                      Update
                                    </button>
                                </td>
                                <td className="operation">
                                    <button className="deleteButton" onClick={() => removeData(employee.empId)}>
                                      Delete
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
