package com.canilWoof.servicesTests;

import com.canilWoof.dtos.RequestDTO;
import com.canilWoof.dtos.ResponseDTO;
import com.canilWoof.models.PetStore;
import com.canilWoof.repositories.PetStoreRepository;
import com.canilWoof.services.PetStoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class PetStoreServiceTest {

    @Mock
    private PetStoreRepository petStoreRepository;

    private PetStoreService petStoreService;

    private List<PetStore> petStores;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        this.petStoreService = new PetStoreService(petStoreRepository);

        this.petStores = new ArrayList<PetStore>() {{
            add(new PetStore("Meu Canino Feliz", BigDecimal.valueOf(20.0), BigDecimal.valueOf(40.0), BigDecimal.valueOf(24.0), BigDecimal.valueOf(48.0), 2.0));
            add(new PetStore("Vai Rex", BigDecimal.valueOf(15.0), BigDecimal.valueOf(50.0), BigDecimal.valueOf(20.0), BigDecimal.valueOf(55.0), 1.7));
            add(new PetStore("ChowChawgas", BigDecimal.valueOf(30.0), BigDecimal.valueOf(45.0), BigDecimal.valueOf(30.0), BigDecimal.valueOf(45.0), 0.8));
        }};
    }

    @Test
    public void testChoiceBestPetShop() {

        RequestDTO requestDTO = new RequestDTO(LocalDate.of(2024,5,8), 1, 0);

        Mockito.when(petStoreRepository.findAll()).thenReturn(this.petStores);

        ResponseDTO responseDTO = this.petStoreService.choiceBestPetShop(requestDTO);

        assert(responseDTO.name().equals("Vai Rex"));
    }

    @Test
    public void testChoiceBestPetShop_inSpecialDay() {


        RequestDTO requestDTO = new RequestDTO(LocalDate.of(2024,5,11), 0, 1);

        Mockito.when(petStoreRepository.findAll()).thenReturn(this.petStores);

        ResponseDTO responseDTO = this.petStoreService.choiceBestPetShop(requestDTO);

        assert(responseDTO.name().equals("ChowChawgas"));
    }

    @Test
    public void testChoiceBestPetShop_tie() {


        RequestDTO requestDTO = new RequestDTO(LocalDate.of(2024,5,8), 2, 1);

        Mockito.when(petStoreRepository.findAll()).thenReturn(this.petStores);

        ResponseDTO responseDTO = this.petStoreService.choiceBestPetShop(requestDTO);

        assert(responseDTO.name().equals("Vai Rex"));
    }

    @Test
    public void testChoiceBestPetShop_differentRaces() {


        RequestDTO requestDTO = new RequestDTO(LocalDate.of(2024,5,8), 1, 2);

        Mockito.when(petStoreRepository.findAll()).thenReturn(this.petStores);

        ResponseDTO responseDTO = this.petStoreService.choiceBestPetShop(requestDTO);

        assert(responseDTO.name().equals("Meu Canino Feliz"));
    }
}
