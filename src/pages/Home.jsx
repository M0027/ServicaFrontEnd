import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import MaisSOlicitados from '../components/MaisSolicitados'
import Depoimentos from '../components/Depoimentos'
import ComoFuncioma from '../components/comoFunciona/ComoFunicona'
import { useEffect, useState } from 'react'


export default function Home() {
  


  return (
    <div>

      <Hero/>

      <MaisSOlicitados/>

      <Depoimentos/>

      <ComoFuncioma/>
      
    </div>
  );
}