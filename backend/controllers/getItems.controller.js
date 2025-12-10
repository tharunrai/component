// fetch all items from the firestore database from items collection
// iimport necessary modules
import { db } from '../config/firebase.js';

const getItems = async (req, res) => {
    try {
        const itemsSnapshot = await db.collection('items').get();
        const items = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch items' });
    }
};

export default getItems;

