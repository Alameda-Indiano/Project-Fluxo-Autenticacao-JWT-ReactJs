import { useState, useEffect } from "react"
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"

import imagemPrincipal from './assets/login.png'

import './ModalLogin.css'
import axios from "axios"
import { IPropsModal } from "../../interfaces/Modal"

const ModalLogin = (props: IPropsModal) => {

    const { isOpen, toogleModal } = props;

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        const usuario = {
            email,
            senha,
        }

        axios.post('http://localhost:8000/public/login', usuario)
            .then((res) => {
                alert('Usuário foi logado com sucesso!')
                setEmail('')
                setSenha('')
                if (res?.data?.access_token) sessionStorage.setItem('token', res.data.access_token)
                toogleModal()
            })
            .catch((err) => {
                if (err?.response?.data?.message) console.error(`[ERRO]: ${err.response.data.message}`);
                else alert('[ERRO]: Ocorreu um erro inesperado! Por favor, entre em contato com o suporte.');
            })
    }

    return (<AbModal 
        titulo="Login" 
        aberta={isOpen}
        aoFechar={() => toogleModal()}    
    >
        <section className="corpoModalCadastro">
            <figure>
                <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
            </figure>
            <form onSubmit={aoSubmeterFormular}>
                <AbCampoTexto 
                    label="E-mail"
                    value={email}
                    onChange={setEmail}
                    type="email"
                />
                <AbCampoTexto 
                    label="Senha"
                    value={senha}
                    onChange={setSenha}
                    type="password"
                />
                <div className="acoes">
                    <AbBotao texto="Fazer Login"/>
                </div>
            </form>
        </section>
    </AbModal>)
}

export default ModalLogin