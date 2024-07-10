import { useContext } from 'react'
import { CifraContext } from '../../ContextApi/CifraContext'


const Serch = () => {

    const { searchTerm, setSearchTerm } = useContext(CifraContext)

    return (
        <div>
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Pesquisar a Cifra'
                style={{
                    marginBottom: '1rem',
                    width: '95%',
                    height: '2rem',
                    fontSize: '1rem',
                    padding: '0.5rem',
                    color: 'var(--searchParagraohy-color)',
                    backgroundColor: 'var(--backGoundSeach-color)',
                    borderRadius: '10px',
                }}
            />
        </div>
    )
}

export default Serch