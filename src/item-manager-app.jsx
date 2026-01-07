import { useState } from 'react'; 
import inkPen from "./assets/ink_pen.svg"; 
import flatware from "./assets/flatware.svg"; 
import electricalServices from "./assets/electrical_services.svg";
import deleteIcon from './assets/delete.svg'; 

const ItemManager = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(""); 
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    
    const categoryIcons = {
        Stationary: inkPen,
        Kitchenware: flatware,
        Appliance: electricalServices,
    };

    const handleAddItem = () => {
        if (!name.trim()) {
            setError("Item name must not be empty"); 
            return;
        }
        const isDuplicate = items.some(
            (item) => item.name.toLowerCase() === name.toLowerCase()
        ); 
        if (isDuplicate) {
            setError("Item must not be duplicated"); 
            return;
        }
        if (!category){
            setError("Please select a category"); 
            return;
        }
        if (price === "" || parseFloat(price) < 0){
            setError("Price must not be less than 0"); 
            return;
        }

        const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1; 

        const newItem = {
            id: newId,
            name: name,
            category: category,
            price: parseFloat(price).toFixed(2),
        };
        
        setItems([...items, newItem]); 
        setName("");
        setCategory("");
        setPrice("");
        setError("");
    }

    const handleDeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id)); 
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Item Management</h2> 
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <img src={categoryIcons[item.category]} alt={item.category} width="20" /> 
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => handleDeleteItem(item.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    <img src={deleteIcon} alt="Delete" width="16" /> 
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr> 
                        <td></td>
                        <td>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
                        </td>
                        <td>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Stationary">Stationary</option> 
                                <option value="Kitchenware">Kitchenware</option> 
                                <option value="Appliance">Appliance</option> 
                            </select>
                        </td>
                        <td>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
                        </td>
                        <td>
                            <button onClick={handleAddItem} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>
                                Add Item
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '10px' }}>{error}</p>} 
        </div>
    );
};

export default ItemManager;