import { Button, Nav, Navbar } from 'react-bootstrap';
import logo from '../img/logo2.png'

function Menu({logged, logout}, props) {


    const userExit = () => {
        if (logged) {
            return (
                <Button variant="outline-secondary" className="botao" onClick={logout}>Sair</Button>
            )
        }
    }

    const userButtons = () =>{
        if (logged) {
            return(
                <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/conteudo">Material</Nav.Link>
                <Nav.Link href="/reuniao">Reuniões</Nav.Link>
                <Nav.Link href="/feedback">Feedback</Nav.Link>
            </Nav>
            )
        }
    }

    return (
        <>
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home"><img src={logo} style={{ width: "50px" }} alt="logo"/></Navbar.Brand>
                    {userButtons()}
                    {userExit()}
                </Navbar>
            </>
        </>
    );
}

export default Menu;