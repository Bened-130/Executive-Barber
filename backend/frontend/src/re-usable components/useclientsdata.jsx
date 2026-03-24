import {useQuery} from '@tanstack/react-query'
import { fetchClients } from '../Services/getClients'

export  default function useClientsdata (){
    const{data:clients,error:clientsError,isLoading:isLoadingClients} = useQuery({
        queryKey : ['clientsdata'],
        queryFn : fetchClients
    })
    return {clients,clientsError,isLoadingClients}
}