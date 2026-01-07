import { useState } from 'react'; 
import inkPen from "./assets/ink_pen.svg"; 
import flatware from "./assets/flatware.svg"; 
import electricalServices from "./assets/electrical_services.svg";
import deleteIcon from './assets/delete.svg';

const ItemManager = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState(""); [cite: 94]
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    
    const categoryIcons = {
        Stationary: inkPen,
        Kitchenware: flatware,
        Appliance: electricalServices,
    };

    const handleAddItem = () => {
        if (!name.trim()) {
            setError("Item name must not be empty"); [cite: 101]
            return;
        }
        const isDuplicate = items.some(
            (item) => item.name.toLowerCase() === name.toLowerCase()
        ); [cite: 97]
        if (isDuplicate) {
            setError("Item must not be duplicated"); [cite: 102]
            return;
        }
        if (!category){
            setError("Please select a category"); [cite: 103]
            return;
        }
        if (price === "" || parseFloat(price) < 0){
            setError("Price must not be less than 0"); [cite: 104]
            return;
        }

        const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1; [cite: 105, 140]

        const newItem = {
            id: newId,
            name: name,
            category: category,
            price: parseFloat(price).toFixed(2),
        };
        
        setItems([...items, newItem]); [cite: 89]
        setName("");
        setCategory("");
        setPrice("");
        setError("");
    }

    const handleDeleteItem = (id) => {
        setItems(items.filter((item) => item.id !== id)); [cite: 107]
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Item Management</h2> [cite: 70]
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
                                <img src={categoryIcons[item.category]} alt={item.category} width="20" /> [cite: 136]
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => handleDeleteItem(item.id)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                    <img src={deleteIcon} alt="Delete" width="16" /> [cite: 106]
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr> [cite: 85]
                        <td></td>
                        <td>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" />
                        </td>
                        <td>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Stationary">Stationary</option> [cite: 91]
                                <option value="Kitchenware">Kitchenware</option> [cite: 92]
                                <option value="Appliance">Appliance</option> [cite: 93]
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
            {error && <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '10px' }}>{error}</p>} [cite: 100]
        </div>
    );
};

export default ItemManager;