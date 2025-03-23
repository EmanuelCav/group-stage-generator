import { DataTable } from "react-native-paper"

const HeaderGroup = () => {
    return (
        <DataTable.Header>
            <DataTable.Title>Equipo</DataTable.Title>
            <DataTable.Title numeric>Puntos</DataTable.Title>
        </DataTable.Header>
    )
}

export default HeaderGroup