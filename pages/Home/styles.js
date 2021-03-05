import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    refreshButton: {
        position: 'absolute',
        alignSelf: 'flex-start',
        margin: 30,
    },
    themeButtonCircle: {
        
        margin: 5,
        width: 20,
        height: 20,
        borderRadius: 50,
    },
    temperatureView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    temperatureText: {
       
        fontSize: 50,
    },
    cardsView: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    info: {
        alignItems: 'center',
        borderRadius: 20,
        width: 350,
        height: 230,
        

    },
    infoText: {

        margin: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    addtionalInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    themeButton: {
        margin: 10,
        marginLeft: 300,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    themeButtonSquare: {

        justifyContent: 'center',
        borderRadius: 20,
        marginRight: 20,
        width: 50,
        height: 25,
    },
});
export default styles;