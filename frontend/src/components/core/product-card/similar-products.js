import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { editProducts, setError } from '../../../services/store/actions'
import { getProducts } from '../helper/coreapicalls'

const SimilarProducts = ({ category, id, products, setError, editProducts }) => {

    const loadProcuts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setError(true)
                }
                else {
                    editProducts(data)
                }

            })
            .catch(() => setError(true))
    }

    useEffect(() => {
        loadProcuts()
    }, [])

    const similarProducts = () => products.filter(item => item.category === category && item.id !== id).slice(0, 2)

    return (
        products && similarProducts().length > 0 &&
        <div className='similar-products'>
            <hr />
            <h2>Similar products</h2>
            <div className='similar-products-list'>
                {similarProducts().map((product, index) => (
                    <div key={index} className="similar-product">
                        <Link to={`/shop/${product.id}/`}><img src={product.image} alt={product.name} /></Link>
                        <h3>{product.name}</h3>
                    </div>))}
            </div>

        </div>

    )
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    editProducts,
    setError
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarProducts)
