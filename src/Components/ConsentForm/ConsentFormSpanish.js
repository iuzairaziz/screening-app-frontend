import React, { useState, useEffect } from "react";
import "./ConsentForm.scss";
import { Formik } from "formik";
import userServices from "../../services/userService";
import Logo from "../../images/logo.png";
import { useHistory, Link, useLocation } from "react-router-dom";
import shortValidation from "../../validations/shortValidations";
import InputList from "../DynamicInputField/InputList";

const ConsentFormSpanish = (props) => {
  const history = useHistory();
  const [familyDetails, setFamilyDetails] = useState([
    {
      index: Math.random(),
      familyMembers: "",
    },
  ]);

  const [consent, setConsent] = useState();

  let userId =
    props.match.params && props.match.params.userId
      ? props.match.params.userId
      : null;
  let lastName =
    props.match.params && props.match.params.lastName
      ? props.match.params.lastName
      : null;
  let firstName =
    props.match.params && props.match.params.firstName
      ? props.match.params.firstName
      : null;
  let email =
    props.match.params && props.match.params.email
      ? props.match.params.email
      : null;
  return (
    // <div className={`${props.state === true ? "col-10" : "col-8"}`}>
    <div class="container consent-form">
      <div class="row d-flex justify-content-center">
        <div class="col-md-6 logo">
          <img src={Logo} height="110" width="300" alt="logo" />
        </div>
      </div>
      <div className="row bt-set">
        <div className="col bt-sett">
          <div class="btn-group mr-2">
            <Link
              to={
                userId
                  ? `/consentform/${userId}/${firstName}/${lastName}/${email}`
                  : `/consentform`
              }
            >
              <a
                // href={`/consentform/${userId}/${firstName}/${lastName}/${email}`}
                class="btn btn-primary btc"
              >
                English
              </a>
            </Link>
            <a href="#" class="btn btn-primary active" aria-current="page">
              Spanish
            </a>
          </div>
        </div>
      </div>

      <div class="row gappp">
        <p>
          Al presionar aceptar debajo, usted brinda su consentimiento a RMHCSD
          para utiliazr la información que provee por medio de esta aplicación
          automática, con motivo de monitorear la salud de todos los individuos
          como se indica en los requerimientos de reporte sobre el virus
          Covid-19. Gracias por ayudarnos a mantener nuestros edificios a salvo.
          Por favor revise su plan de datos/wifi por posibles costos asi como
          tambien sus derechos en |
          <a href="https://www.oag.ca.gov/privacy/ccpa" target="_blank">
            California Consumer Privacy Act (CCPA) State of California -
            Department of Justice - Office of the Attorney General
          </a>
        </p>
        <p>
          Información adicional sobre privacidad:
          <a href="https://safebusinesssolutions.com/" target="_blank">
            {" "}
            Privacy Policy | Safe Business Solutions Thru Customer Service.
          </a>
        </p>
      </div>

      <Formik
        initialValues={{
          firstName: props.match.params ? props.match.params.firstName : "",
          lastName: props.match.params ? props.match.params.lastName : "",
          email: props.match.params ? props.match.params.email : "",
          familyMembers: "",
          recieveEmail: "",
        }}
        validationSchema={shortValidation.newConsentFormValidation}
        onSubmit={(values, actions) => {
          console.log("Valuessss", values);
          userServices
            .addUser({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              recieveEmail: consent === true ? "Yes" : "No",
              userId: userId,
              familyMembers: familyDetails,
            })
            .then((res) => {
              history.push("/greeting");
              userServices.handleCustomMessage("Registration Successful");
              console.log("values.recieveEmail", values.recieveEmail);
            });
          console.log("values.recieveEmail", values.recieveEmail);
        }}
      >
        {(props) => {
          return (
            <div class="card-gap">
              <div class="card card-sty">
                <div class="card-body">
                  <div class="mb-3 row">
                    <label
                      for="staticEmail"
                      class="col-sm-2 col-form-label"
                      style={{ textAlign: "initial" }}
                    >
                      Apellido
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="lastName"
                        className="form-control"
                        id="staticEmail"
                        placeholder="introduzca su apellido"
                        value={props.values.lastName}
                        onChange={props.handleChange("lastName")}
                      />
                      <span id="err" className="invalid-feedback require">
                        {props.touched.lastName && props.errors.lastName}
                      </span>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="staticEmail"
                      class="col-sm-2 col-form-label"
                      style={{ textAlign: "initial" }}
                    >
                      Primer Nombre
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="firstName"
                        className="form-control"
                        id="staticEmail"
                        placeholder="introduzca su nombre de pila"
                        value={props.values.firstName}
                        onChange={props.handleChange("firstName")}
                      />
                      <span id="err" className="invalid-feedback require">
                        {props.touched.firstName && props.errors.firstName}
                      </span>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label
                      for="staticEmail"
                      class="col-sm-2 col-form-label"
                      style={{ textAlign: "initial" }}
                    >
                      Correo Electronico
                    </label>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        onBlur={props.handleBlur}
                        name="email"
                        className="form-control"
                        id="staticEmail"
                        placeholder="por favor, introduzca el correo electrónico"
                        value={props.values.email}
                        onChange={props.handleChange("email")}
                      />
                      <span id="err" className="invalid-feedback require">
                        {props.touched.email && props.errors.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row"></div>
              <div class="card col-12 add-fam">
                <span className="mb-2">
                  <b>Miembros de la familia</b>
                </span>
                <div class="input-group mb-3">
                  <InputList
                    setFamilyDetails={setFamilyDetails}
                    familyDetails={familyDetails}
                    // editable={editable}
                  />
                  {/* <input
                    type="text"
                    class="form-control"
                    placeholder="Apellido, nombre de pila"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  /> */}
                  {/* <button
                    class="btn btn-success"
                    type="button"
                    id="button-addon2"
                  >
                    Agregar
                  </button> */}
                </div>
              </div>

              <div class="col d-flex justify-content-center mt-3 safari">
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  onClick={() => {
                    setConsent(true);
                    props.handleSubmit();
                    console.log("consent", consent);
                  }}
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-lg reject-bt"
                  onClick={() => {
                    setConsent(false);
                    props.handleSubmit();
                    console.log("consent F", consent);
                  }}
                >
                  Rechazar
                </button>
              </div>
            </div>
          );
        }}
      </Formik>
      <div class="row gappp">
        <input
          class="form-control warn"
          type="text"
          value="Para no participar, no acepte ni provee ninguna información personal"
          aria-label="readonly input example"
          readonly="true"
        />
      </div>
    </div>
    // </div>
  );
};

export default ConsentFormSpanish;
