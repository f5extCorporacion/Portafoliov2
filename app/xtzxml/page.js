"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiCollapseDiagonal2Fill, RiLockPasswordFill } from "react-icons/ri";
import Swal from "sweetalert2";

import { FaNodeJs } from "react-icons/fa";
import { IoAppsSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { IoLogoInstagram } from "react-icons/io5";
import { useCookies } from "react-cookie";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getServerCookie, LoginUser, validations } from "./Validaciones";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import "./../inicio.css";
import { FaPlaystation } from "react-icons/fa";
import { FaGlassMartiniAlt } from "react-icons/fa";
import { FaMagic } from "react-icons/fa";
import { linksPro } from "./proyectos";
import { auth } from "@/firebasedata";
import { FaReact } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { TiCss3 } from "react-icons/ti";
import { FaGamepad } from "react-icons/fa";
import { FaSquarePhoneFlip } from "react-icons/fa6";

const SignupSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, "Demasiado corto!")
    .max(50, "Demasiado largo!")
    .required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  telefono: Yup.string()
    .matches(/^[0-9]+$/, "Debe ser un número")
    .min(10, "Número muy corto")
    .max(15, "Número muy largo")
    .required("Requerido"),
  password: Yup.string()
    .min(8, "Debe tener al menos 8 caracteres")
    .required("Requerido"),
});

//Estado con zustand

const useStore = create(
  persist(
    (set, get) => ({
      sexcount: false,
      inc: () => set((state) => ({ sexcount: true })),
      desinc: () => set((state) => ({ sexcount: false })),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

//login

export const Login = () => {
  const [error, setError] = useState(null);
  const [contadorx, setContador] = useState(1);
  const { sexcount, inc, desinc } = useStore();

  const inicioxml = async (Valoreslogin) => {
    setError(null);
    try {
      const user = await LoginUser(Valoreslogin.email, Valoreslogin.password);
      console.log("Usuario logueado:", user);
      if (user) {
        //debemos recuperar usuario de otra manera
        inc();
      }
      // Redirigir o hacer algo después del login exitoso Millones2090*
    } catch (error) {
      //setError("Error al iniciar sesión: " + error.message);
      setError("Error al iniciar sesión: ");
      Swal.fire("Error en Email o password!");
      const myTimeout = setTimeout(myGreeting, 3000);
    }

    /*REset a la misma web */
    function myGreeting() {
      window.location.href = "/xtzxml";
    }
  };
  //Numero aleatorio
  function generarNumeroAleatorio() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  //send Email
  const resetcontrasenapass = async () => {
    const Code = generarNumeroAleatorio();
    //pasos
    /*
1-se pide email para enviar Codigo
2-se pide codigo enviado a correo
3-se valida si el codigo es igual
4-se envia a actualizar password

*/
    //paso 1
    const { value: email } = await Swal.fire({
      title: "Digita tu email",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    //paso 2

    if (email) {
      /*REset a la misma web */
      function myGreeti() {
        window.location.href = "/xtzxml";
      }
      await sendPasswordResetEmail(auth, email)
        .then((de) => {
          Swal.fire("Link enviado a  tu correo");
          setTimeout(myGreeti, 2000);
        })
        .catch((error) => {
          Swal.fire(
            ` Mira tu correo si no llega link en 5 min revisa tu correo y repetir proceso`
          );
          setTimeout(myGreeti, 2000);
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          inicioxml(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="formuniversal">
            <p>
              {" "}
              <span>
                {" "}
                <MdEmail />{" "}
              </span>
              <span> Email </span>
            </p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="text-slate-600"
            />
            {errors.email && touched.email && errors.email}
            <p>
              {" "}
              <span>
                {" "}
                <RiLockPasswordFill />
              </span>
              <span> password </span>
            </p>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="text-slate-600"
            />
            {errors.password && touched.password && errors.password}
            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
            >
              Login
            </button>
          </form>
        )}
      </Formik>
      {error && <p>{error}</p>}
      <div className="reset flex">
        <button className="resetpasswordt flex" onClick={resetcontrasenapass}>
          {" "}
          <span className="flex">
            Restablece contraseña _{" "}
            <p className="flex text-amber-600"> Click</p>{" "}
          </span>
        </button>
      </div>
    </>
  );
};

//registro
//infinity = mlycaomevnfnanbp
export const Registro = () => {
  async function myGreeting(formData) {
    try {
      // Method to send email
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      //const data = await response.json();

      // Log the response data

      if (response.ok) {
        // If the email is sent successfully, redirect
        window.location.href = "/xtzxml";
      } else {
        console.log("Failed to send the email");
      }
    } catch (error) {
    } finally {
      console.log("Email process completed");
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          telefono: "",
          password: "",
          state: true,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          // Manejo de envío del formulario
          //validacion de usuario
          const repOk = await validations(values).then((de) => {
            if (de) {
              Swal.fire(`Creado Te envie un correo datos login`);
              return true;
              // 2000 ms = 2 segundos
            } else {
              Swal.fire(`Ya existe`);
            }
          });

          if (repOk) {
            setTimeout(myGreeting(values), 1000);
          } else {
            console.log("Error");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="formuniversal">
            <div className="flex flex-col">
              <label htmlFor="nombre">Nombre</label>
              <Field name="nombre" type="text" className="text-slate-600" />
              <ErrorMessage name="nombre" component="div" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="text-slate-600" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="telefono">Teléfono</label>
              <Field name="telefono" type="text" className="text-slate-600" />
              <ErrorMessage name="telefono" component="div" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Contraseña</label>
              <Field
                name="password"
                type="password"
                className="text-slate-600"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <br />
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
            >
              Registrarse
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const Unifcado = () => {
  const [authx, setAuthx] = useState(true);

  return (
    <>
      <ul className=" flex">
        <li className="flex gap-4 border-b-4 border-slate-400  p-4 rounded-sm">
          <button
            onClick={() => setAuthx(true)}
            className="hover:bg-cyan-600 p-3 rounded-xl"
          >
            {" "}
            Login{" "}
          </button>

          <button
            onClick={() => setAuthx(false)}
            className="hover:bg-cyan-600 p-3 rounded-xl"
          >
            {" "}
            Registro{" "}
          </button>
        </li>
      </ul>
      {authx ? <Login /> : <Registro />}
    </>
  );
};

export const DasboarthInico = () => {
  const { sexcount, inc, desinc } = useStore();
  const [cmenu, setCmen] = useState("false");
  const closesession = () => {
    console.log("hola delete");
  };

  const contacto = () => {
    Swal.fire(` Franklim de jesus valverde <br/>
      Cel: +57 302 213 03 74 <br/>
      Email: f5extuniversal@gmail.com<br/> Cali colombia.
      `);
  };

  const Portafolio = (
    <div className="portafolioData ">
      {linksPro.map((proy) => (
        <div
          className="cardItems  border border-blue-400 rounded-lg"
          key={proy}
        >
          <a href={proy.link} target="_blank" rel="noopener noreferrer">
            <div className="imgBx ">
              <img
                src={proy.img}
                width={200}
                height={200}
                alt="Picture of the author"
                className="picture"
              />
            </div>
            <div className="content">
              <h3>{proy.name}</h3>
              <p>{proy.detalle} </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
  return (
    <main className="flex min-h-screen flex-col items-center todo ">
      <section className={` sectionx bannerx ${cmenu ? "" : "active"}`}>
        <header>
          <a href="#" className="logo">
            {" "}
            Infi<span>nity</span>
          </a>

          <div className="toggle">
            {cmenu ? (
              <button className="mr" onClick={() => setCmen(false)}>
                <IoAppsSharp className="io" />
              </button>
            ) : (
              <button className="mr" onClick={() => setCmen(true)}>
                <IoCloseSharp className="io" />
              </button>
            )}
          </div>
        </header>
        <ul className={`menu ${cmenu ? "" : "active"}`}>
          <li>
            {" "}
            <a href="/"> Home</a>{" "}
          </li>
          <li>
            {" "}
            <a href="/xtzxml"> Portafolio</a>{" "}
          </li>
          <li>
            {" "}
            <a onClick={desinc}> Cerrar Session </a>{" "}
          </li>
        </ul>

        {/* Contenido de la pagina web .*/}
        <div className="contenidoApp  ">
          <div className="portafolioPerfil">
            <h2>PORTAFOLIO</h2>
            <p>
              Cordial saludo soy <span> FRANKLIM DE JESUS MUÑOZ VALVERDE</span>{" "}
              apasionado por la tecnologia aplicando nuevas tecnicas en el
              software desarrollador <span>FULLSTACK</span> y estudiante de
              <span> INGENIERIA INFORMATICA</span> enfocado en desarrollo{" "}
              <span>PERN, MERN , JAVA ,</span> otros.
              <ul>
                <li>
                  <FaNodeJs className="mp" />
                </li>

                <li>
                  <SiMysql className="mp" />
                </li>
                <li>
                  <SiNextdotjs className="mp" />
                </li>
                <li>
                  <RiTailwindCssFill className="mp" />
                </li>
                <li>
                  <TiCss3 className="mp" />
                </li>
              </ul>
            </p>
            <ul className="p-1">
              <li>
                <a
                  href="https://poki.com/es"
                  className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
                >
                  <FaGamepad className="mp" />
                  <p>Juegos</p>
                </a>
              </li>
              <li>
                <a
                  onClick={contacto}
                  className="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 focus:outline-none focus:ring focus:ring-violet-300 ..."
                >
                  <FaSquarePhoneFlip className="mp" />
                  <p>Contacto</p>
                </a>{" "}
              </li>
            </ul>

            <div className="portafoliorep">{Portafolio}</div>
          </div>
        </div>
      </section>
      <div className="footer">
        <p>Todos los derechos reservados creado 2024 </p>
      </div>
    </main>
  );
};

export default function Xtzxml() {
  const [cookiesmr, setCookie] = useCookies(["arizona200"]);
  const [authprint, setAuthprint] = useState(cookiesmr);
  const { sexcount, inc, desinc } = useStore();
  useEffect(() => {
    getServerCookie();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-17 text-slate-100">
      {/*sexcount ? `session estado ${sexcount}` : `session estado ${sexcount}`*/}

      {/* <button onClick={inc}>Open session</button>*/}
      {sexcount ? <DasboarthInico /> : <Unifcado />}
    </main>
  );
}
