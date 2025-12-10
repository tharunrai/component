import { useNavigate } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import './Card.css';

const Card = () => {
    const { items, loading, error } = useItems();
    const navigate = useNavigate();

    const handleLendClick = (item) => {
        navigate(`/form/${item.id}`, { state: { item } });
    };

    if (loading) {
        return <div className="loading">Loading items...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="cards-grid">
            {items.map((item) => (
                <div key={item.id} className="item-card">
                    <div className="card-content">
                        <div className="item-img">
                            {item.itemImg ? (
                                <img src={item.itemImg } alt={item.itemName || 'Item'} />
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        <div className="item-details">
                            <div className="item-info">
                            <h3>Item Name : {item.itemName.toUpperCase()}</h3>
                            <p>{item.itemCode}</p>
                            </div>
                            <p>
                                {item.isAvailable ? (
                                    <>
                                        <button 
                                            className="btn-lend"
                                            onClick={() => handleLendClick(item)}
                                        >
                                            Lend
                                        </button>
                                    </>
                                ) : (
                                    'Taken By : ' + item.takenBy
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Card;