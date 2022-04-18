import React, { useRef, useState, useEffect } from "react";
import { db } from "./../firebase";
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

function Finca() {
  // const contactRef = useRef(null);

  const [data, setData] = useState([]);

  const [FECHA_DE_NACIMIENTO, setFECHA_DE_NACIMIENTO] = useState("");
  const oneUpdater = (event) => {
    setFECHA_DE_NACIMIENTO(event.target.value);
  };

  const [MUNICIPIO, setMUNICIPIO] = useState("");
  const twoUpdater = (event) => {
    setMUNICIPIO(event.target.value);
  };

  const [ESTADO_CIVIL, setESTADO_CIVIL] = useState("");
  const threeUpdater = (event) => {
    setESTADO_CIVIL(event.target.value);
  };

  const [ESCOLARIDAD, setESCOLARIDAD] = useState("");
  const fourUpdater = (event) => {
    setESCOLARIDAD(event.target.value);
  };

  const [CEDULA_CAFETERA, setCEDULA_CAFETERA] = useState("");
  const fiveUpdater = (event) => {
    setCEDULA_CAFETERA(event.target.value);
  };

  const [HA_TOTAL_DE_LA_FINCA, setHA_TOTAL_DE_LA_FINCA] = useState("");
  const sixUpdater = (event) => {
    setHA_TOTAL_DE_LA_FINCA(event.target.value);
  };

  const [MSNM, setMSNM] = useState("");
  const sevenUpdater = (event) => {
    setMSNM(event.target.value);
  };

  const [FUENTES_HIDRICAS, setFUENTES_HIDRICAS] = useState("");
  const eightUpdater = (event) => {
    setFUENTES_HIDRICAS(event.target.value);
  };

  const [AREA_EN_BOSQUE, setAREA_EN_BOSQUE] = useState("");
  const nineUpdater = (event) => {
    setAREA_EN_BOSQUE(event.target.value);
  };

  const [AREA_EN_EROSIÓN, setAREA_EN_EROSIÓN] = useState("");
  const tenUpdater = (event) => {
    setAREA_EN_EROSIÓN(event.target.value);
  };

  const [BENEFICIO, setBENEFICIO] = useState("");
  const elevenUpdater = (event) => {
    setBENEFICIO(event.target.value);
  };

  const [TRATAMIENTO_DE_AGUA, setTRATAMIENTO_DE_AGUA] = useState("");
  const twelveUpdater = (event) => {
    setTRATAMIENTO_DE_AGUA(event.target.value);
  };

  const [Kg_CAFÉ_CEREZA_AÑO_ANTER, setKg_CAFÉ_CEREZA_AÑO_ANTER] = useState("");
  const thirteenUpdater = (event) => {
    setKg_CAFÉ_CEREZA_AÑO_ANTER(event.target.value);
  };

  const submitForm = async (data) => {
    // console.log("sent");
    let firebase_id = "";
    try {
      const docRef = await addDoc(collection(db, "finca"), data);
      console.log("Document written with ID: ", docRef.id);
      // console.log(docRef);
      firebase_id = docRef.id;
    } catch (e) {
      // console.error("Error adding document: ", e);
    }
    return firebase_id;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = {
      FECHA_DE_NACIMIENTO: FECHA_DE_NACIMIENTO,
      MUNICIPIO: MUNICIPIO,
      ESTADO_CIVIL: ESTADO_CIVIL,
      ESCOLARIDAD: ESCOLARIDAD,
      CEDULA_CAFETERA: CEDULA_CAFETERA,
      HA_TOTAL_DE_LA_FINCA: HA_TOTAL_DE_LA_FINCA,
      MSNM: MSNM,
      FUENTES_HIDRICAS: FUENTES_HIDRICAS,
      AREA_EN_BOSQUE: AREA_EN_BOSQUE,
      BENEFICIO: BENEFICIO,
      TRATAMIENTO_DE_AGUA: TRATAMIENTO_DE_AGUA,
      Kg_CAFÉ_CEREZA_AÑO_ANTER: Kg_CAFÉ_CEREZA_AÑO_ANTER,

      // FECHA_DE_LA_VISITA: FECHA_DE_LA_VISITA,
      // NOMBRE_CAFICULTOR: NOMBRE_CAFICULTOR,
      // CEDULA: parseInt(CEDULA),
      // TELEFONO: TELEFONO,
      // NOMBRE_DE_LA_FINCA: NOMBRE_DE_LA_FINCA,
      // VEREDA: VEREDA,
      // MUNICIPIO: MUNICIPIO,
      fecha_creacion: Timestamp.now(),
    };

    const firebase_id = submitForm(formData);
    formData["id"] = await firebase_id;

    setData((prevState) => [formData, ...prevState]);
    console.log(formData);

    setFECHA_DE_NACIMIENTO("");
    setMUNICIPIO("");
    setESTADO_CIVIL("");
    setESCOLARIDAD("");
    setCEDULA_CAFETERA("");
    setHA_TOTAL_DE_LA_FINCA("");
    setMSNM("");
    setFUENTES_HIDRICAS("");
    setAREA_EN_BOSQUE("");
    setAREA_EN_EROSIÓN("");
    setBENEFICIO("");
    setTRATAMIENTO_DE_AGUA("");
    setKg_CAFÉ_CEREZA_AÑO_ANTER("");
  };

  const getCollection = async () => {
    const q = query(
      collection(db, "finca"),
      // where("CEDULA", "!=", null),
      orderBy("fecha_creacion", "asc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      let obj = {
        FECHA_DE_NACIMIENTO: doc.data().FECHA_DE_NACIMIENTO,
        MUNICIPIO: doc.data().MUNICIPIO,
        ESTADO_CIVIL: doc.data().ESTADO_CIVIL,
        ESCOLARIDAD: doc.data().ESCOLARIDAD,
        CEDULA_CAFETERA: doc.data().CEDULA_CAFETERA,
        HA_TOTAL_DE_LA_FINCA: doc.data().HA_TOTAL_DE_LA_FINCA,
        MSNM: doc.data().MSNM,
        FUENTES_HIDRICAS: doc.data().FUENTES_HIDRICAS,
        AREA_EN_BOSQUE: doc.data().AREA_EN_BOSQUE,
        BENEFICIO: doc.data().BENEFICIO,
        TRATAMIENTO_DE_AGUA: doc.data().TRATAMIENTO_DE_AGUA,
        Kg_CAFÉ_CEREZA_AÑO_ANTER: doc.data().Kg_CAFÉ_CEREZA_AÑO_ANTER,

        fecha_creacion: doc.data().fecha_creacion,
        id: doc.id,
      };
      // console.log(obj.id);

      setData((prevState) => [obj, ...prevState]);
    });

    // console.log(data);
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
      await deleteDoc(doc(db, "finca", id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
    console.log(data);
    removeColor(id);

    console.log(data);
  };

  return (
    <div style={{ width: "100% !important" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <span
          style={{
            fontFamily: "Newake",
            fontSize: "calc(26px + 1vmin)",
          }}
        >
          Fincas
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
              backgroundColor: "IndianRed",
              // padding: "7px",
              // maxWidth: "50%",
              // backgroundColor: "#f2aa4cff",

              // float: "red",
            }
          }
          className="float-child create"
        >
          <div style={{ padding: "10px" }}>
            <div className="label">FECHA DE NACIMIENTO</div>
            <input onChange={oneUpdater} value={FECHA_DE_NACIMIENTO} />

            <div className="label">MUNICIPIO</div>
            <input onChange={twoUpdater} value={MUNICIPIO} />

            <div className="label">ESTADO CIVIL:</div>
            <input onChange={threeUpdater} value={ESTADO_CIVIL} />

            <div className="label">ESCOLARIDAD</div>
            <input onChange={fourUpdater} value={ESCOLARIDAD} />

            <div className="label">CEDULA CAFETERA</div>
            <input onChange={fiveUpdater} value={CEDULA_CAFETERA} />

            <div className="label">HA TOTAL DE LA FINCA</div>
            <input onChange={sixUpdater} value={HA_TOTAL_DE_LA_FINCA} />

            <div className="label">MSNM</div>
            <input onChange={sevenUpdater} value={MSNM} />

            <div className="label">FUENTES HIDRICAS</div>
            <input onChange={eightUpdater} value={FUENTES_HIDRICAS} />

            <div className="label">AREA EN BOSQUE</div>
            <input onChange={nineUpdater} value={AREA_EN_BOSQUE} />

            <div className="label">AREA EN EROSIÓN</div>
            <input onChange={tenUpdater} value={AREA_EN_EROSIÓN} />

            <div className="label">BENEFICIO:</div>
            <input onChange={elevenUpdater} value={BENEFICIO} />

            <div className="label">TRATAMIENTO DE AGUA</div>
            <input onChange={twelveUpdater} value={TRATAMIENTO_DE_AGUA} />

            <div className="label">Kg CAFÉ CEREZA AÑO ANTER</div>
            <input
              onChange={thirteenUpdater}
              value={Kg_CAFÉ_CEREZA_AÑO_ANTER}
            />

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
          className="float-child query finca"
          style={{
            // width: "50%",
            // backgroundColor: "aqua",
            // height: "200px",
            maxHeight: "600px",
            overflow: "auto",
          }}
        >
          {/* Entradas */}
          {data.map((obj) => (
            <React.Fragment>
              <div style={{ width: "100%", textAlign: "right" }}>
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
                FECHA DE NACIMIENTO: {obj.FECHA_DE_NACIMIENTO}
                <br />
                MUNICIPIO: {obj.MUNICIPIO}
                <br />
                ESTADO CIVIL: {obj.ESTADO_CIVIL}
                <br />
                ESCOLARIDAD: {obj.ESCOLARIDAD}
                <br />
                CEDULA CAFETERA: {obj.CEDULA_CAFETERA}
                <br />
                HA TOTAL DE LA FINCA: {obj.HA_TOTAL_DE_LA_FINCA}
                <br />
                MSNM: {obj.MSNM}
                <br />
                FUENTES HIDRICAS: {obj.FUENTES_HIDRICAS}
                <br />
                AREA EN BOSQUE: {obj.AREA_EN_BOSQUE}
                <br />
                AREA EN EROSIÓN: {obj.AREA_EN_EROSIÓN}
                <br />
                BENEFICIO: {obj.BENEFICIO}
                <br />
                TRATAMIENTO DE AGUA: {obj.TRATAMIENTO_DE_AGUA}
                <br />
                Kg CAFÉ CEREZA AÑO ANTER: {obj.Kg_CAFÉ_CEREZA_AÑO_ANTER}
                <br />
                Fecha Creada: {obj.fecha_creacion.toDate().toDateString()}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Finca;
