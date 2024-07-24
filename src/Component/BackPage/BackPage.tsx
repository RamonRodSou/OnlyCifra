import { Box } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';

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
            {props.icon && <ReplyIcon  />}
            {props.children}
        </Box>
    )
}

export default BackPage