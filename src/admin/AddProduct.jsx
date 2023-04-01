import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import {db, storage} from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'

const AddProduct = () => {

    const [enterTitle, setEnterTitle] = useState("")
    const [enterShortDesc, setEnterShortDesc] = useState("")
    const [enterDesciption, setEnterDescription] = useState("")
    const [enterCatagory, setEnterCatagory] = useState("")
    const [enterPrice, setEnterPrice] = useState("")
    const [enterProductImg, setEnterProductImg] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const addProduc = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const docRef = await collection(db, 'product')

            const storageRef  = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)

            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

            uploadTask.on(()=> {
                toast.error('Ảnh chưa được tải!!!')
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=> {
                    await addDoc(docRef, {
                        productName: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDesciption,
                        category: enterCatagory,
                        price: enterPrice,
                        imgURL: downloadURL
                    })
                })
                
            })
            toast.success("Thêm sản phẩm thành công!")
            navigate('/dashboard/all-products')
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            toast.error("Sản phẩm chưa được thêm!")
        }

    }
  return (
    <Helmet title="Dashboard">
        <section>
            <Container>
                <Row>
                <Col lg="12">
                    {
                        loading ? <h4 className='py-5'>Loading.....</h4> : <>
                            <h4 className='mb-4'>Add Product</h4>
                    <Form onSubmit={addProduc}>
                        <FormGroup className='form__group'>
                            <span>Product Title</span>
                            <input type="text" value={enterTitle} onChange={e=>setEnterTitle(e.target.value)} placehdolder='Double Sofa' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <span>Short Desciption</span>
                            <input type="text" value={enterShortDesc} onChange={e=>setEnterShortDesc(e.target.value)} placehdolder='Short Description....' />
                        </FormGroup>
                        <FormGroup className='form__group'>
                            <span>Desciption</span>
                            <input type="text" value={enterDesciption} onChange={e=>setEnterDescription(e.target.value)} placehdolder='Description....' />
                        </FormGroup>
                        <div className='d-flex align-items-center justify-content-between gap-5'>
                        <FormGroup className='form__group w-50'>
                            <span>Price</span>
                            <input type="number" value={enterPrice} onChange={e=>setEnterPrice(e.target.value)} placehdolder='$100' />
                        </FormGroup>
                        <FormGroup className='form__group w-50'>
                            <span>Catagory</span>
                            <select className='w-100 p-2' value={enterCatagory} onChange={e=>setEnterCatagory(e.target.value)} >
                                <option>Chọn danh mục sản phẩm</option>
                                <option value="chair">Chair</option>
                                <option value="sofa">Sofa</option>
                                <option value="mobile">Mobile</option>
                                <option value="watch">Watch</option>
                                <option value="wireless">Wireless</option>
                            </select>
                        </FormGroup>
                        </div>
                        <div>
                        <FormGroup className='form__group'>
                            <span>Product Image</span>
                            <input type="file" onChange={e=>setEnterProductImg(e.target.files[0])} />
                        </FormGroup>
                        </div>
                        <button className='buy__button' type='submit' >Add Product</button>
                    </Form>
                        </>
                    }
                </Col>
            </Row>
        </Container>
    </section>
</Helmet>
    )
}
export default AddProduct
