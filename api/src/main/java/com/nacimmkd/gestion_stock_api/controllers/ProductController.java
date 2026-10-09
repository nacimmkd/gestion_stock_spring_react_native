package com.nacimmkd.gestion_stock_api.controllers;

import com.nacimmkd.gestion_stock_api.dtos.*;
import com.nacimmkd.gestion_stock_api.models.StockStatus;
import com.nacimmkd.gestion_stock_api.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseEntity<Page<ProductSummaryDto>> getProducts(
            @PageableDefault(size = 6, sort = "createdAt" , direction = Sort.Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false)StockStatus status
            ) {
        return ResponseEntity.ok(this.productService.getAll(
                search,
                categoryId,
                status,
                pageable
        ));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductDetailsDto> getProduct(
            @PathVariable UUID productId) {

        return ResponseEntity.ok(this.productService.getById(productId));
    }

    @GetMapping("/out-of-stock/count")
    public ResponseEntity<Long> countOutOfStock() {
        return ResponseEntity.ok(this.productService.countOutOfStock());
    }

    @GetMapping("/status-counts")
    public ResponseEntity<List<StockCountDto>> countByStatus() {
        return ResponseEntity.ok(this.productService.countByStatus());
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

    @PatchMapping("/{productId}/stock")
    public ResponseEntity<ProductDetailsDto> updateStock(
            @PathVariable UUID productId,
            @Valid @RequestBody StockUpdateRequest request) {
        return ResponseEntity.ok(this.productService.updateStock(productId, request));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable UUID productId) {

        this.productService.delete(productId);
        return ResponseEntity.noContent().build();
    }

}
