import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../header/Header";
import "react-toastify/dist/ReactToastify.css";
import "./list.css";

const List = () => {
  const [userData, setUserData] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userData"));
    if (items) {
      setUserData(items);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstname: fName,
      lastname: lName,
      username: uName,
      email: email,
    };
    if (fName === "" || lName === "" || uName === "" || email === "") {
      toast.error("please fill in the field");
    } else {
      if (isEdit) {
        let arr = userData;
        for (let i = 0; i < arr?.length; i++) {
          if (i === dataIndex) {
            arr[i] = data;
            setDataIndex("");
            resetField();
          }
        }
        setUserData([...arr]);
        setIsEdit(false);
      } else {
        console.log(data);
        setUserData([...userData, data]);
        localStorage.setItem("userData", JSON.stringify([...userData, data]));
        resetField();
      }
    }
  };
  const resetField = () => {
    setFName("");
    setLName("");
    setUName("");
    setEmail("");
  };
  const handleDelete = (id) => {
    const rows = [...userData];
    rows.splice(id, 1);
    setUserData([...rows]);
    localStorage.setItem("userData", JSON.stringify([...rows]));
  };
  const handleEdit = (item, index) => {
    setFName(item.firstname);
    setLName(item.lastname);
    setUName(item.username);
    setEmail(item.email);
    setIsEdit(true);
    setDataIndex(index);
  };
  return (
    <div className="list-page">
      <Header />
      <div className="register">
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
          <label className="labels-list">First name:</label>
          <br />

          <input
            type="text"
            className="input"
            name="fname"
            placeholder="firstname"
            onChange={(e) => setFName(e.target.value)}
            value={fName}
          />
          <br />

          <label className="labels-list">Last name:</label>
          <br />
          <input
            type="text"
            className="input"
            name="lname"
            placeholder="lastname"
            onChange={(e) => setLName(e.target.value)}
            value={lName}
          />
          <br />

          <label className="labels-list">User name:</label>
          <br />
          <input
            type="text"
            className="input"
            name="uname"
            placeholder="username"
            onChange={(e) => setUName(e.target.value)}
            value={uName}
          />
          <br />

          <label className="labels-list">Email:</label>
          <br />
          <input
            type="email"
            className="input"
            name="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <br />

          <button type="submit" className="sub-btn">
            {isEdit ? "update" : "submit"}
          </button>
        </form>
      </div>

      <div className="table-design">
        <table className="table-list">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleEdit(item, index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default List;
