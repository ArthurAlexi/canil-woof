package com.canilWoof.infra;


import com.canilWoof.models.PetStore;
import com.canilWoof.repositories.PetStoreRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class DatabaseInitializer implements ApplicationRunner {

    private PetStoreRepository petStoreRepository;

    public DatabaseInitializer(PetStoreRepository petStoreRepository) {
        this.petStoreRepository = petStoreRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        PetStore petStore1 = new PetStore("Meu Canino Feliz", BigDecimal.valueOf(20.0), BigDecimal.valueOf(40.0), BigDecimal.valueOf(24.0), BigDecimal.valueOf(48.0), 2.0);
        PetStore petStore2 = new PetStore("Vai Rex", BigDecimal.valueOf(15.0), BigDecimal.valueOf(50.0), BigDecimal.valueOf(20.0), BigDecimal.valueOf(55.0), 1.7);
        PetStore petStore3 = new PetStore("ChowChawgas", BigDecimal.valueOf(30.0), BigDecimal.valueOf(45.0), BigDecimal.valueOf(30.0), BigDecimal.valueOf(45.0), 0.8);

        petStoreRepository.saveAll(List.of(petStore1, petStore2, petStore3));
    }
}
