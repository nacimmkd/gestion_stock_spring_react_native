package com.nacimmkd.gestion_stock_api.models;

import com.nacimmkd.gestion_stock_api.exceptions.InsufficientStockException;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String reference;

    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "alert_threshold", nullable = false)
    private int alertThreshold;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;


    public static Product create(String name, String reference, String description,
                                 Category category, int quantity, int alertThreshold) {
        Product p = new Product();
        p.name = name;
        p.reference = reference;
        p.description = description;
        p.category = category;
        p.quantity = quantity;
        p.alertThreshold = alertThreshold;
        return p;
    }

    public void update(String name, String reference, String description,
                       Category category, int alertThreshold) {
        this.name = name;
        this.reference = reference;
        this.description = description;
        this.category = category;
        this.alertThreshold = alertThreshold;
    }

    public StockStatus getStatus() {
        if (this.quantity == 0) {
            return StockStatus.RUPTURE;
        }
        return quantity <= this.alertThreshold ? StockStatus.FAIBLE : StockStatus.NORMAL;
    }

    public void addStock(int amount) {
        this.quantity += amount;
    }

    public void removeStock(int amount) {
        if (amount > this.quantity) {
            throw new InsufficientStockException(
                    "Stock insuffisant : " + this.quantity + " en stock");
        }
        this.quantity -= amount;
    }

}
