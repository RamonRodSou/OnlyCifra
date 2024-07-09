import firebase from '../service/fireBaseConecction';
const seedCifras = async () => {
  try {
    const cifrasRef = firebase.firestore().collection('cifras');

    const cifrasData = [
      {
        id: '1',
        title: 'A Terra Clama',
        tom: 'C / Am',
        singer: 'Original',
        Struct: [
          {
            section: 'intro',
            content: ['| F | G | Am | Em |'],
          },
          {
            section: 'verso',
            content: ['| F | G | Am | Em |'],
          },
          {
            section: 'refrao',
            content: ['| F | G | Am | Em |'],
          },
          {
            section: 'ponte',
            content: ['| F | G | Am | Em |'],
          },
        ],
      },
      {
        id: '2',
        title: 'Jeova Jihre',
        tom: 'G',
        singer: 'Original',
        Struct: [
          {
            section: 'intro',
            content: ['| C | Am | Em | D |'],
          },
          {
            section: 'verso',
            content: ['|| G || C ||'],
          },
          {
            section: 'refrao',
            content: ['| C | D | Em | Bm | C | D | Em | G |'],
          },
          {
            section: 'ponte',
            content: ['| C | D | Em | Bm | C | D | Em | Am G |'],
          },
        ],
      },
    ];

    cifrasData.forEach(async (cifra) => {
      await cifrasRef.doc(cifra.id).set({
        title: cifra.title,
        tom: cifra.tom,
        singer: cifra.singer,
        Struct: cifra.Struct,
      });
      console.log(`Cifra ${cifra.title} adicionada com sucesso!`);
    });

    console.log('Dados de cifras foram adicionados ao Firestore.');
  } catch (error) {
    console.error('Erro ao adicionar dados de cifras:', error);
  }
};
seedCifras();
