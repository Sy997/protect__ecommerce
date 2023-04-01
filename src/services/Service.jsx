import React from 'react'
import "./service.css"
import { motion } from 'framer-motion'
import { Container, Row, Col } from 'reactstrap'
import serviceData from "../assets/data/serviceData"

const Service = () => {
  return <section className='services'>
    <Container>
        <Row>
            {serviceData.map((item, index) => (
                <Col lg="3" md="4" key={index}>
                <motion.div whileHover={{scale
                : 1.1}} className="service__item" style={{ background: `${item.bg}` }}>
                    <span><i class={item.icon}></i></span>
                    <div>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                    </div>
                </motion.div>
            </Col>
            ))}
            {/* <Col lg="4" md="5">
                <div className="service__item">
                    <span><i class="ri-truck-line"></i></span>
                    <div>
                        <h3>Free Shipping</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </div>
                </div>
            </Col> */}
        </Row>
    </Container>
  </section>
}

export default Service
