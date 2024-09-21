"use client";
//Actualizacion del codigo
import React, { useState } from "react";
import { IoAppsSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { IoLogoInstagram } from "react-icons/io5";
import { SiChemex } from "react-icons/si";
import { Perfil } from "./Perfil";
import "./inicio.css";
<<<<<<< HEAD
import Image from "next/image";
=======
import Image from 'next/image'
>>>>>>> d6fdafccc5a5e0adb20732a0aa3cf3d7016706f0
export default function Home() {
  const [cmenu, setCmen] = useState("false");

  return (
    <main className="flex min-h-screen ">
      <section className={`banner ${cmenu ? "" : "active"}`}>
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
<<<<<<< HEAD
        <Image
          src="/promotor.png"
          width={300}
          height={500}
          alt="Picture of the author"
          className=" men"
        />
=======
<Image
      src="/promotor.png"
      width={200}
      height={300}
      alt="Picture of the author"
      className=" men"
    />
       
>>>>>>> d6fdafccc5a5e0adb20732a0aa3cf3d7016706f0

        <div className="content">
          <div className="contentBx">
            <h4>{Perfil[0].saludo}</h4>
            <h2> {Perfil[0].nombre}</h2>
            <h3>{Perfil[0].titulo}</h3>
            <p> {Perfil[0].descript}</p>
            <span className="link">
              <a href="/xtzxml">Portafolio</a>
              <a href="/xtzxml">Login</a>
            </span>
          </div>
          <ul className="sci">
            <li>
              {" "}
              <a
                href="https://www.instagram.com/franlimvalverde?igsh=ZGUzMzM3NWJiOQ=="
                target="_blank"
              >
                {" "}
                <IoLogoInstagram className="io" />
              </a>{" "}
            </li>
            <li>
              {" "}
              <a
                href="https://x.com/f5publicaciones?t=LAYTrTe-qtokTo8-A9Gj6Q&s=09"
                target="_blank"
              >
                <SiChemex className="io" />{" "}
              </a>{" "}
            </li>
          </ul>
        </div>

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
            <a href="/xtzxml"> Login </a>{" "}
          </li>
        </ul>
      </section>
    </main>
  );
}
