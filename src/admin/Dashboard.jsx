import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import '../style/Dashboard.css'
import useGetData from '../custom-hooks/useGetData'

const Dashboard = () => {

  const {data: products} = useGetData('product')
  const {data: users} = useGetData('product')

  return (

    <Helmet title="Dashboard">

    <section>
      <Container>
        <Row>
          <Col className="lg-3">
          <div className="revenue__box">
              <h5>Totals Sale</h5>
              <span>$7890</span>
            </div>
          </Col>
          <Col className="lg-3">
          <div className="order__box">
              <h5>Orders</h5>
              <span>789</span>
            </div>
          </Col>
          <Col className="lg-3">
          <div className="products__box">
              <h5>Totals Products</h5>
              <span>{products.length}</span>
            </div>
          </Col>
          <Col className="lg-3">
          <div className="users__box">
              <h5>Totals Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </Helmet>
  )
}

export default Dashboard
