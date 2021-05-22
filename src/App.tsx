import React, { useEffect, useState, useCallback } from 'react';

import { uuid } from "uuidv4";

import { api } from "./services/api";

interface IData {
    id: number;
    name: string;
    price: number;
}

const App: React.FC = () => {
    const [ data, setData ] = useState<IData[]>([]);
    const [ fruta, setFruta ] = useState<string>("");
    const [ frutaValue, setFrutaValue ] = useState<any>();

    useEffect(() => {
        console.log(fruta);
        api.get("data").then(
            response => {
                setData(response.data);
            }
        )
    }, [fruta])

    const convertToCurrency = useCallback(
        (value: number) => (
            Intl.NumberFormat(
                "pt-br",
                { style: "currency", currency: "BRL" }
            ).format(value / 100)
        ), []
    );

    const addToApi = useCallback(
        () => {
            api.post("data", {
                id: uuid,
                name: fruta,
                price: frutaValue
            }).then(
                response => alert("Tudo certo")
            ).catch( e => alert("error"))
        }, [uuid, fruta, frutaValue]
    );
    
    return(
        <div>
            <h1>Hello!!</h1>
            <ul>
                { data.map( fruta => (
                    <li key={fruta.id}>
                        {fruta.name} | {convertToCurrency(fruta.price)}
                    </li>
                ))}
                <hr />
                <h1>{fruta}</h1>
                <hr />
                <input type="text" onChange={ e => setFruta(e.target.value)} placeholder="Qual fruta"/>
                <input type="text" onChange={ e => setFrutaValue(parseFloat(e.target.value))} placeholder="Qual valor"/>
                <button onClick={ addToApi }>Adicionar</button>
            </ul>
        </div>
    )
}

export default App;