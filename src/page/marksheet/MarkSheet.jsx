import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../header/Header";
import "react-toastify/dist/ReactToastify.css";
import "./MarkSheet.css";

const MarkSheet = () => {
  const [data, setData] = useState([]);
  const [subName, setSubName] = useState("");
  const [subMaths, setSubMaths] = useState("");
  const [subEnglish, setSubEnglish] = useState("");
  const [subGujrati, setSubGujrati] = useState("");
  const [subScience, setSubScience] = useState("");
  const [subHindi, setSubHindi] = useState("");
  const [subSanskrit, setSubSanskrit] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("formdata"));
    if (items) {
      setData(items);
    }
  }, []);

  const subTotal =
    +subMaths +
    +subEnglish +
    +subGujrati +
    +subScience +
    +subHindi +
    +subSanskrit;
  const subPercentage = ((subTotal * 100) / 600).toFixed(2);

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = {
      name: subName,
      maths: subMaths,
      english: subEnglish,
      gujrati: subGujrati,
      science: subScience,
      hindi: subHindi,
      sanskrit: subSanskrit,
      total: subTotal,
      percentage: subPercentage,
      srNo: data?.length + 1,
    };
    console.log(subject);

    if (
      subName !== "" &&
      subMaths !== "" &&
      subEnglish !== "" &&
      subGujrati !== "" &&
      subScience !== "" &&
      subHindi !== "" &&
      subSanskrit !== "" &&
      subMaths >= 0 &&
      subMaths <= 100 &&
      subEnglish >= 0 &&
      subEnglish <= 100 &&
      subGujrati >= 0 &&
      subGujrati <= 100 &&
      subScience >= 0 &&
      subScience <= 100 &&
      subHindi >= 0 &&
      subHindi <= 100 &&
      subSanskrit >= 0 &&
      subSanskrit <= 100
    ) {
      let arr = data;
      if (arr.length === 0) {
        setData([...data, subject]);
        localStorage.setItem("formdata", JSON.stringify([...data, subject]));
        resetFields();
      } else {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]?.name === subject?.name) {
            if (!isEdit) {
              toast.error("username is already exits");
              return arr;
            }
          }
        }
        setData([...data, subject]);
        localStorage.setItem("formdata", JSON.stringify([...data, subject]));
        resetFields();
      }
    } else {
      toast.error("please right fill in the field");
    }

    if (isEdit) {
      subject.srNo = editId;
      let array = data;
      for (let i = 0; i < array.length; i++) {
        if (i === index) {
          array[i] = subject;
          setIndex("");
          resetFields();
        }
      }
      setData([...array]);
      setIsEdit(false);
      localStorage.setItem("formdata", JSON.stringify([...array]));
    }
  };

  const resetFields = () => {
    setSubName("");
    setSubMaths("");
    setSubEnglish("");
    setSubGujrati("");
    setSubScience("");
    setSubHindi("");
    setSubSanskrit("");
  };

  const handleEdit = (item, index) => {
    setSubName(item.name);
    setSubMaths(item.maths);
    setSubEnglish(item.english);
    setSubGujrati(item.gujrati);
    setSubScience(item.science);
    setSubHindi(item.hindi);
    setSubSanskrit(item.sanskrit);
    setEditId(item.srNo);
    setIsEdit(true);
    setIndex(index);
  };

  const handleDelete = (id) => {
    const deleteRow = data;
    deleteRow.splice(id, 1);
    setData([...data]);
    localStorage.setItem("formdata", JSON.stringify([...data]));
  };

  return (
    <div className="markshit-page">
      <Header />
      <div className="mark-form">
        <h1>From</h1>
        <form onSubmit={handleSubmit}>
          <label className="labels">Name:</label>
          <br />

          <input
            type="text"
            className="input"
            name="name"
            onChange={(e) => setSubName(e.target.value)}
            value={subName}
          />
          <br />

          <label className="labels">Maths:</label>
          <br />
          <input
            type="number"
            className="input"
            name="maths"
            onChange={(e) => setSubMaths(e.target.value)}
            value={subMaths}
          />
          <br />

          <label className="labels">English:</label>
          <br />
          <input
            type="number"
            className="input"
            name="english"
            onChange={(e) => setSubEnglish(e.target.value)}
            value={subEnglish}
          />
          <br />

          <label className="labels">Gujrati:</label>
          <br />
          <input
            type="number"
            className="input"
            name="gujrati"
            onChange={(e) => setSubGujrati(e.target.value)}
            value={subGujrati}
          />
          <br />

          <label className="labels">Science:</label>
          <br />
          <input
            type="number"
            className="input"
            name="science"
            onChange={(e) => setSubScience(e.target.value)}
            value={subScience}
          />
          <br />

          <label className="labels">Hindi:</label>
          <br />
          <input
            type="number"
            className="input"
            name="hindi"
            onChange={(e) => setSubHindi(e.target.value)}
            value={subHindi}
          />
          <br />

          <label className="labels">Sanskrit:</label>
          <br />
          <input
            type="number"
            className="input"
            name="sanskrit"
            onChange={(e) => setSubSanskrit(e.target.value)}
            value={subSanskrit}
          />
          <br />

          <button type="submit" className="sub-btn">
            {isEdit ? "Edit" : "Submit"}
          </button>
        </form>
      </div>

      <div className="mark-table">
        <table>
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Name</th>
              <th>Maths</th>
              <th>English</th>
              <th>Gujrati</th>
              <th>Science</th>
              <th>Hindi</th>
              <th>Sanskrit</th>
              <th>Total</th>
              <th>Percentage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.srNo}</td>
                  <td>{item?.name}</td>
                  <td
                    className={
                      item?.maths <= 30
                        ? "danger_color"
                        : item?.maths >= 31 && item?.maths <= 75
                        ? "dark_color"
                        : item.maths >= 75 && item.maths < 100
                        ? "mild_color"
                        : ""
                    }
                  >
                    {item?.maths}
                  </td>
                  <td
                    className={
                      item?.english <= 30
                        ? "danger_color"
                        : item?.english >= 31 && item?.english <= 75
                        ? "dark_color"
                        : item.english >= 75 && item.english < 100
                        ? "mild_color"
                        : ""
                    }
                  >
                    {item?.english}
                  </td>
                  <td
                    className={
                      item?.gujrati <= 30
                        ? "danger_color"
                        : item?.gujrati >= 31 && item?.gujrati <= 75
                        ? "dark_color"
                        : item.gujrati >= 75 && item.gujrati < 100
                        ? "mild_color"
                        : ""
                    }
                  >
                    {item?.gujrati}
                  </td>
                  <td
                    className={
                      item?.science <= 30
                        ? "danger_color"
                        : item?.science >= 31 && item?.science <= 75
                        ? "dark_color"
                        : item.science >= 75 && item.science < 100
                        ? "mild_color"
                        : ""
                    }
                  >
                    {item?.science}
                  </td>
                  <td
                    className={
                      item?.hindi <= 30
                        ? "danger_color"
                        : item?.hindi >= 31 && item?.hindi <= 75
                        ? "dark_color"
                        : item.hindi >= 75 && item.hindi < 100
                        ? "mild_color"
                        : ""
                    }
                  >
                    {item?.hindi}
                  </td>
                  <td
                    className={
                      item?.sanskrit <= 30
                        ? "danger_color"
                        : item?.sanskrit >= 31 && item?.sanskrit <= 75
                        ? "dark_color"
                        : item.sanskrit >= 75 && item.sanskrit < 100
                        ? "mild_color"
                        : ""
                    }
                  >
                    {item?.sanskrit}
                  </td>
                  <td>{item?.total}</td>
                  <td>{item?.percentage <= 35 ? "Fail" : item?.percentage}</td>
                  <td>
                    <button onClick={() => handleEdit(item, index)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
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

export default MarkSheet;
