"use server";
import { db, auth } from "@/firebasedata";
import jwt from "jsonwebtoken";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import nodemailer from "nodemailer";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

import { headers, cookies } from "next/headers";

const palabraSecret = "Eluniversoesmifortalezaymedaratodoloquedeseo";
//validar si existe usuario
export const validations = async (valores) => {
  //juntamos la conexion con la tabla Users
  const citiesRef = collection(db, "Users");
  // Validamos si exite el correo que desea registrarse
  const q = query(citiesRef, where("email", "==", valores.email));
  const querySnapshot = await getDocs(q);
  //retornamos si false= cancela guardado | true= se envia a guardar
  if (!querySnapshot.empty) {
    return false;
  } else {
    //si el usuario no existe crea el valor
    await CreateUser(valores);
    return true;
  }
};

//Crear usuario

export const CreateUser = async (EntradaSi) => {
  /*
   * FUNCIONAMIENTO
   *Creacion en collection Users
   *Creacion en Email y password
   */
  await addDoc(collection(db, "Users"), EntradaSi);
  //guarda datos en auth
  await createUserWithEmailAndPassword(
    auth,
    EntradaSi.email,
    EntradaSi.password
  );
  return true;
};
//login de usuario

export const LoginUser = async (emailx, passwordx) => {
  console.log(`${emailx} ,${passwordx}`);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      emailx,
      passwordx
    );
    console.log(userCredential.user);
    //Creacion del token
    const token = jwt.sign(
      userCredential.user.email, // Los datos que quieres incluir en el payload
      palabraSecret // Una clave secreta para firmar el token
    );
    CreateCookie(token);

    return userCredential.user.providerData;
  } catch (error) {
    throw error;
  }
};

export const CreateCookie = (token) => {
  const cookiesSession = cookies();
  cookiesSession.set("arizona200", JSON.stringify({ token }));
};
//consulta Get
export async function getServerCookie() {
  const cookiesSession = cookies();
  const cookieValue = cookiesSession.get("arizona200");

  if (cookieValue) {
    const { token } = JSON.parse(cookieValue.value);
    console.log("Token leído desde la cookie:", token);
    return {
      props: { token },
    };
  }

  return {
    props: null,
  };
}
