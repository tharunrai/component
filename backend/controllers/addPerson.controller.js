// Add a person (lending record) to the people collection
import { db } from '../config/firebase.js';

const addPerson = async (req, res) => {
    try {
        const { name, usn, branch, email, phone, semester, itemCode } = req.body;

        // Validation
        if (!name || !usn || !branch || !email || !itemCode) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, USN, branch, email, and item code are required' 
            });
        }

        // create document
        const personData = {
            name,
            usn,
            branch,
            email,
            phone: phone || '',
            semester: semester || '',
            itemCode,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('people').add(personData);

        res.status(201).json({ 
            success: true, 
            message: 'Person added successfully',
            data: {
                id: docRef.id,
                ...personData
            }
        });
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add person' 
        });
    }
};

export default addPerson;
