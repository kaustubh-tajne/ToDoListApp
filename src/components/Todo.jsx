import React, { useState } from "react";
import Img from "../images/img.png";
import "../index.css";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Todo = () => {
  const [note, setNote] = useState("");
  const [arr, setArr] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [editNoteNew, setEditNoteNew] = useState('');

  const InputEvent = (e) => {
    setNote(e.target.value);
  };

  const addNote = () => {
    if (note) {
      const data = { id: new Date().getTime().toString(), name: note };
      // setArr([...arr, data]);
      setArr((oldArr) => {
        const data = { id: new Date().getTime().toString(), name: note };
        return [...oldArr, data];
      });
    }
    setNote("");
    setToggle(true);
  };

  const deleteItem = (id) => {
    console.log(id);

    const update = arr.filter((ele, ind) => {
      return ele.id !== id;
    });

    console.log(update);

    setArr(update);

    // setArr((oldArr) => {
    //   const a = [...oldArr];
    //   a.splice(e.target.id,1);
    //   return a;
    // })
  };

  const removeAll = () => {
    setArr([]);
  };

  const editItem = (id) => {
    let newEditItem = arr.find((ele, ind) => {
      return ele.id === id;
    });
    console.log(newEditItem);

    setToggle(false);
    setNote(newEditItem.name);
    setEditNoteNew(newEditItem);
  };

  const editItemNote = () => {
    if (note) {
      setArr((oldArr) => {
        let index = oldArr.findIndex(obj => obj.id === editNoteNew.id);
        if (index != -1) {
          oldArr[index].name = note;
        }
        return [...oldArr];
      });
    }
    setNote("");
    setToggle(true);
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={Img} alt="img" />
            <figcaption>Add Your List Here 📓</figcaption>
          </figure>

          <div className="additems">
            <input
              type="text"
              placeholder="➕ Add note" 
              value={note}
              onChange={InputEvent}
            />
            {/* <Button variant='contained'><AddIcon/></Button> */}
            {toggle ? (
              <AddIcon className="add" onClick={addNote} title='Add item'/>
            ) : (
              <EditIcon className="delete" onClick={editItemNote}/>
            )}
          </div>

          <div className="showItems">
            {arr.map((ele, index) => {
              return (
                <div className="eachItems" key={ele.id}>
                  <h3>{ele.name}</h3>
                  <div className="todo-btn">
                    <EditIcon
                      className="delete"
                      onClick={() => editItem(ele.id)}
                    />
                    <DeleteIcon
                      className="delete"
                      id={index}
                      onClick={() => deleteItem(ele.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            {(arr.length) > 0 && <Button variant="contained" onClick={removeAll}>
              Check List
            </Button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
