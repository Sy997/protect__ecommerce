import React from 'react'
import { useState, useEffect
 } from 'react'
import Helmet from "../components/Helmet/Helmet"
import { Container, Row, Col } from 'reactstrap'
import hereImg from "../assets/images/hero-img.png"
import Clock from '../components/UI/Clock'
import products from "../assets/data/products"
import Service from '../services/Service'
import "../style/home.css"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import counterImg from '../assets/images/counter-timer-img.png'
import useGetData from '../custom-hooks/useGetData'

const Home = () => {

  const {data: products, loading} = useGetData('product')

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setbestSalesProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  const year = new Date().getFullYear()

  useEffect(() => {
    const filterdProducts = products.filter((item) => 
      item.category === "chair"
    );
    const filteredBestSalesProducts = products.filter((item) => item.category === "sofa")

    const filteredMobileProducts = products.filter((item) => item.category === "mobile")

    const filteredPopularProducts = products.filter((item) => item.category === "watch")

    const filteredWirelessProducts = products.filter((item) => item.category === "wireless")
    setTrendingProducts(filterdProducts)
    setbestSalesProducts(filteredBestSalesProducts)
    setMobileProducts(filteredMobileProducts)
    setWirelessProducts(filteredWirelessProducts)
    setPopularProducts(filteredPopularProducts)
  }, [products])
  return <Helmet title={"Home"}>
    <section className="hero__section">
      <Container>
        <Row>
          <Col>
          <div className='hero__content'>
            <p className="hero__subtitle">Trending product in {year}</p>
            <h2>Make Your Interior More Minimalistic and Modern</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi eveniet, obcaecati ab reiciendis quos quod enim! At, repellendus optio!</p>
            <motion.button whileTap={{ scale
            : 1.2 }} className="buy__button">
              <Link to='/shop'>SHOP NOW</Link>
            </motion.button>
          </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={hereImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <Service />

    <section className='trending__products'>
      <Container>
        <Row>
          <Col lg="12" className='text-center'>
            <h2 className='section__title'>
              Trending Products
            </h2>
          </Col>
          {
            loading ? <h4 className='fw-bold'>Loading....</h4> : 
            <ProductList data={trendingProducts} />
          }
        </Row>
      </Container>
    </section>
    <section className='best__sales'>
    <Container>
        <Row>
          <Col lg="12" className='text-center'>
            <h2 className='section__title'>
              Best Sales
            </h2>
          </Col>
          {
            loading ? <h4 className='fw-bold'>Loading....</h4> : 
            <ProductList data={bestSalesProducts} />
          }
          
        </Row>
      </Container>
    </section>
    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>
            <div className='clock__top-content'>
              <h4 className="text-white fs-6 mb-2">Khuyến mãi có hạn</h4>
              <h3 className="text-white fs-5 mb-3">Chất lượng tốt nhất</h3>
            </div>
            <Clock />

            <motion.button whileTap={{scale: 1.1}} className='buy__button store__btn'>
              <Link to="/shop">Visit Store</Link>
            </motion.button>
          </Col>
          <Col lg='6' md='12' className="text-end counter__img">
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>New Arrivals</h2>
          </Col>
          {
            loading ? <h4 className='fw-bold'>Loading....</h4> : 
            <ProductList data={mobileProducts} />
          }
          
          {
            loading ? <h4 className='fw-bold'>Loading....</h4> : 
            <ProductList data={wirelessProducts} />
          }
          
        </Row>
      </Container>
    </section>
    <section className='popular__category'>
      <Container>
        <Row>
          <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Popular in Category</h2>
          </Col>
          {
            loading ? <h4 className='fw-bold'>Loading....</h4> : 
            <ProductList data={popularProducts} />
          }
          <ProductList data={popularProducts} />
          
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Home
