package com.canilWoof.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "petstore")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    private BigDecimal costToSmallDog;

    private BigDecimal costToLargeDog;

    private BigDecimal specialCostToSmallDog;

    private BigDecimal specialCostToLargeDog;

    private Double distance;

    public PetStore(
            String name,
            BigDecimal costToSmallDog,
            BigDecimal costToLargeDog,
            BigDecimal specialCostToSmallDog,
            BigDecimal specialCostToLargeDog ,
            Double distance ) {

        this.name = name;
        this.costToSmallDog = costToSmallDog;
        this.costToLargeDog = costToLargeDog;
        this.specialCostToSmallDog = specialCostToSmallDog;
        this.specialCostToLargeDog = specialCostToLargeDog;
        this.distance = distance;
    }
}
