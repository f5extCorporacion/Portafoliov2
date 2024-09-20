/*"use client";
import { useParams } from "next/navigation";*/

export default function Parametrosssx({ params }) {
  /* const params = useParams();
  return <h1>Post {params.id}</h1>;*/
  const { id } = params;
  return <>parametro link : {id}</>;
}
