import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import  New  from "../app/(tabs)/new"
import Pools from "../app/(tabs)/pools";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
    return (
        <Navigator>
            <Screen 
            name="new"
            component={New}
            />

            <Screen 
            name="pools"
            component={Pools}
            />
        </Navigator>
    )
}