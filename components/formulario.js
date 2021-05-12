import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Axios
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPi}) => {
 
    const [ criptomonedas, setCriptomonedas] = useState([]);


    useEffect(() => {
        const  consultarAPI = async () => {
             const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
             const resultado = await axios.get(url);
             setCriptomonedas(resultado.data.Data)
          
        }

        consultarAPI();
    }, []);

    // Funciones
    // OBtener moneda
    const obtenerMoneda = moneda => {
        setMoneda(moneda)
    }

    // Almacena las selecione del usuario
    const obtenerCriptomoneda = cripto => {
        setCriptomoneda(cripto)
    }

    // Mostrar Alertas
    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatoros',
            [
                {
                    text:'Ok'
                }
            ]
        )
    }
    // COtizar precios
    const cotizarPrecio = () =>{

        // Validacion
        if(moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        // Cambiar el state de consultar API
        setConsultarAPi(true);

    }


    return ( 
        <View>
            <Text style={styles.label}>Moneda</Text>

            {/* Piker va ser nativo */}
            <Picker
                selectedValue={moneda}  // vALOR SELECIONADO 
                onValueChange={moneda => obtenerMoneda(moneda)}
                itemStyle={{height:120}}
            >
                 <Picker.Item label="- Selecionar -" value=" " />
                 <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                 <Picker.Item label="Peso Mexicano" value="MXN" />
                 <Picker.Item label="Soles" value="PEN" />
                 <Picker.Item label="Euro" value="EUR" />
                 <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptomoneda(cripto) }
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" /> 
                {criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} /> 
                ))}
            </Picker>

            <TouchableHighlight 
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>  
     );
}
 
const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar:{
        backgroundColor:'#5E49E2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar:{
        color:'#fff',
        fontSize: 18,
        fontFamily:'Lato-Black',
        textTransform: 'uppercase',
        textAlign:'center'
        
    }

});

export default Formulario;