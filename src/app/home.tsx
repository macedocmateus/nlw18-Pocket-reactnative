import { useEffect, useState } from "react";
import { View, Alert } from "react-native";

import MapView from "react-native-maps";
import * as Location from "expo-location";
import { api } from "@/services/api";

import { Categories, CategoriesProps } from "@/components/categories";
import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";

type MarketProps = PlaceProps & {};

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
};

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");
    const [markets, setMarkets] = useState<MarketProps[]>([]);

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Categorias",
                "Não foi possível carregar as categorias."
            );
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                return;
            }

            const { data } = await api.get("/markets/category/" + category);
            setMarkets(data);
        } catch (error) {
            console.log(error);
            Alert.alert("Locais", "Não foi possível carregar os locais.");
        }
    }

    // Função que pega a localização do seu dispositivo
    async function getCurrentLocation() {
        try {
            const { granted } =
                await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync();
                console.log(location);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        //getCurrentLocation();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    return (
        <View style={{ flex: 1, backgroundColor: "#cecece" }}>
            <Categories
                data={categories}
                onSelect={setCategory}
                selected={category}
            ></Categories>

            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            ></MapView>

            <Places data={markets}></Places>
        </View>
    );
}
