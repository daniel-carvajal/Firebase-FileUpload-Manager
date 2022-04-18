import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import BooksContext from "../context/BooksContext";

import { db, storage } from "../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useDropzone } from "react-dropzone";

import departamentos from "./data_schema/departamentos.json";
import municipios from "./data_schema/municipios.json";

import FilesUploadComponent from "../components/files-upload-component";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const options_estadoCivil = [
  { value: "Soltero", label: "Soltero" },
  { value: "Casado", label: "Casado" },
  { value: "Viudo", label: "Viudo" },
  { value: "Divorciado", label: "Divorciado" },
  { value: "Concubinato", label: "Concubinato" },
  { value: "Otro", label: "Otro" },
];

const options_sexo = [
  { value: "Masculino", label: "Masculino" },
  { value: "Femenino", label: "Femenino" },
  { value: "Otro", label: "Otro" },
];

const options_escolaridad = [
  { value: "Sin estudios", label: "Sin estudios" },
  { value: "Primaria", label: "Primaria" },
  { value: "Bachiller", label: "Bachiller" },
  { value: "Universitaria", label: "Universitaria" },
];

// const customStyles = {
//   control: (base) => ({
//     ...base,
//     height: 20,
//     minHeight: 20,
//     // marginTop: -10,
//   }),
// };

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "30px",
    height: "30px",
    boxShadow: state.isFocused ? null : null,
    border: "0.04rem solid",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
};

function App() {
  const { books, setBooks } = useContext(BooksContext);

  const navigate = useNavigate();

  const contactRef = useRef(null);

  const [data, setData] = useState([]);

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

  const [CEDULA_CAFETERA, setCEDULA_CAFETERA] = useState("");
  const fiveUpdater = (event) => {
    setCEDULA_CAFETERA(event.target.value);
  };

  const [VEREDA, setVEREDA] = useState("");
  const sixUpdater = (event) => {
    setVEREDA(event.target.value);
  };

  const [MUNICIPIO, setMUNICIPIO] = useState("");
  // const sevenUpdater = (event) => {
  //   setMUNICIPIO(event.target.value);
  // };

  const [ESTADO_CIVIL, setESTADO_CIVIL] = useState("");

  const [SEXO, setSEXO] = useState("");

  const [ESCOLARIDAD, setESCOLARIDAD] = useState("");

  const submitForm = async (data) => {
    // console.log("sent");
    let firebase_id = "";
    try {
      const docRef = await addDoc(collection(db, "agricultor"), data);
      console.log("Document written with ID: ", docRef.id);
      // console.log(docRef);
      firebase_id = docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return firebase_id;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      CEDULA: parseInt(CEDULA),
      NOMBRE_CAFICULTOR: NOMBRE_CAFICULTOR,
      FECHA_DE_NACIMIENTO: FECHA_DE_NACIMIENTO
        ? FECHA_DE_NACIMIENTO
        : new Date(),
      ESTADO_CIVIL: ESTADO_CIVIL["value"],
      SEXO: SEXO["value"],
      ESCOLARIDAD: ESCOLARIDAD["value"],
      TELEFONO: TELEFONO,
      CEDULA_CAFETERA: CEDULA_CAFETERA,
      // VEREDA: VEREDA,
      // MUNICIPIO: MUNICIPIO ? MUNICIPIO["name"] : null,
      fecha_creacion: Timestamp.now(),
    };

    const firebase_id = submitForm(formData);
    formData["id"] = await firebase_id;

    setData((prevState) => [formData, ...prevState]);
    console.log(formData);

    setCEDULA("");
    setNOMBRE_CAFICULTOR("");
    setFECHA_DE_NACIMIENTO("");
    setESTADO_CIVIL("");
    setSEXO("");
    setESCOLARIDAD("");
    setTELEFONO("");
    setCEDULA_CAFETERA("");
    // setVEREDA("");
    // setMUNICIPIO("");

    setDate();

    setBooks((prevState) => [formData, ...prevState]);
  };

  const getCollection = async () => {
    let scoped_data = [];

    const q = query(
      collection(db, "agricultor"),
      // where("CEDULA", "!=", null),
      orderBy("fecha_creacion", "asc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let obj = {
        CEDULA: doc.data().CEDULA,
        NOMBRE_CAFICULTOR: doc.data().NOMBRE_CAFICULTOR,
        FECHA_DE_NACIMIENTO: doc.data().FECHA_DE_NACIMIENTO.toDate(),
        ESTADO_CIVIL: doc.data().ESTADO_CIVIL,
        SEXO: doc.data().SEXO,
        ESCOLARIDAD: doc.data().ESCOLARIDAD,
        TELEFONO: doc.data().TELEFONO,
        CEDULA_CAFETERA: doc.data().CEDULA_CAFETERA,
        // VEREDA: doc.data().VEREDA,
        // MUNICIPIO: doc.data().MUNICIPIO,
        fecha_creacion: doc.data().fecha_creacion,
        id: doc.id,
      };
      // console.log(obj.id);

      setData((prevState) => [obj, ...prevState]);
      scoped_data.unshift(obj);
    });

    // console.log(data);
    setBooks(scoped_data);
  };

  useEffect(() => {
    getCollection();
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const removeColor = (id) => {
    // remove the color of the id that is passed by using the filter function
    const newColors = data.filter((color) => color.id !== id);
    // update your state with filtered colors
    setData(newColors);
  };

  const deleteHandler = async (id) => {
    // console.log("sent");
    // console.log("should delete ", id);
    try {
      await deleteDoc(doc(db, "agricultor", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
    console.log(data);
    removeColor(id);

    console.log(data);
  };

  const handleDateChange = (d) => {
    // console.log(d);
    setFECHA_DE_NACIMIENTO(d);
    setDate(d);
  };

  const [date, setDate] = useState();

  const setChildProgress = () => {};

  const uploadFile = async () => {
    await Promise.all(
      myFiles.map((file, i, myFilesObj) => {
        console.log(file);

        const storageRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        
        setUploadStatus("Uploading")
        
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // setCurrentlyUploadingIndex(i)
            // console.log('😎', snapshot.task._blob.data_.name)

            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progressSnap =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            // if (progressSnap < 40) {
            //   // setCurrentlyUploading(snapshot.task._blob.data_.name)
            // console.log('-----')
            // console.log('😎', snapshot.task._blob.data_.name)
            // console.log(snapshot.task._blob.data_)
            // console.log('-----')
            setCurrentlyUploadingObj(snapshot.task._blob.data_);

            // }

            // console.log("Upload is " + progressSnap + "% done");
            setProgress(progressSnap);

            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            if (i + 1 === myFilesObj.length) {
              // Last one.
              // setMyFiles([]);
              setUploadStatus("--File Uploading Complete--");
              // setProgress(0)
              // console.log("last one finished !!!");
            } else {
              // Not last one.
            }
          }
        );
      })
    );
  };

  const [myFiles, setMyFiles] = useState([]);

  const [selectedImages, setSelectedImages] = useState();

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);

      setSelectedImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // setSelectedImages(
      //   myFiles.map((file) =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     })
      //   )
      // );

      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, inputRef } =
    useDropzone({ onDrop });

  const selected_images = selectedImages?.map((file) => (
    <div>
      <img
        src={file.preview}
        style={{
          maxHeight: "200px",
        }}
        alt=""
      />
    </div>
  ));

  const removeFile = (file) => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);

    console.log("removeFile...");
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    console.log(acceptedFiles);
  };

  const removeAll = () => {
    console.log("removeAll...");
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    inputRef.current.value = "";
    console.log(acceptedFiles);

    setMyFiles([]);
  };

  const [currentlyUploadingObj, setCurrentlyUploadingObj] = useState({});

  const [uploadStatus, setUploadStatus] = useState(null)
  const [progress, setProgress] = useState(0);

  return (
    <div style={{ width: "100% !important" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span
          style={{
            fontFamily: "Newake",
            fontSize: "calc(26px + 1vmin)",
          }}
        >
          Case Upload
        </span>
      </div>
      <div
        className="float-container"
        style={{
          paddingTop: "15px",
        }}
      >
        <div
          style={
            {
              // width: "50%",
              // backgroundColor: "IndianRed",
              // padding: "7px",
              // maxWidth: "50%",
              // backgroundColor: "red",
              // float: "red",
            }
          }
          className="float-child create"
        >
          <div style={{ padding: "10px" }}>
            <div id="first-label" className="label">
              Cedula:
            </div>
            <input onChange={threeUpdater} value={CEDULA} />

            <div className="label">Nombre Cafiyuplpltor:</div>
            <input onChange={twoUpdater} value={NOMBRE_CAFICULTOR} />

            <div className="label">Fecha De Nacimiento:</div>
            {/* <input onChange={oneUpdater} value={FECHA_DE_NACIMIENTO} /> */}
            <DatePicker
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              selected={date}
              // selected={Date.now()}
              onChange={(date) => handleDateChange(date)}
            />
            <div className="label">Estado Civil:</div>
            <Select
              value={ESTADO_CIVIL}
              // options={options}
              options={options_estadoCivil}
              onChange={setESTADO_CIVIL}
              // isSearchable={true}
              styles={customStyles}
              // defaultValue={options[0]}
              isClearable={true}
              // getOptionLabel={(option) => option["name"]}
              // getOptionValue={(option) => option["name"]}
            />
            <div className="label">Sexo:</div>
            <Select
              value={SEXO}
              // options={options}
              options={options_sexo}
              onChange={setSEXO}
              // isSearchable={true}
              styles={customStyles}
              // defaultValue={options[0]}
              isClearable={true}
              // getOptionLabel={(option) => option["name"]}
              // getOptionValue={(option) => option["name"]}
            />
            <div className="label">Escolaridad:</div>
            <Select
              value={ESCOLARIDAD}
              // options={options}
              options={options_escolaridad}
              onChange={setESCOLARIDAD}
              isSearchable={true}
              styles={customStyles}
              // defaultValue={options[0]}
              isClearable={true}
              // getOptionLabel={(option) => option["name"]}
              // getOptionValue={(option) => option["name"]}
            />

            <div className="label">Telefono:</div>
            <input onChange={fourUpdater} value={TELEFONO} />

            <div className="label">Cédula Cafetera:</div>
            <input onChange={fiveUpdater} value={CEDULA_CAFETERA} />

            {/* <div className="label">Vereda:</div>
            <input onChange={sixUpdater} value={VEREDA} /> */}

            {/* <div className="label">Municipio:</div>
            <Select
              value={MUNICIPIO}
              // options={options}
              options={municipios["data"]}
              onChange={setMUNICIPIO}
              isSearchable={true}
              styles={customStyles}
              // defaultValue={options[0]}
              // isClearable={true}
              getOptionLabel={(option) => option["name"]}
              getOptionValue={(option) => option["name"]}
            /> */}
            {/* <br /> */}
          </div>
          <div
            style={{
              textAlign: "center",
              // marginTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <button href="javascript;" onClick={submitHandler} className="btn">
              Crear
            </button>
          </div>
        </div>
        <div
          className="float-child query"
          style={{
            // width: "50%",
            // backgroundColor: "aqua",
            // height: "83vh",
            // maxHeight: "65vh",
            maxHeight: "340px",

            overflow: "auto",
          }}
        >
          {/* Entradas */}
          {data.map((obj) => (
            <React.Fragment>
              <div style={{ width: "100%", textAlign: "right" }}>
                <button
                  className="edit"
                  onClick={() => {
                    // deleteHandler(obj.id);
                    navigate(`/edit/${obj.id}`);
                  }}
                >
                  edit
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    deleteHandler(obj.id);
                  }}
                >
                  delete
                </button>
              </div>
              <p
                className="queryObj"
                style={{
                  // backgroundColor: "aqua",
                  // backgroundColor: "rgba(0,0,0,0.2)",
                  margin: "5px",
                  padding: "7px",
                }}
              >
                Cedula:{" "}
                <span className="query_value">
                  {obj.CEDULA ? obj.CEDULA : null}
                </span>
                <br />
                Nombre Caficultor:{" "}
                <span className="query_value">{obj.NOMBRE_CAFICULTOR}</span>
                {/* {obj.CEDULA} */}
                <br />
                Fecha De Nacimiento:{" "}
                <span className="query_value">
                  {obj.FECHA_DE_NACIMIENTO.toDateString()}
                </span>
                {/* {obj.FECHA_DE_NACIMIENTO.toDateString()} */}
                {/* {obj.FECHA_DE_NACIMIENTO.toDate().toDateString()} */}
                <br />
                Estado Civil:{" "}
                <span className="query_value">{obj.ESTADO_CIVIL}</span>
                <br />
                Sexo: <span className="query_value">{obj.SEXO}</span>
                <br />
                Escolaridad:{" "}
                <span className="query_value">{obj.ESCOLARIDAD}</span>
                <br />
                Telefono: <span className="query_value">{obj.TELEFONO}</span>
                <br />
                Cédula Cafetera:{" "}
                <span className="query_value">{obj.CEDULA_CAFETERA}</span>
                <br />
                {/* Vereda: <span className="query_value">{obj.VEREDA}</span>
                <br /> */}
                {/* Municipio: <span className="query_value">{obj.MUNICIPIO}</span>
                <br /> */}
                Fecha Añadido:{" "}
                <span className="query_value">
                  {obj.fecha_creacion.toDate().toDateString()}
                </span>
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="App">
        <section className="container">
          <div
            style={{
              width: "100vw",
              height: "250px",
              backgroundColor: "#dadada",
            }}
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          {myFiles.length > 0 && <button onClick={uploadFile}>upload</button>}
          
          {(myFiles.length > 0) && (<button onClick={removeAll}>Remove All</button>)}
          {uploadStatus}
        </section>
        <br />

        {myFiles.map(function (object, i) {
          return (
            <FilesHTML
              object={object}
              myFiles={myFiles}
              progress={progress}
              removeFile={removeFile}
              currentlyUploading={currentlyUploadingObj}
            />
          );
        })}
      </div>
      
      <br />
      <br />
    </div>
  );
}

export default App;

const FilesHTML = (props) => {
  let progressParent = props.progress;
  let object = props.object;
  let removeFile = props.removeFile;
  let currentlyUploading = props.currentlyUploading;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentlyUploading.name == object.name) {
      setProgress(progressParent);
    }
  }, [progressParent]);

  return (
    <>
      <li>{object.name}</li>
      {progress < 5 && <button onClick={removeFile(object)}>Remove</button>}
      
      <progress
        id="progressBar"
        value={progress}
        max="100"
        style={{ width: "300px" }}
      ></progress>
      {progress}
      {progress > 99 ? <div>Done!</div> : null}
    </>
  );
};
