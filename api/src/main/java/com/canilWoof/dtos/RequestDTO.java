package com.canilWoof.dtos;

import java.time.LocalDate;

public record RequestDTO(
        LocalDate date,
        Integer numberOfSmallDog,
        Integer numberOfLargeDog

) {
}
