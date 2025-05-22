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
      description: cifra.description,
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
    const docRef = await firebase.firestore().collection('cifras').doc(id).get()
    if (docRef.exists) {
      const cifraData = { id: docRef.id, ...docRef.data() } as ICifra
      setData(cifraData)
    } else {
      console.error('Documento não encontrado.')
      setData(null)
    }
  } catch (error) {
    console.error('Erro ao obter a cifra:', error)
    alert('Erro ao obter a cifra. Verifique o console para mais detalhes.')
  }
}

export async function fireBaseUpdate(id: string, cifra: ICifra) {
  try {
    await firebase.firestore().collection('cifras').doc(id).update({
      title: cifra.title,
      tom: cifra.tom,
      singer: cifra.singer,
      description: cifra.description,
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


export const fireBaseAddFavorite = async (cifra: ICifra) => {
  try {
    await firebase.firestore().collection('favoritos').doc(cifra.id).set(cifra)
    console.log('Cifra adicionada aos favoritos.')
  } catch (error) {
    console.error('Erro ao adicionar a cifra aos favoritos:', error)
  }
}

export const fireBaseRemoveFavorite = async (id: string) => {
  try {
    await firebase.firestore().collection('favoritos').doc(id).delete()
    console.log('Cifra removida dos favoritos.')
  } catch (error) {
    console.error('Erro ao remover a cifra dos favoritos:', error)
  }
}

export const fireBaseGetFavorites = async (setList: React.Dispatch<React.SetStateAction<ICifra[]>>) => {
  try {
    const snapshot = await firebase.firestore().collection('favoritos').get()
    const allFavorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ICifra))
    setList(allFavorites)
  } catch (error) {
    console.error('Erro ao obter os favoritos:', error)
  }
}

export async function createPlaylist(name: string) {
  try {
    const createdAt = new Date().toISOString()
    const newPlaylist = await firebase.firestore().collection('playlists').add({
      name,
      songs: [],
      createdAt,
    })
    return newPlaylist.id
  } catch (error) {
    console.error('Erro ao criar playlist:', error)
  }
}

export async function addSongToPlaylist(playlistId: string, songId: string) {
  try {
    const playlistRef = firebase.firestore().collection('playlists').doc(playlistId)
    await playlistRef.update({
      songs: firebase.firestore.FieldValue.arrayUnion(songId),
    })
  } catch (error) {
    console.error('Erro ao adicionar música à playlist:', error)
  }
}

export async function removeSongFromPlaylist(playlistId: string, songId: string) {
  try {
    const playlistRef = firebase.firestore().collection('playlists').doc(playlistId)
    await playlistRef.update({
      songs: firebase.firestore.FieldValue.arrayRemove(songId),
    })
  } catch (error) {
    console.error('Erro ao remover música da playlist:', error)
  }
}

export async function getPlaylists(setPlaylists: React.Dispatch<React.SetStateAction<any[]>>) {
  try {
    const snapshot = await firebase.firestore().collection('playlists').get()
    const playlists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setPlaylists(playlists)
  } catch (error) {
    console.error('Erro ao obter playlists:', error)
  }
}
