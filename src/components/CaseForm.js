import React, { useState, useEffect, useContext } from "react";
// import AgricultorForm from "../components/AgricultorForm";
// import { useParams } from "react-router-dom";

import { db } from "../firebase";


import {
  collection,
  addDoc,
  updateDoc,
  // getDocs,
  // orderBy,
  // query,
  doc,
  // deleteDoc,
  // Timestamp,
} from "firebase/firestore";
// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import BooksContext from "../context/BooksContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Agricultor = (props) => {
  let params = useParams();
  const navigate = useNavigate();

  // let params = useParams();

  const { books, setBooks } = useContext(BooksContext);
  const filteredBook = books.filter((book) => book.id === params.id)[0];

  useEffect(() => {
    // console.log(filteredBook["FECHA_DE_NACIMIENTO"])

    if (filteredBook["FECHA_DE_NACIMIENTO"]) {
      const FECHA_DE_NACIMIENTO_dateObj = new Date(filteredBook["FECHA_DE_NACIMIENTO"])
      // console.log(visitaDate)

      // const dateObj = new Date (visitaDate)
      // console.log(dateObj)

      if (typeof filteredBook["FECHA_DE_NACIMIENTO"] == "object"){
        setFECHA_DE_NACIMIENTO(filteredBook.FECHA_DE_NACIMIENTO);
        setDate(filteredBook.FECHA_DE_NACIMIENTO)
      }
      else if (typeof filteredBook["FECHA_DE_NACIMIENTO"] == "string"){
        // console.log('string')
        setFECHA_DE_NACIMIENTO(filteredBook.FECHA_DE_NACIMIENTO);
        setDate(FECHA_DE_NACIMIENTO_dateObj)
      }
      // console.log(typeof filteredBook["FECHA_DE_NACIMIENTO"]);
      // setFECHA_DE_NACIMIENTO(filteredBook.FECHA_DE_NACIMIENTO);
      // setDate(filteredBook.FECHA_DE_NACIMIENTO)
      setNOMBRE_CAFICULTOR(filteredBook.NOMBRE_CAFICULTOR);
      setCEDULA(filteredBook.CEDULA);
      // typeof CEDULA == "number" ? setCEDULA(filteredBook.CEDULA); : null;
      setTELEFONO(filteredBook.TELEFONO);
      setNOMBRE_DE_LA_FINCA(filteredBook.NOMBRE_DE_LA_FINCA);
      setVEREDA(filteredBook.VEREDA);
      setMUNICIPIO(filteredBook.MUNICIPIO);
    }
    // effect
    // return () => {
    //   cleanup
    // }
  }, [filteredBook]);

  const [FECHA_DE_NACIMIENTO, setFECHA_DE_NACIMIENTO] = useState("");
  const oneUpdater = (event) => {
    setFECHA_DE_NACIMIENTO(event.target.value);
  };

  const [NOMBRE_CAFICULTOR, setNOMBRE_CAFICULTOR] = useState("");
  const twoUpdater = (event) => {
    setNOMBRE_CAFICULTOR(event.target.value);
  };

  const [CEDULA, setCEDULA] = useState("");
  const threeUpdater = (event) => {
    setCEDULA(event.target.value);
  };

  const [TELEFONO, setTELEFONO] = useState("");
  const fourUpdater = (event) => {
    setTELEFONO(event.target.value);
  };

  const [NOMBRE_DE_LA_FINCA, setNOMBRE_DE_LA_FINCA] = useState("");
  const fiveUpdater = (event) => {
    setNOMBRE_DE_LA_FINCA(event.target.value);
  };

  const [VEREDA, setVEREDA] = useState("");
  const sixUpdater = (event) => {
    setVEREDA(event.target.value);
  };

  const [MUNICIPIO, setMUNICIPIO] = useState("");
  const sevenUpdater = (event) => {
    setMUNICIPIO(event.target.value);
  };

  // const submitHandler = () => {
  //   console.log()
  // }

  // const updateDoc = async (data) => {
  //   // console.log("sent");
  //   let firebase_id = "";
  //   try {
  //     const docRef = await addDoc(collection(db, "agricultor"), data);
  //     console.log("Document written with ID: ", docRef.id);
  //     // console.log(docRef);
  //     firebase_id = docRef.id;
  //   } catch (e) {
  //     // console.error("Error adding document: ", e);
  //   }
  //   return firebase_id;
  // };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      FECHA_DE_NACIMIENTO: FECHA_DE_NACIMIENTO,
      NOMBRE_CAFICULTOR: NOMBRE_CAFICULTOR,
      // CEDULA: CEDULA ? parseInt(CEDULA) : CEDULA,
      CEDULA: CEDULA ? CEDULA : null,
      TELEFONO: TELEFONO,
      NOMBRE_DE_LA_FINCA: NOMBRE_DE_LA_FINCA,
      VEREDA: VEREDA,
      MUNICIPIO: MUNICIPIO,
      // fecha_creacion: Timestamp.now(),
    };

    // const firebase_id = updateDoc(formData);
    // formData["id"] = await firebase_id;

    // setData((prevState) => [formData, ...prevState]);
    console.log(formData);

    await updateDoc(doc(db, "agricultor", props.id), formData);

    // await updateDoc(doc(db, "agricultor", props.id), formData);
    // } catch (error) {
    // console.log(error);
    // }
    // alert(`Edito ${campo} de id: ${id} a: ${value}`);

    // setFECHA_DE_NACIMIENTO("");
    // setNOMBRE_CAFICULTOR("");
    // setCEDULA("");
    // setTELEFONO("");
    // setNOMBRE_DE_LA_FINCA("");
    // setVEREDA("");
    // setMUNICIPIO("");

    navigate(`/cases`);
  };

  // const handleSave = async ({ name, value, previousValue }, id, campo) => {
  //   // const docRef = doc(db, "agricultor", id);
  //   // try {
  //   await updateDoc(doc(db, "agricultor", id), {
  //     // capital: true
  //     [campo]: value,
  //   });
  //   // } catch (error) {
  //   // console.log(error);
  //   // }
  //   alert(`Edito ${campo} de id: ${id} a: ${value}`);
  // };

  //   const { id } = useParams();
  //   const bookToEdit = books.find((book) => book.id === id);

  //   const handleOnSubmit = (book) => {
  //     const filteredBooks = books.filter((book) => book.id !== id);
  //     setBooks([book, ...filteredBooks]);
  //     history.push("/");
  //   };

  const [date, setDate] = useState();

  const handleDateChange = (d) => {
    // console.log(d);
    setFECHA_DE_NACIMIENTO(d);
    setDate(d);
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* <div style={{ textAlign: "center" }}>Editing: {props.id}</div> */}

      <div className="label">Fecha De Nacimiento:</div>
                  <DatePicker
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              selected={date}
              // selected={Date.now()}
              onChange={(date) => handleDateChange(date)}
            />
      {/* <input onChange={oneUpdater} value={FECHA_DE_NACIMIENTO} /> */}
      <div className="label">Nombre Caficultor:</div>
      <input onChange={twoUpdater} value={NOMBRE_CAFICULTOR} />
      <div className="label">Cedula:</div>
      <input onChange={threeUpdater} value={CEDULA} />
      <div className="label">Telefono:</div>
      <input onChange={fourUpdater} value={TELEFONO} />
      <div className="label">Cédula Cafetera:</div>
      <input onChange={fiveUpdater} value={NOMBRE_DE_LA_FINCA} />
      {/* <div className="label">Vereda:</div>
      <input onChange={sixUpdater} value={VEREDA} /> */}
      {/* <div className="label">Municipio:</div>
      <input onChange={sevenUpdater} value={MUNICIPIO} /> */}
      {/* <br /> */}
      <button href="javascript;" onClick={submitHandler} className="btn">
        Submit
      </button>
    </div>
  );
};

export default Agricultor;
