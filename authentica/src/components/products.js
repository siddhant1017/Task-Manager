import { FaHeart, FaTrash, FaEdit} from 'react-icons/fa';

export function Products(props) {
    return(
        <div className='productList'>
            <div key={props.id} className='productCard'>
                <img src={props.image} alt='product-img' className='productImage'></img>
                <FaEdit input type="button" className={"productCard__edit"} />
                <FaHeart input type="button" className={"productCard__wishlist"} />
                <FaTrash input type="button" className={"productCard__trash"} />

                <div className='productCard__content'>
                    <h3 className='productName'>{props.name}</h3>
                </div>
            </div>
        </div>
    )
}