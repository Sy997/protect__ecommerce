import React, {useRef, useEffect} from 'react'
import "./header.css"
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import logo from '../../assets/images/eco-logo.png'
import user_icon from "../../assets/images/user-icon.png"
import {motion} from "framer-motion"
import { useSelector } from "react-redux"
import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { toast } from 'react-toastify'

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: '/cart',
        display: 'Cart'
    },
]

const Header = () => {

    const {currentUser} = useAuth()

    const headerRe = useRef(null)
    const totalQuantity = useSelector(state => state.cart.totalQuality)
    const profileActionsRef = useRef(null)

    const menuRef = useRef(null)

    const navigate = useNavigate()

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', ()=> {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRe.current.classList.add("sticky__header")
            }
            else {
               headerRe.current.classList.remove("sticky__header")
            }
        })
    }
    const logout = () => {
        signOut(auth).then(() => {
            toast.success("Đăng xuất thành công")
            navigate('/home')
        })
    }
    useEffect(() => {
        stickyHeaderFunc()

        return () => window.removeEventListener("scroll", stickyHeaderFunc)
    })

    const menuToggle = () => {
        menuRef.current.classList.toggle('active__menu')
    }

    const navigateToCart = () => {
        navigate('/cart')
    }

    const toggleProfileActions = () => {
        document.getElementsByClassName('profile__actions').display = 'block'
    }

  return <header className="header">
    <Container>
        <Row>
            <div className="nav__wrapper" ref={headerRe}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <div>
                        <h1>Store</h1>
                    </div>
                </div>
                <div className="navigation" ref={menuRef} onClick={menuToggle}>
                    <ul className="menu">
                        {/* <li className="nav__item">
                            <a href="/">Home</a>
                        </li>
                        <li className="nav__item">
                            <a href="/shop">Shop</a>
                        </li>
                        <li className="nav__item">
                            <a href="/cart">Cart</a>
                        </li> */}
                        {
                            nav__links.map((item, index) => (
                                <li key={index} className={(navClass) => 
                                    navClass.isActive ? 'nav__active' : ''
                                }>
                                <NavLink to={item.path}>{item.display}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="nav__icons">
                    <span className='fav__icon'>
                        <i className='ri-heart-line'></i>
                        <span className='badge'>1</span>
                    </span>
                    <motion.span whileTap={{scale: 1.3}} className="cart__icon" onClick={navigateToCart}>
                        <i className='ri-shopping-bag-line'></i>
                        <span className='badge'>{totalQuantity}</span>
                    </motion.span>
                    <div className='profile'>
                        <span><motion.img whileTap={{scale: 1.3}} src={currentUser? currentUser.photoURL : user_icon} alt="" onClick={toggleProfileActions}/></span>
                        {/* <p>{currentUser.displayName}</p> */}
                        <div className='profile__actions' ref={profileActionsRef} onClick={toggleProfileActions}>
                            {
                                currentUser? <span onClick={logout}>Đăng xuất</span> : <div className='d-flex al
                                 justify-content-center flex-column'>
                                    <Link to='/signup'>Đăng kí</Link>
                                    <Link to='/login'>Đăng nhập</Link>
                                    <Link to='/dashboard'>Dashboard</Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mobile__menu">
                        <span onClick={menuToggle}>
                            <i className='ri-menu-line'></i>
                        </span>
                    </div>
                </div>               
            </div>
        </Row>
    </Container>
  </header>
}

export default Header
