import { Box, useToast } from 'native-base';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

import { Game, GameProps } from './Game';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([])

  const toast = useToast()
  
  async function fetchGames(){
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`);
                
    } catch (error) { 
      console.log(error);

      toast.show({
        title: 'Não foi possivel carrregar os jogos',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGames()
  }, [poolId])

  return (
    <Box>

    </Box>
  );
}
