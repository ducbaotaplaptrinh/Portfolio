"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useState, type ReactNode } from "react";
const Scene=dynamic(()=>import("./scene"),{ssr:false,loading:()=> <Fallback/>});
function Fallback(){return <div className="workstation-fallback" role="img" aria-label="Hình workstation với laptop và màn hình mã nguồn"/>;}
class SceneError extends Component<{children:ReactNode},{failed:boolean}> { state={failed:false}; static getDerivedStateFromError(){return {failed:true};} render(){return this.state.failed ? <Fallback/> : this.props.children;} }
export default function HeroScene({quality="auto",motion=true}:{quality?:"auto"|"low"|"high";motion?:boolean}){
 const [enabled,setEnabled]=useState(false);
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)"); const update=()=>{const c=document.createElement("canvas"); let supported=false;try{supported=!!(c.getContext("webgl2")||c.getContext("webgl"));}catch{} setEnabled(!media.matches && supported);}; const timer=window.setTimeout(update,0);media.addEventListener("change",update);return ()=>{window.clearTimeout(timer);media.removeEventListener("change",update)}},[]);
 return <div className={motion ? "scene" : "scene scene--still"} aria-hidden="true">{enabled ? <SceneError><Scene quality={quality} motion={motion}/></SceneError> : <Fallback/>}</div>;
}
