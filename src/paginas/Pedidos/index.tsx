import { AbBotao } from "ds-alurabooks";
import "./Pedidos.css";
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Https } from "../../https";

interface IPedidos {
    data: string;
    entrega: string;
    id: number;
    total: number;
}

export const Pedidos = () => {

    const [ dataPedidos, setDataPedidos ] = useState<Array<IPedidos>>([]);

    useEffect(() => {
        Https.get('/pedidos')
        .then(({ data }: { data: Array<IPedidos> }) => {
            setDataPedidos(data);
        });
    }, []);

    const deletarPedido = async (idPedido: number) => {
        const { data } = await Https.post(`/pedidos/${idPedido}`)
        console.log(data)
    };

    return (
        <section className="Container--Pedidos" >
            <h1>Meus Pedidos</h1>
            { 
                dataPedidos.map((pedido) => (
                    <div className="Area--Pedidos" key={ pedido.id } >
                        <ul>
                            <li>Pedido: <strong>{ pedido.id }</strong></li>
                            <li>Data do pedido: <strong>{
                                new Date(pedido.data).toLocaleDateString()    
                            }</strong></li>
                            <li>Valor total: <strong>{ 
                                pedido.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL',  }) 
                            }</strong></li>
                            <li>Entrega realizada em: <strong>{ 
                                new Date(pedido.data).toLocaleDateString() 
                            }</strong></li>
                        </ul>
                        <div className="Container--Botoes" >
                            <AbBotao texto="Detalhes" tipo="secundario" />
                            <AbBotao texto="Deletar" tipo="primario" onClick={() => deletarPedido(pedido.id)} />
                        </div>
                    </div>
                ))
            }
        </section>
    )
};