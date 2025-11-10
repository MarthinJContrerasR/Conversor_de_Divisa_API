import { useRef, useState, useEffect} from "react";
import "./ConversorDivisa.css";

export function ConversorDivisa() {
    
    //VARIABLES DEL PROGRAMA
    const [valorCambio, setValorCambio]=useState(null);
    const dolarRef = useRef();
    const [resultado, setResultado] = useState("");
    const [dolares, setDolares] = useState("");
    
    // NUEVOS ESTADOS PARA ANIMACIONES
    const [mostrarCargando, setMostrarCargando] = useState(false);
    const [textoAnimado, setTextoAnimado] = useState("");

    useEffect( ()=>{
        const llamadoAPICambio=async()=>{
            try {
                const respuesta= await fetch("https://v6.exchangerate-api.com/v6/f0f3011fcc467fec7e0844e6/latest/USD");
                const datos = await respuesta.json();
                console.log(datos);
                setValorCambio(datos.conversion_rates.HNL)
            } catch (error) {
                console.error("Error al acceder a la API: ", error);
            }
        };
        llamadoAPICambio();
    },[]);

    //FUNCIÓN PARA ANIMACIÓN DE MÁQUINA DE ESCRIBIR
    const animarTexto = (textoCompleto) => {
        setTextoAnimado("");
        let index = 0; //Es como una Matriz, comenzamos por el puesto 0, en este caso por la primera letra.
        
        const timer = setInterval(() => {
            if (index < textoCompleto.length) {
                setTextoAnimado(prev => prev + textoCompleto.charAt(index)); //Va escribiendo las letras
                index++; //Nos movemos entre letras
            } 
            else {
                clearInterval(timer); //Apagar Maquina
            }
        }, 120); //La velocidad a la cual se iran escribiendo cada una de las letras, cada 120 milisegundos
    };

    //CONVERSION DE LA DIVISA
    const conversorMoneda = () => {
        const valorDolar = parseFloat(dolarRef.current.value);
        
        if (isNaN(valorDolar)) {
            setResultado("Por favor ingrese un valor válido");
            setDolares("");
            return;
        }

        setDolares(valorDolar.toString());
        setMostrarCargando(true); // Se activa la animacion de "Cargando....".
        setTextoAnimado(""); //Si existiese un texto anterior lo borra sin necesidad de presionar limpiar

        // Simulamos tiempo de carga antes de mostrar meramente el resultado
        setTimeout(() => {
            const valorResultado = (valorDolar * valorCambio).toFixed(2);
            setResultado(`${valorResultado} Lempiras`);

            setMostrarCargando(false);// Se desactiva la animacion de "Cargando...." y da paso al resultado con la animacion.
            
            animarTexto(`${valorResultado} Lempiras`); // INICIAR ANIMACIÓN
        }, 2500);
    }

    //Boton de Limpiar el campo
    const limpiarCampos = () => {
        setResultado("");
        setDolares("");
        setTextoAnimado("");
        setMostrarCargando(false);
        dolarRef.current.value = "";
    }
    
    return (
        <div className="conversor">
            <h2>TASA DE CAMBIO DÓLAR A LEMPIRA: <br /> {valorCambio} HNL </h2>
            <h2>Conversor de Dólares a Lempiras</h2>
            <input type="text" placeholder="Ingrese la Cantidad de Dólares" ref={dolarRef} /><br/><br/>
            <button onClick={conversorMoneda}>Convertir</button> 
            <button onClick={limpiarCampos}>Limpiar</button> <br/><br />
            
            <div className="resultado-container">
                {dolares && (
                    <label>${dolares} Dólares son:</label>
                )}
                
                {/* ANIMACIÓN DE CARGANDO */}
                {mostrarCargando && (
                    <div className="cargando-animacion">
                        Calculando...
                        <div className="spinner"></div>
                    </div>
                )}
                
                <div className="resultado-label">{resultado}</div>

            </div>
        </div>
    )
}