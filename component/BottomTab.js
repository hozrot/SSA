import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function BottomTab({ state, descriptors, navigation }) {
    const icon = {
        Dashboard: (props) => <MaterialCommunityIcons name="camera-outline" size={20} {...props} />,
        NewEntry: (props) => <MaterialCommunityIcons name="note-outline" size={20} {...props} />,
        CollectMoney: (props) => <MaterialCommunityIcons name="folder-open-outline" size={20} {...props} />,
        AboutUs: (props) => <MaterialCommunityIcons name="account-outline" size={20} {...props} />

    }
    return (
        <View style={styles.tabbar}>
           
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={route.name}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabbarItem}
                        >
                            {
                                icon[route.name]({
                                    color: isFocused ? 'green' : '#ffffff'
                                })
                            }
                            {/* <MaterialCommunityIcons name="camera-outline" size={18} color={isFocused ? '#FF4A22' : '#ffffff'} /> */}
                            <Text style={{
                                color: isFocused ? 'green' : '#ffffff', fontSize: 12,
                                fontFamily: 'DMSans_400Regular',
                            }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            
        </View>
    );
}
const styles = StyleSheet.create({
    tabbar: {

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000',
        paddingBottom: 20,
        paddingTop:10,
        borderRadius:50,
        margin:10
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',



    }
})