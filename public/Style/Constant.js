import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCF5FF',
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ddd6f3',
        width: '70%',
        borderRadius: 10,
        marginBottom: 15,
    },
    icon: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 22,
        color: '#5F6D7A',
    },
    description: {
        marginTop: 10,
        textAlign: 'center',
        color: '#A9A9A9',
        fontSize: 16,
        margin: 40,
    },
    options: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 160,
        borderRadius: 20,
    },
    authButton: {
        backgroundColor: '#6441A5',
    },
    loginButton: {
        backgroundColor: '#480048',
        height: 40,
        fontSize: 20,
        marginVertical: 15,
    },
    registerButton: {
        backgroundColor: '#44a08d',
        height: 40,
        fontSize: 20,
        marginVertical: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    bottomText: {
        fontSize: 16,
        color: '#ccc',
    },
    center: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    bottomTextLink: {
        color: '#fff',
        fontWeight: 'bold',
    },
    menuBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#30A5E7',
    },
});

export default styles;