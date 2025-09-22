import React, { useState } from 'react'
import SideMenu from '../components/SideMenu'
import Content from './Content';
const Client = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="client-container">
      <SideMenu activePage={activePage} setActivePage={setActivePage} />
      <Content activePage={activePage} />
    </div>
  )
}

export default Client
