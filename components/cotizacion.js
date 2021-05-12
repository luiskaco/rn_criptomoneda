import React from 'react';
import { Text, View, StyleSheet} from 'react-native';

const Cotizacion = ({resultado}) => {

    // COmprobar que sea un objeto vacio
    if(Object.keys(resultado).length === 0) return null;

    return ( 
        <View style={styles.resultado}>
            <Text style={[styles.texto, styles.precio]}>
                    <Text style={styles.span}>{resultado.PRICE}</Text>
            </Text>
            <Text style={styles.texto}>Precio más alto del día {' '}
                    <Text style={styles.span}>{resultado.HIGHDAY}</Text>
            </Text>
            <Text style={styles.texto}>Precio más bajo del día {' '}
                    <Text style={styles.span}>{resultado.LOWDAY}</Text>
            </Text>
            <Text style={styles.texto}>Variación Últimas 24 horas {' '}
                    <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} %</Text>
            </Text>
            <Text style={styles.texto}>Última actualización {' '}
                    <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
            </Text>
        </View>
        
     );
}



const styles = StyleSheet.create({
    resultado:{
        backgroundColor:"#5349e2",
        padding: 20,
   
    },
    texto:{
        color:'#fff',
        fontFamily:'Lato-Regular',
        fontSize: 18,
        marginBottom:10,
        
    },
    precio:{
        fontSize:32
    },
    span:{
        fontFamily:'Lato-Black'
    }
});
 
export default Cotizacion;