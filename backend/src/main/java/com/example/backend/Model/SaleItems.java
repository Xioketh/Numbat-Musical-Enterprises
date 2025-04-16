package com.example.backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "saleItems")
public class SaleItems {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        @Column(name = "saleId")
        private String saleId;

        @Column(name = "productId")
        private String productId;

        @Column(name = "totalAmount")
        private int totalAmount;

        @Column(name = "qty")
        private int qty;

    public SaleItems(String saleId, String userId, int totalAmount, int qty) {
        this.saleId = saleId;
        this.productId = userId;
        this.totalAmount = totalAmount;
        this.qty = qty;
    }

    public SaleItems() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSaleId() {
        return saleId;
    }

    public void setSaleId(String saleId) {
        this.saleId = saleId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
