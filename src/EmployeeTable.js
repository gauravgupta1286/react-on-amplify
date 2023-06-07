import React from 'react';

function EmployeeTable({ employees }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Designation</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.empId}</td>
            <td>{employee.empName}</td>
            <td>{employee.designation}</td>
            <td>{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
