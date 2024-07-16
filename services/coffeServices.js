// coffesService.js
import { db } from '../firebase.js';

// Add a new coffee document
export async function addCoffe(coffeData) {
  try {
    const res = await db.collection('coffes').add(coffeData);
    return res.id;
  } catch (error) {
    console.error('Error adding coffee:', error);
    throw new Error('Error adding coffee');
  }
}

// Get a coffee document by ID
export async function getCoffeById(id) {
  try {
    const docRef = db.collection('coffes').doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) {
      throw new Error('No such document');
    }
    return docSnap.data();
  } catch (error) {
    console.error('Error getting coffee:', error);
    throw new Error('Error getting coffee');
  }
}

// Get all coffee documents
export async function getAllCoffes() {
  try {
    const coffeeCollection = db.collection('coffes');
    const snapshot = await coffeeCollection.get();
    const coffes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return coffes;
  } catch (error) {
    console.error('Error getting coffees:', error);
    throw new Error('Error getting coffees');
  }
}
// Update a coffee document by ID
export async function updateCoffe(id, newData) {
  try {
    const docRef = db.collection('coffes').doc(id);
    await docRef.update(newData);
    return { id, ...newData };
  } catch (error) {
    console.error('Error updating coffee:', error);
    throw new Error('Error updating coffee');
  }
}

// Delete a coffee document by ID
export async function deleteCoffe(id) {
  try {
    const docRef = db.collection('coffes').doc(id);
    await docRef.delete();
    return { id };
  } catch (error) {
    console.error('Error deleting coffee:', error);
    throw new Error('Error deleting coffee');
  }
}