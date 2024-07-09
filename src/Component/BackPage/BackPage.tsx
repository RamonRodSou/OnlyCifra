
type Props = {
    children: string
}


const BackPage = (props: Props) => {

    function backPage() {
        window.history.back()
    }

    return (
        <>
             <span onClick={backPage}>{props.children}</span>
        </>
    )
}

export default BackPage