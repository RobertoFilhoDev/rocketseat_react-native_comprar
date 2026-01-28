import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d0d2d8',
        alignItems: 'center',
        paddingTop: 62,
    },
    logo: {
        width: 134,
        height: 34,
    },
    form: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 42,
        gap: 7,
    },
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingTop: 32,
        marginTop: 24,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e4e6ec',
        paddingBottom: 12,
    },
    clearButton: {
        marginLeft: 'auto',
    },
    clearButtonText: {
        color: '#828282',
        fontSize: 12,
        fontWeight: 600,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#eef0f5',
        marginVertical: 16,
    },
    listContent: {
        paddingTop: 24,
        paddingBottom: 62,
    },
    emptyText: {
        color: '#808080',
        fontSize: 14,
        textAlign: 'center',
    }
});