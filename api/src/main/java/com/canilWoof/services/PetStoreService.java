package com.canilWoof.services;

import com.canilWoof.dtos.RequestDTO;
import com.canilWoof.dtos.ResponseDTO;
import com.canilWoof.models.PetStore;
import com.canilWoof.repositories.PetStoreRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class PetStoreService {

    private final PetStoreRepository REPOSITORY;


    public PetStoreService(PetStoreRepository repository) {
        REPOSITORY = repository;
    }

    public ResponseDTO choiceBestPetShop(RequestDTO dto){

        List<PetStore> petStores = this.REPOSITORY.findAll();

        if(petStores.isEmpty()){
            throw new RuntimeException("There are no petStores registered in the system");
        }

        PetStore choice = petStores.remove(0);
        BigDecimal lowestTotalCost = calculateTotalCost(choice, dto);

        for(PetStore petStore : petStores){
            BigDecimal tempTotalCost = calculateTotalCost(petStore, dto);
            int compare = lowestTotalCost.compareTo(tempTotalCost);

            if (compare < 0 || (compare == 0 && choice.getDistance() > petStore.getDistance())) {
                choice = petStore;
                lowestTotalCost = tempTotalCost;
            }

        }


        return  new ResponseDTO(choice.getName(), choice.getDistance(), lowestTotalCost);
    }


    private BigDecimal calculateTotalCost(PetStore petStore, RequestDTO dto){
        BigDecimal increasedCost = BigDecimal.ONE;

        if(isSpecialDay(dto.date())){
            increasedCost = increasedCost.add(BigDecimal.valueOf(petStore.getIncreasedCost()));
        }

        BigDecimal totalCoastSmallDog = petStore.getCostToSmallDog().multiply(BigDecimal.valueOf(dto.numberOfSmallDog()));
        BigDecimal totalCoastLargeDog = petStore.getCostToLargeDog().multiply(BigDecimal.valueOf(dto.numberOfLargeDog()));

        return totalCoastSmallDog.add(totalCoastLargeDog).multiply(increasedCost);
    }

    private boolean isSpecialDay(LocalDate date){
        return date.getDayOfWeek().equals(DayOfWeek.SATURDAY) || date.getDayOfWeek().equals(DayOfWeek.SUNDAY);
    }

}
