package com.canilWoof.repositories;

import com.canilWoof.models.PetStore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetStoreRepository extends JpaRepository<PetStore, Integer> {
}
