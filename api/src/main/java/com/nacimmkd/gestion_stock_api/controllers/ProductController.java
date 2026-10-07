package com.nacimmkd.gestion_stock_api.controllers;

import com.nacimmkd.gestion_stock_api.dtos.*;
import com.nacimmkd.gestion_stock_api.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductSummaryDto>> getProducts() {
        return ResponseEntity.ok(this.productService.getAll());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDetailsDto> getProduct(
            @PathVariable UUID productId) {

        return ResponseEntity.ok(this.productService.getById(productId));
    }


    @PostMapping
    public ResponseEntity<ProductDetailsDto> createProduct(
            @Valid @RequestBody ProductCreateRequest request,
            UriComponentsBuilder uriBuilder) {

        var product = this.productService.create(request);

        var location = uriBuilder
                .path("/api/v1/products/{id}")
                .buildAndExpand(product.id())
                .toUri();
        return ResponseEntity.created(location).body(product);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductDetailsDto> updateProduct(
            @PathVariable UUID productId,
            @Valid @RequestBody ProductUpdateRequest request) {
        return ResponseEntity.ok(
                this.productService.update(productId, request)
        );
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable UUID productId) {

        this.productService.delete(productId);
        return ResponseEntity.noContent().build();
    }

}
