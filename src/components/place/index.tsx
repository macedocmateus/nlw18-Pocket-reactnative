import {
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    Text,
    Image,
} from "react-native";
import { s } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/theme";

export type PlaceProps = {
    id: string;
    name: string;
    description: string;
    coupons: number;
    cover: string;
    address: string;
};

export type Props = TouchableOpacityProps & {
    data: PlaceProps;
};

export function Place({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={s.container} {...rest}>
            <Image style={s.image} source={{ uri: data.cover }}></Image>

            <View style={s.content}>
                <Text style={s.name}>{data.name}</Text>
                <Text style={s.description}>{data.description}</Text>

                <View style={s.footer}>
                    <IconTicket size={16} color={colors.red.base}></IconTicket>
                    <Text style={s.tickets}>
                        {data.coupons} cupons disponíveis
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
