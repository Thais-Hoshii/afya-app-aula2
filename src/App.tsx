import React, { useEffect, useState, useCallback } from 'react';

import { uuid } from "uuidv4";

import { api } from "./services/api";

interface IData {
    id: string;
    name: string;
    price: number;
}

const App: React.FC = () => {
    const [ data, setData ] = useState<IData[]>([]);
    const [ isLoad, setIsLoad ] = useState<boolean>(false);
    const [ fruta, setFruta ] = useState<string>("");
    const [ frutaValue, setFrutaValue ] = useState<any>();

    useEffect(() => {
        console.log(isLoad);
        api.get("data").then(
            response => {
                setData(response.data);
            }
        )
    }, [isLoad]);

    const convertToCurrency = useCallback(
        (value: number) => 
            Intl.NumberFormat(
                "pt-br",
                { style: "currency", currency: "BRL" }
            ).format(value)
        , [],
    );

    const addToApi = useCallback(
        () => {
            setIsLoad(true);
            api.post("data", {
                id: uuid,
                name: fruta,
                price: frutaValue
            }).then(
                response => alert("Tudo certo")
            ).catch( e => alert("error")).finally(
                () => {setIsLoad(false)}
            )
        }, [fruta, frutaValue]
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
                {isLoad ? (
                    <div>
                        <p>Aguarde, carregando</p>
                    </div>
                ) : (
                    <div>                        
                        <input type="text" onChange={ e => setFruta(e.target.value)} placeholder="Qual fruta"/>
                        <input type="text" onChange={ e => setFrutaValue(parseFloat(e.target.value))} placeholder="Qual valor"/>
                        <button onClick={ addToApi }>Adicionar</button>
                    </div>
                )}
            </ul>
        </div>
    )
}

export default App;