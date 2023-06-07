import React, { useState } from 'react';
import axios from 'axios';


function EmployeeForm({ addEmployee }) {
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
        console.log("its called"+empId);
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
  }catch (error) {
    console.error(error);
  }
 } ;

  return (
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
  );
}

export default EmployeeForm;
