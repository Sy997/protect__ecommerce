import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useAuth from '../custom-hooks/useAuth'
import "../style/admin-nav.css"
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const AdminNav = () => {

    const admin__nav = [
        {
            display: "Dashboard",
            path: '/dashboard'
        },
        {
            display: 'All-Product',
            path: '/dashboard/all-products'
        },
        {
            display: 'Orders',
            path: '/dashboard/orders'
        },
        {
            display: 'Users',
            path: '/dashboard/users'
        },
    ]

    const {currentUser} = useAuth()
  return (
  <>
  <header className='admin__header'>
    <div className="admin__nav-top">
        <Container>
            <div className='admin__nav-wrapper-top'>
                <div className="logo">
                    <h2>Store</h2>
                </div>

                <div className="search__box">
                    <input type="text" placeholder='Search.....' />
                    <span><i class="ri-search-line"></i></span>
                </div>
                <div className="admin__nav-top-right">
                    <span>
                        <i className='ri-notification-3-line'></i>
                    </span>
                    <span><i className='ri-settings-2-line'></i></span>
                    <motion.img whitap={{scale: 1.3}} src={currentUser && currentUser.photoURL} alt='' />
                </div>
            </div>
        </Container>
    </div>
  </header>

    <section className='admin__menu p-0'>
        <Container>
            <Row>
                <div className='admin__navigation'>
                    <ul className="admin__menu-list">
                        {
                            admin__nav.map((item, index) => (
                                <li key={index} className="admin__menu-item">
                                <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__admin-menu' : ''}>{item.display}</NavLink>
                                </li>
                        ))
                        }
                    </ul>
                </div>
            </Row>
        </Container>
    </section>

  </>
  )
}

export default AdminNav
