import { StyleSheet } from "react-native";
import { colors } from "@/styles/theme";

// stylesheet.create para criar estilos através de objetos
export const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.gray[100],
    },
});
