import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./views/Home"
import Auth from "./views/Auth"
import s from './store/store'
import { observer } from "mobx-react-lite"
import { useEffect } from "react"

export default observer(():JSX.Element=>{
  const interfaceStore = s.interfaceStore
  
  useEffect(()=>{
    const theme=interfaceStore.theme
    document.querySelector('body')?.classList.remove((theme=='dark'?'light':'dark')+'-theme')
    document.querySelector('body')?.classList.add((theme=='dark'?'dark':'light')+'-theme')
  },[interfaceStore.theme])

  return  <Router>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/auth/:type" element={<Auth/>}/>
            </Routes>
          </Router>
  })