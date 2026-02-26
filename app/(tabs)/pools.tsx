import { Octicons } from "@expo/vector-icons";
import { Icon, useToast, VStack } from "native-base";
import { FlatList } from "react-native"
import { Button } from "../../components/button";
import { Header } from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { api } from "@/lib/api";
import { useCallback, useState } from "react";
import { PoolCard, PoolPros } from "@/components/PoolCard";
import { Loading } from "@/components/Loading";
import { EmptyPoolList } from "@/components/EmptyPoolList";
import { useFocusEffect, } from "@react-navigation/native";

export default function Pools() {
  const [isLoading, setIsLoading] = useState(true);
  const [pools, setPools] = useState<PoolPros[]>([])

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPools(){
    try {
      setIsLoading(true);
     const response = await api.get('/pools')
     setPools(response.data.pools)

    } catch(error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []))

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" />}
          onPress={() => navigate('find')}
        />
      </VStack>


    {
      isLoading ? <Loading /> :
      <FlatList
      data={pools}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <PoolCard data={item}/>}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60}}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <EmptyPoolList/>}
    />}
    </VStack>
  );
}
