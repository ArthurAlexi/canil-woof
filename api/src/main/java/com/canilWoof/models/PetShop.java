package com.canilWoof.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "petshop")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PetShop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    private BigDecimal costToSmallDog;

    private BigDecimal costToLargeDog;

    private Double increasedCost;

    private Double distance;
}
