import { Box } from '@mui/material'
import iconBack from '../../assets/icon/icon-back.png'

type Props = {
    icon?: boolean,
    children?: string
}

const BackPage = (props: Props) => {
    function backPage() {
        window.history.back()
    }

    return (

        <Box onClick={backPage} sx={{ margin: '0 -1rem' }}>
            {props.icon && <img src={iconBack} alt="Botão voltar para página inicial" style={{ marginRight: '0.5rem' }} />}
            {props.children}
        </Box>
    )
}

export default BackPage