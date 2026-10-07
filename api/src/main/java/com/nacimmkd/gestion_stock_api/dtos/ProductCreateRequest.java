package com.nacimmkd.gestion_stock_api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record ProductCreateRequest(
        @NotBlank String name,
        @NotBlank String reference,
        @NotNull UUID categoryId,
        @NotNull @PositiveOrZero int quantity,
        @NotNull @PositiveOrZero int alertThreshold,
        @Size(max = 1000) String description
) {
}
