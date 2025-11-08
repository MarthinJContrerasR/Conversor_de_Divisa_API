import { useRef, useState } from "react";
import "./ConversorDivisa.css";

export function ConversorDivisa() {
    
    const dolarRef = useRef();
    const [resultado, setResultado] = useState("");
    const [dolares, setDolares] = useState("");

    const conversorMoneda = () => {
        const valorDolar = parseFloat(dolarRef.current.value);
        
        if (isNaN(valorDolar)) {
            setResultado("Por favor ingrese un valor válido");
            setDolares("");
            return;
        }

        const valorResultado = (valorDolar * 26.15).toFixed(2);
        setDolares(valorDolar.toString());
        setResultado(`${valorResultado} Lempiras`);
    }

    const limpiarCampos = () => {
        setResultado("");
        setDolares("");
        dolarRef.current.value = "";
    }
    
    return (
        <div className="conversor">
            <h2>TASA DE CAMBIO DÓLAR A LEMPIRA: <br /> 26.15</h2>
            <h2>Conversor de Dólares a Lempiras</h2>
            <input type="text" placeholder="Ingrese la Cantidad de Dólares a Convertir" ref={dolarRef} /><br/><br/>
            <button onClick={conversorMoneda}>Convertir</button> 
            <button onClick={limpiarCampos}>Limpiar</button> <br/><br />
            
            <div className="resultado-container">
                {dolares && (
                    <label>${dolares} Dólares son:</label>
                )}
                <div className="resultado-label">{resultado}</div>
            </div>
        </div>
    )
}