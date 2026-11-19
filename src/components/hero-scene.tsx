"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Scene=dynamic(()=>import("./scene"),{ssr:false});
export default function HeroScene(){const [enabled,setEnabled]=useState(false); useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)"); const canvas=document.createElement("canvas"); const timer = window.setTimeout(() => setEnabled(!media.matches && !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))), 0); return () => window.clearTimeout(timer);},[]);return <div className="scene" aria-hidden="true">{enabled ? <Scene/> : <div className="fallback">&lt; / &gt;</div>}</div>}
