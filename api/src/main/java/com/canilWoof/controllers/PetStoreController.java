package com.canilWoof.controllers;

import com.canilWoof.dtos.RequestDTO;
import com.canilWoof.services.PetStoreService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/petstore")
@CrossOrigin(originPatterns = {"*"})
public class PetStoreController {

    private final PetStoreService SERVICE;

    public PetStoreController(PetStoreService service) {
        SERVICE = service;
    }

    @PostMapping("/choice")
    public ResponseEntity<?> choiceBestPetShop(@RequestBody RequestDTO dto){
        if(dto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("the body cannot be null");
        }

        return ResponseEntity.ok(this.SERVICE.choiceBestPetShop(dto));
    }

}
