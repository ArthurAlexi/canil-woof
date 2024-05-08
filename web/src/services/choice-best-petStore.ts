import { PetStore } from "../models/PetStore"
import { RequestPetStore } from "../models/RequestPetStore"

export const choiceBestPetShop = async ( body: RequestPetStore): Promise<PetStore> => {
    const result = await fetch('http://localhost:8080/api/v1/petstore', {
        method: "POST",
        body
    })

    const data = await result.json()
    return data as PetStore
}