import { useRef, useState, useEffect} from "react";
import "./ConversorDivisa.css";

export function ConversorDivisa() {
    
    //VARIABLES DEL PROGRAMA
    const [valorCambio, setValorCambio]=useState(null); //Nueva Variable para almacenar la taza de Cambio de la API
    const dolarRef = useRef();
    const [resultado, setResultado] = useState("");
    const [dolares, setDolares] = useState("");


    useEffect( ()=>{
        const llamadoAPICambio=async()=>{
            try {
                const respuesta= await fetch("https://api.frankfurter.dev/v1/2024-01-01..?symbols=USD");
                const datos = await respuesta.json();

                console.log(datos);


                setValorCambio(datos.rates.USD)
            } catch (error) {
                console.error("Error al acceder a la API: ", error);
            }
        };
        llamadoAPICambio();
    },[]);

    //CONVERSION DE LA DIVISA
    const conversorMoneda = () => {
        const valorDolar = parseFloat(dolarRef.current.value);
        
        if (isNaN(valorDolar)) {
            setResultado("Por favor ingrese un valor válido");
            setDolares("");
            return;
        }

        const valorResultado = (valorDolar * valorCambio).toFixed(2);
        setDolares(valorDolar.toString());
        setResultado(`${valorResultado} Lempiras`);
    }
    //Boton de Limpiar el campo 
    const limpiarCampos = () => {
        setResultado("");
        setDolares("");
        dolarRef.current.value = "";
    }
    
    return (
        <div className="conversor">
            <h2>TASA DE CAMBIO DÓLAR A LEMPIRA: <br /> {valorCambio} </h2>
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