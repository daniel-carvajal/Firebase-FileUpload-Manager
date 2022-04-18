import React, { useContext } from "react";
// import AgricultorForm from "../components/AgricultorForm";
import { useParams, useLocation } from "react-router-dom";

import BooksContext from "../../context/BooksContext";

import CaseForm from "../../components/CaseForm";

const EditCase = () => {
  let params = useParams();
  // let location = useLocation();


  return (
    <div>
      <div style={{ textAlign: "center" }}>Editing: {params.id}</div>
      <CaseForm id={params.id} />
      </div>
  );
};

export default EditCase;
