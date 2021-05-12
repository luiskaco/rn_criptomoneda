import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator // Componente para realizar spinner
 
} from 'react-native';

// Axios
import axios from 'axios';

// Componentes
import Header from './components/header';
import Formulario from './components/formulario';
import Cotizacion from './components/cotizacion';


const App = () => {
  // State de los pickers
  const [ moneda, setMoneda] = useState('');
  const [ criptomoneda, setCriptomoneda] = useState('');

  // Validacion de statu del api
  const [consultarAPi,  setConsultarAPi] = useState(false);

  // State del resultado del api
  const [resultado, setResultado] = useState({});
  
  // Validando statu de activity
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      if(consultarAPi){
            // Consultar la api para obtener la cotizaciones      
          const consultar = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
          // COnsultamos la buscquda
          const resultado = await axios.get(consultar);
       
          // Activando espiiner
          setCargando(true)

         
          setTimeout(() => {
                   // Guardamso resultado en el state
                  setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
                  // Reseteamos la busqueda
                  setConsultarAPi(false)

                   // Ocultar el spinner y mostrar el rsultado
                   setCargando(false)
          },3000)

        }
    }

    cotizarCriptomoneda();
      
  }, [consultarAPi])


  // Mostrar el spiner o el restulado
  const componente = cargando ? <ActivityIndicator size="large" color="#5e49e2"/> : <Cotizacion resultado={resultado} />
  // nota: sele conoce como carga condicional

  return (
      <>
        <ScrollView>

         <Header />

        <Image 
            style={styles.imagen}
            source={require('./assets/img/cryptomonedas.png')}
        />

        <View style={styles.contendo}>
            <Formulario 
                moneda={moneda}
                criptomoneda={criptomoneda}
                setMoneda={setMoneda}
                setCriptomoneda={setCriptomoneda}
                setConsultarAPi={setConsultarAPi}
            />

          
       
        </View>
        <View style={{marginTop:40}}>
            {componente}
      
        </View>
            
        </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
    imagen:{
      width:'95%',
      height: 150,
      marginHorizontal: '2.5%'
    },
    contendo:{
        marginHorizontal: '2.5%'
    }
});

export default App;
