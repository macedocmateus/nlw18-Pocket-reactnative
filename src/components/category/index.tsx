import { Text, Pressable, PressableProps } from "react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";
import { categoriesIcons } from "@/utils/categories-icons";

type Props = PressableProps & {
    iconId: string;
    isSelected: boolean;
    name: string;
};

export function Category({ name, iconId, isSelected = false, ...rest }: Props) {
    const Icon = categoriesIcons[iconId];

    return (
        <Pressable
            style={[s.container, isSelected && s.containerSelected]}
            {...rest}
        >
            <Icon size={16} color={colors.gray[isSelected ? 100 : 400]}></Icon>
            <Text style={(s.name, isSelected && s.nameSelected)}>{name}</Text>
        </Pressable>
    );
}
