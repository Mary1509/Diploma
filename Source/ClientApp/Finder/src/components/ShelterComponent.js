import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { DataTable } from "react-native-paper";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export function Shelter({ navigation, route }) {
  const [shelter, setShelter] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const isLogged = useSelector((store) => store.isLogged.isLogged);
  const token = useSelector((store) => store.isLogged.token);

  useEffect(() => {
    async function fetchShelter() {
      const responce = await fetch("http://10.0.2.2:4567/shelters/"+route.params.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      shelterdata = await responce.json();
      if (shelterdata.message === undefined) {
        setShelter(() => {
          return shelterdata;
        });
      }
    }

    fetchShelter();
  }, []);

  handleAddFavourite = async () => {
    // fetch if already favourite then
    const responce = await fetch(
      "http://10.0.2.2:4567/user/favourites/add/" + route.params.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    // or remove from favourite
    // const statusCode = responce.status
    // console.log(statusCode);
    // result = await responce.json();
    // console.log(result);
    // if (locdata.message === 'undefined') {
    //   setLocation(() => {
    //     return locdata;
    //   });
    // }
    
    // setIsFavourite(() => {
    //   return !isFavourite;
    // });
  };

  if (shelter) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) =>
              pressed ? styles.pressablePressed : styles.pressable
            }
            onPress={() => navigation.goBack()}
          >
            <Icon name="caret-left" size={35} color={"#ee6c4d"} />
            <Text style={styles.headeringText}>До списку</Text>
          </Pressable>
          {isLogged && (              // УМОВНА КОНСТРУКЦІЯ ДЛЯ РОЗШИРЕННЯ ФУНКЦІОНАЛУ
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "20%",
              }}
            >
              <Pressable
                onPress={() =>
                  navigation.navigate("Editor", { shelter: shelter })
                }
              >
                <Icon name={"edit"} size={25} color={"#ee6c4d"} />
              </Pressable>
              <Pressable onPress={handleAddFavourite}>
                <Icon
                  name={isFavourite ? "star" : "star-o"}
                  size={25}
                  color={"#ee6c4d"}
                />
              </Pressable>
            </View>
          )}
        </View>
        {shelter && (
          <View style={styles.tableStyle}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title textStyle={styles.headerTable}>
                  Укриття
                </DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>{"Адреса"}</DataTable.Cell>
                <DataTable.Cell>{shelter.address}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Тип</DataTable.Cell>
                <DataTable.Cell>{shelter.type}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Призначення</DataTable.Cell>
                <DataTable.Cell>{shelter.purpose}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Місткість</DataTable.Cell>
                <DataTable.Cell>{shelter.capacity}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Наявність пандусу</DataTable.Cell>
                <DataTable.Cell>
                  {shelter.hasRamp ? "Наявний" : "Відсутній"}
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        )}
        {shelter && (
          <View flex={6}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(shelter.latitude),
                longitude: parseFloat(shelter.longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress={true}
              showsCompass={true}
              showsPointsOfInterest={false}
              provider="google"
              zoomControlEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(shelter.latitude),
                  longitude: parseFloat(shelter.longitude),
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                pinColor={"red"}
                title={shelter.address}
              />
            </MapView>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size="large" color="#ee6c4d" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#878787",
    borderBottomWidth: 0.5,
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pressablePressed: {
    opacity: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headeringText: {
    padding: 10,
    fontSize: 17,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  tableStyle: {
    width: "100%",
    flex: 7,
    backgroundColor: "#f0f0f0",
  },
  headerTable: {
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  map: {
    width: width,
    height: height / 3,
  },
});
