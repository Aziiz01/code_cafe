import { db, storage } from '../firebase.js';
import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';

export async function addCoffe(coffeData) {
  try {
    const res = await addDoc(collection(db, 'coffes'), coffeData);
    return res.id;
  } catch (error) {
    console.error('Error adding coffe:', error);
    throw new Error('Error adding coffe');
  }
}

export async function getCoffeById(id) {
  try {
    const docRef = doc(db, 'coffes', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('No such document');
    }
    return docSnap.data();
  } catch (error) {
    console.error('Error getting coffe:', error);
    throw new Error('Error getting coffe');
  }
}

export async function getAllCoffes() {
  try {
    const querySnapshot = await getDocs(collection(db, 'coffes'));
    const coffes = [];
    querySnapshot.forEach(doc => {
      coffes.push({ id: doc.id, ...doc.data() });
    });
    return coffes;
  } catch (error) {
    console.error('Error getting coffes:', error);
    throw new Error('Error getting coffes');
  }
}
