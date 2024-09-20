/*"use client";
import { useParams } from "next/navigation";*/

export default function Prmt({ params }) {
  /* const params = useParams();
  return <h1>Post {params.id}</h1>;*/
  const { data } = params;
  return <>parametro link : {data}</>;
}
