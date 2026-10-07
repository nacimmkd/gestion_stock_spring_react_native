package com.nacimmkd.gestion_stock_api.services;

import com.nacimmkd.gestion_stock_api.dtos.ProductCreateRequest;
import com.nacimmkd.gestion_stock_api.dtos.ProductDetailsDto;
import com.nacimmkd.gestion_stock_api.dtos.ProductSummaryDto;
import com.nacimmkd.gestion_stock_api.dtos.ProductUpdateRequest;
import com.nacimmkd.gestion_stock_api.exceptions.CategoryNotFoundException;
import com.nacimmkd.gestion_stock_api.exceptions.ProductNotFoundException;
import com.nacimmkd.gestion_stock_api.models.Category;
import com.nacimmkd.gestion_stock_api.models.Product;
import com.nacimmkd.gestion_stock_api.repositories.CategoryRepository;
import com.nacimmkd.gestion_stock_api.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public List<ProductSummaryDto> getAll() {
        var products = this.productRepository.findAll();
        return ProductSummaryDto.of(products);
    }

    public ProductDetailsDto getById(UUID productId) {
        var product = getProductByIdOrThrow(productId);
        return ProductDetailsDto.of(product);
    }

    @Transactional
    public ProductDetailsDto create(ProductCreateRequest req) {
        var category = getCategoryByIdOrThrow(req.categoryId());
        var product = Product.create(
                req.name(),
                req.reference(),
                req.description(),
                category,
                req.quantity(),
                req.alertThreshold()
        );
        return ProductDetailsDto.of(this.productRepository.save(product));
    }

    @Transactional
    public ProductDetailsDto update(UUID productId, ProductUpdateRequest req) {
        var product = getProductByIdOrThrow(productId);
        var category = getCategoryByIdOrThrow(req.categoryId());
        product.update(
                req.name(),
                req.reference(),
                req.description(),
                category,
                req.alertThreshold()
        );
        return ProductDetailsDto.of(this.productRepository.save(product));
    }
    
    
    public void delete(UUID productId) {
        var product = getProductByIdOrThrow(productId);
        product.delete();
        this.productRepository.save(product);
    }


    private Product getProductByIdOrThrow(UUID productId) {
        return this.productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Produit introuvable"));
    }

    private Category getCategoryByIdOrThrow(UUID req) {
        return this.categoryRepository.findById(req)
                .orElseThrow(() -> new CategoryNotFoundException("Catégorie introuvable"));
    }


}
