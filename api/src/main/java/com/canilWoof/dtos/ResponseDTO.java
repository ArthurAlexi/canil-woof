package com.canilWoof.dtos;

import java.math.BigDecimal;

public record ResponseDTO(
        String name,
        Double distance,
        BigDecimal totalCost
) {
}
