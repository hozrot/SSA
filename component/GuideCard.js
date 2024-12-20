import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import UserContext from "../auth/UserContext";
import BaseUrl from "../auth/BaseUrl";

export default function GuideCard({ BgId, guideId, BGCheck, NPCheck, FloorCheck, LogoCheck, createdOn, onEdit }) {
  const { userData } = useContext(UserContext);
  const [img, setImg] = useState();
  const [floor, setFloor] = useState();

  useEffect(() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/backgrounds/${BgId}/`,
      headers: {
        "Authorization": `Token ${userData?.token}`, // Pass the token here
        "Content-Type": "application/json",
         'Cookie': 'csrftoken=NJChvjOxebFsuddDFi8waFmFFeWWLsBm; sessionid=pewl7aqbu7dwierg2uy7yipixdz05r7s'
      }
    };
    {
      BgId &&
        axios.request(config)
          .then((response) => {
            setImg(response.data);
          })
          .catch((error) => {
            console.log('backgrounds', error);
          });
    }

    let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/floors/${FloorCheck}/`,
      headers: {
        "Authorization": `Token ${userData?.token}`, // Pass the token here
        //  'Cookie': 'csrftoken=NJChvjOxebFsuddDFi8waFmFFeWWLsBm; sessionid=pewl7aqbu7dwierg2uy7yipixdz05r7s'
      }
    };
    {
      FloorCheck &&
        axios.request(config2)
          .then((response) => {
            setFloor(response.data);
          })
          .catch((error) => {
            console.log('backgrounds', error);
          });
    }

  }, [BgId], [FloorCheck])

  console.log('image flooe :',img,floor)
  return (
    <View style={styles.GuideCard}>
      <View style={styles.OrderCardImage}>
        <Image
          style={{ width: 119, height: 77, borderRadius: 22 }}
          source={{ uri: img?.image }}
        />
        <Image
          style={{ width: 119, height: 77, borderRadius: 22 }}
          source={{ uri: floor?.image }}
        />
        {/* <Image
          style={{ width: 119, height: 80, borderRadius: 22 }}
          source={{ uri: img?.image }}
        /> */}
      </View>
      <View style={styles.OrderCardDetails}>
        <View>
          <Text style={styles.CardHead}> {guideId} </Text>
        </View>



        <View style={styles.threeIconsection}>
          <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            borderRadius: 10
          }}>
            <Text style={styles.CardText}>
              BG{" "}
              <MaterialCommunityIcons
                name="check-circle"
                //name={BGCheck}
                size={12}
                color={"red"}

              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            borderRadius: 15
          }}>
            <Text style={styles.CardText}>
              Floor{" "}
              <MaterialCommunityIcons
                name="check-circle"
                // name="bookmark-remove-outline"
                // name={FloorCheck}
                size={12}
                color={"red"}
              />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            borderRadius: 15
          }}>
            <Text style={styles.CardText}>
              Logo{" "}
              <MaterialCommunityIcons
                name="check-circle"
                // name="check-circle"
                // name={LogoCheck}
                size={12}
                color={"red"}
              />
            </Text>
          </TouchableOpacity>
        </View>
        {/* if({NPCheck}=="DontaddLicensePlate"){ */}


        <View style={styles.NpIconsection}>
          {NPCheck === "addLicensePlate" &&
            <TouchableOpacity style={{
              borderWidth: 1,
              borderColor: 'gray',
              padding: 5,
              borderRadius: 15
            }}>


              <Text style={styles.CardText}>
                Number Plate {" "}
                {
                  NPCheck === "addLicensePlate" ? (
                    <MaterialCommunityIcons
                      name="check-circle"
                      // name="bookmark-remove-outline"
                      size={12}
                      color={"red"}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      // name="check-circle"
                      name="bookmark-remove-outline"
                      size={12}
                      color={"red"}
                    />)
                }
              </Text>
            </TouchableOpacity>}

        </View>

        <View style={styles.dateEditsection}>

          <Text style={styles.CardText}>{createdOn?.split('T')[0]}  </Text>
          {/* <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 5,
            borderRadius: 10
          }} onPress={onEdit} >
            <Text style={styles.CardText}>
              Edit{" "}
              <MaterialCommunityIcons
                name="pen"
                size={14}
                color={"#ffffff"}
              />
            </Text>
          </TouchableOpacity> */}
        </View>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  topBar: {
    flex: 0.07,
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    paddingTop: 30
  },
  GuideCard: {
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: 'gray',
    padding: 2,
    borderRadius: 25,
  },
  OrderCardImage: {
    flex: .40
  },
  OrderCardDetails: {
    flex: .60,
    margin: 5
  },



  threeIconsection: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between'
  },
  NpIconsection: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'

  },
  dateEditsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 10,
    padding: 5

  },

  CardHead: {
    color: "#ffffff",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 18
  },
  CardText: {
    color: "#ffffff",
    fontSize: 12
  },
});