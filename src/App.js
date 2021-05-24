import "./App.css";
import { useState } from "react";

function App() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [cancelled, setCancelled] = useState([]);
  return (
    <div className="app">
      <div className="mainHeading">
      <center><h1>To Do List</h1></center>
      </div>
      <div className="subHeading">
        <br />
        <center><h2>Whoop, it's {days[new Date().getDay()]} 🌝 ☕ </h2></center>
      </div>
    <center><div  className="input">
        <input
          value={toDos.text}
          onChange={(e) => {
            setToDo({
              id: Date.now(),
              text: e.target.value,
              status: false,
              deleted: false,
            });
          }}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          className="fas fa-plus"
          onClick={() => {
            setToDos([...toDos, toDo]);
          }}
        ></i>
      </div></center>  
      <div className="todos">
        {toDos.map((obj) => {
          if (obj.deleted !== true) {
            return (
            <center><div key={obj.id} className="todo">
                <div className="left">
                  <input
                    onChange={(e) => {
                      setToDos(
                        toDos.filter((toDoItem) => {
                          if (toDoItem.id === obj.id) {
                            toDoItem.status = e.target.checked;
                          }
                          return toDoItem;
                        })
                      );
                    }}
                    value={obj.status}
                    className="strike-through"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <p className="actionbar">{obj.text}</p>
                </div>
                <div className="right">
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      setToDos(
                        toDos.filter((toDoItem) => {
                          if (toDoItem.id === obj.id) {
                            toDoItem.deleted = true;
                            !toDoItem.status &&
                              setCancelled([...cancelled, toDoItem.text]);
                          }
                          return toDoItem;
                        })
                      );
                    }}
                  ></i>
                </div>
              </div></center>  
            );
          }
          return null
        })}
       <center><div className="active">
         <center><h3 className="activetaskheading">ACTIVE</h3></center> 
          <br />
          <hr />
         {toDos.map((obj) => {
            if (obj.status !== true && obj.deleted !== true) {
              return <ul><li className="list" ><h3 key={obj.id} >{obj.text}</h3></li> </ul>;
            }
            return null
          })}
        </div></center> 
        <div className="completed">
          <center><h3 className="completetaskheading">COMPLETED</h3></center>
          <br />
          <hr />
          {toDos.map((obj) => {
            if (obj.status === true) {
              return <ul><li className="list" ><h3 key={obj.id}>{obj.text}</h3></li></ul>;
            }
            return null
          })}
        </div>
        <div className="history">
         <center><h3 className="canceltaskheading">CANCELLED</h3></center> 
         <br />
          <hr />
          {cancelled.map((obj) => {
            return <ul><li className="list" ><h3 key={obj.id}>{obj}</h3></li></ul>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
