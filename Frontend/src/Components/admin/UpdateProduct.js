import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteProdImage, getProduct, updateProduct } from '../../actions/productActions'
import { clearError, clearImagedeleted, clearProductUpdated } from '../../slices/productSlice'
import { toast } from 'react-toastify'
import MetaData from '../MetaData'
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FaXmark } from "react-icons/fa6";
import Dialog from '@material-ui/core/Dialog';
import { Alert } from 'react-bootstrap'

function UpdateProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [seller, setSeller] = useState()
  const [images, setImages] = useState([])
  const [imagesCleared, setImagesCleared] = useState(false)
  const [imagesPreview, setImagesPreview] = useState([])
  const [activeImage, setActiveImage] = useState(null)
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const { id: productId } = useParams()

  const handleImageClose = () => {
    setOpen(false)
  }

  const handleImageOpen = () => {
    setOpen(true)
  }

  const { loading, isProductUpdated, error, product, isProdImageDeleted } = useSelector(state => state.prodSingleState)

  const categories = [
    'Electronics',
    'Mobile phones',
    'Laptops',
    'Food',
    'Books',
    'cloths/shoes',
    'Sports',
    'Outdoor',
    'Home',
    'Accessories',
    'Bags & Luggage',
    'Music & Entertainment',
    'Fashion & Accessories'
  ];

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files)

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, file]);
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('seller', seller);

    images.forEach(image => {
      formData.append('images', image);
    });
    formData.append('imagesCleared', imagesCleared);
    dispatch(updateProduct(productId, formData))
  }

  const handleClearImages = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  }

  useEffect(() => {
    if (isProductUpdated) {
      toast.success("product updated successfully", {
        onOpen: () => dispatch(clearProductUpdated())
      })
      setImages([])
      return
    }

    if (error) {
      toast.error(error, {
        onOpen: () => { dispatch(clearError()) }
      });
      return
    }
    dispatch(getProduct(productId))
  }, [isProductUpdated, error, dispatch])

  useEffect(() => {
    if (isProdImageDeleted) {
      setAlert({
        show: true,
        message: "product image deleted",
        variant: 'success'
      })
      dispatch(clearImagedeleted())
      setImages([])
      return
    }

    if (error) {
      setAlert({
        show: true,
        message: error,
        variant: 'danger'
      })
      dispatch(clearError())
      return
    }
    dispatch(getProduct(productId))
  }, [isProdImageDeleted, error, dispatch])

  useEffect(() => {
    if (product._id) {
      setName(product.name)
      setPrice(product.price)
      setStock(product.stock)
      setDescription(product.description)
      setSeller(product.seller)
      setCategory(product.category)

      let images = []
      product.images.forEach(image => {
        images.push(image.image)
      })
      setImagesPreview(images)
    }
  }, [product])

  const handleImageDelete = (id, deleteingImage) => {
    dispatch(deleteProdImage(id, deleteingImage))
  }


  const imagesLength = imagesPreview && imagesPreview.length - 3 > 5 ? '5+' : imagesPreview.length - 3

  return (
    <Fragment>
      <MetaData title={'updating product'} />
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form onSubmit={handleSubmit} className="shadow-lg" encType='multipart/form-data'>
                <h1 className="mb-4">Update Product</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input type="text"
                    id="price_field"
                    className="form-control"
                    onChange={e => setPrice(e.target.value)}
                    value={price} />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    rows="8"></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                    <option value="">select</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input type="number"
                    id="stock_field"
                    className="form-control"
                    onChange={e => setStock(e.target.value)}
                    value={stock} />
                </div>

                <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input type="text"
                    id="seller_field"
                    className="form-control"
                    onChange={e => setSeller(e.target.value)}
                    value={seller} />
                </div>

                <div className='form-group'>
                  <label>Images</label>

                  <div className='custom-file'>
                    <input type='file'
                      name='product_images'
                      className='custom-file-input'
                      onChange={onImagesChange}
                      id='customFile'
                      multiple />
                    <label
                      className='custom-file-label'
                      htmlFor='customFile'>
                      Choose Images
                    </label>
                  </div>
                  <div className='d-flex justify-content-center mt-2'>
                    <div className='d-flex'>
                      {imagesPreview.length > 0 && <span className='mr-2' onClick={handleClearImages} style={{ cursor: 'pointer' }}><i className='fa fa-trash'></i></span>}
                      {/*{imagesPreview.length > 0 && <span className='mr-2' style={{ cursor: 'pointer',color:'red' }}></span>}*/}
                    </div>
                    {imagesPreview.slice(0, 3).map(image => (
                      <div key={image} style={{ position: 'relative' }}>
                        <img
                          style={{
                            cursor: 'pointer',
                            border: activeImage === image ? '2px solid red' : '',
                            marginBottom: '5px'
                          }}
                          onClick={() => {
                            setActiveImage(image)
                            console.log(activeImage)
                          }
                          }
                          className='mt-3 mr-2 pe-auto'
                          src={image}
                          alt={'image Preview'}
                          width='55'
                          height='52'
                        />
                        {activeImage === image && (
                          <span
                            className='possition-absolute'
                            style={{
                              marginTop: '5px',
                              cursor: 'pointer',
                              color: 'red'
                            }}
                            onClick={() => handleImageDelete(product._id, activeImage)}
                          >
                            <i className='fa fa-trash'></i>
                          </span>
                        )}
                      </div>
                    ))}

                    {imagesPreview.length > 3 && (
                      <div
                        className='w-16 h-16 rounded-md mx-1 mt-3'
                        style={{
                          width: '55px',
                          background: '#D3D3D3',
                          height: '52px',
                          //margin: '2px 8px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          padding: '5px',
                          border: '1px solid black',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center'
                        }}
                        onClick={handleImageOpen}
                      ><span
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title='view more images'
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >{imagesLength} more</span></div>
                    )}
                  </div>
                  <div>
                    {
                      alert.show && (
                        <Alert variant={alert.variant}
                          onClose={() => setAlert({ show: false, message: '', variant: '' })}
                          dismissible
                        >
                          {alert.message}
                        </Alert>
                      )
                    }
                  </div>
                </div>


                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading}
                >
                  Update
                </button>

              </form>
            </div>
          </Fragment>

          <Dialog open={open} onClose={handleImageClose}>
            <DialogTitle>
              <div className='d-flex justify-content-between'>
                Image preview
                <FaXmark
                  onClick={handleImageClose}
                  style={{
                    marginLeft: '6rem',
                    marginTop: 'auto',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </DialogTitle>
            <DialogContent className='row f-flex justify-content-around'>
              <div className="d-grid grid-cols-4 justify-content-between" >
                {imagesPreview.slice(3).map(image => (
                  <img
                    className='mt-3 mr-2'
                    src={image}
                    key={image}
                    alt='image preview'
                    width='55'
                    height='52'
                  />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct
