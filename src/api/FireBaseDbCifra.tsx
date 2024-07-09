import { ICifra } from '../Interface/ICifra'
import firebase from '../service/fireBaseConecction'

export async function fireBasePost(cifra: ICifra) {
  try {
    const createdAt = new Date().toISOString()
    await firebase.firestore().collection('cifras').add({
      title: cifra.title,
      tom: cifra.tom,
      singer: cifra.singer,
      Struct: cifra.Struct,
      createdAt: createdAt,
    })
    alert('Cifra registrada com sucesso!')
  } catch (error) {
    alert('Erro ao registrar a cifra: ' + error)
  }
}

export const fireBaseGet = async (setData: React.Dispatch<React.SetStateAction<ICifra[]>>) => {
  try {
    const snapshot = await firebase.firestore().collection('cifras').get()
    const allCifras = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ICifra))
    setData(allCifras)
  } catch (error) {
    console.error('Erro ao obter as cifras:', error)
    alert('Erro ao obter as cifras. Verifique o console para mais detalhes.')
  }
}

export const fireBaseGetById = async (id: string, setData: any) => {
  try {
    const docRef = await firebase.firestore().collection('cifras').doc(id).get();
    if (docRef.exists) {
      const cifraData = { id: docRef.id, ...docRef.data() } as ICifra;
      setData(cifraData);
    } else {
      console.error('Documento não encontrado.');
      setData(null);
    }
  } catch (error) {
    console.error('Erro ao obter a cifra:', error);
    alert('Erro ao obter a cifra. Verifique o console para mais detalhes.');
  }
}

export async function fireBaseUpdate(id: string, cifra: ICifra) {
  try {
    await firebase.firestore().collection('cifras').doc(id).update({
      title: cifra.title,
      tom: cifra.tom,
      singer: cifra.singer,
      Struct: cifra.Struct,
    })
  } catch (error) {
    alert('Erro ao atualizar a cifra: ' + error)
  }
}

export async function fireBaseDelete(id: string) {
  try {
    await firebase.firestore().collection('cifras').doc(id).delete()
  } catch (error) {
    alert('Erro ao deletar a cifra: ' + error)
  }
}
