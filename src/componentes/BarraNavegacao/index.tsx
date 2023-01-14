import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css';
import { useState } from 'react';
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLogin from "../ModalLogin"

const BarraNavegacao = () => {

    const [ toogleModalCadastro, setToogleModalCadastro ] = useState(false);
    const [ toogleModalLogin, setToogleModalLogin ] = useState(false);
    const [ toogleActionsNavigator, setToogleActionsNavigator ] = useState(false);

    const navigate = useNavigate();

    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Design e UX
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
        {  
        toogleActionsNavigator ? 
            <ul className="acoes">
                <li>
                    <BotaoNavegacao 
                        texto="Minha Conta" 
                        textoAltSrc="Icone representando um usuário" 
                        imagemSrc={usuario} 
                        onClick={() => navigate('/minha-conta/pedidos')}
                    />
                </li>
                <li>
                    <BotaoNavegacao 
                        texto="Desconecte-se" 
                        textoAltSrc="Icone representando um usuário" 
                        imagemSrc={usuario} 
                        onClick={() => {
                            sessionStorage.removeItem('token');

                            if (!sessionStorage.getItem('token')) {
                                setToogleActionsNavigator(false);
                                navigate('/')
                            };
                        }}
                    />
                </li>
            </ul>
        :
            <ul className="acoes">
                <li>
                    <BotaoNavegacao 
                        texto="Login" 
                        textoAltSrc="Icone representando um usuário" 
                        imagemSrc={usuario} 
                        onClick={() => setToogleModalLogin(true) }
                    />
                </li>
                <li>
                    <BotaoNavegacao
                        texto="Cadastrar-se"
                        textoAltSrc="Icone representando um usuário"
                        imagemSrc={usuario}
                        onClick={() => setToogleModalCadastro(true) }
                    />
                    <ModalCadastroUsuario 
                        isOpen={toogleModalCadastro} 
                        toogleModal={(toogle) => {
                            if (toogle) setToogleModalCadastro(toogle);
                            else if (!toogleModalCadastro) setToogleModalCadastro(true);
                            else setToogleModalCadastro(false);
                    }} />
                    <ModalLogin 
                        isOpen={toogleModalLogin} 
                        toogleModal={(toogle) => {
                            if (toogle) setToogleModalLogin(toogle);
                            else if (!toogleModalLogin) setToogleModalLogin(true);
                            else setToogleModalLogin(false);

                            if (sessionStorage.getItem('token')) {
                                setToogleActionsNavigator(true);
                            };
                    }} />
                </li>
            </ul>
        }
    </nav>)
}

export default BarraNavegacao