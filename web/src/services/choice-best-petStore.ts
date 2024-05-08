import { api } from "../libs/api"
import { PetStore } from "../models/PetStore"
import { RequestPetStore } from "../models/RequestPetStore"

export const choiceBestPetShop = async ( body: RequestPetStore): Promise<PetStore> => {
    
    const result = await api.post('petstore/choice', body)
    
    return result.data as PetStore
}