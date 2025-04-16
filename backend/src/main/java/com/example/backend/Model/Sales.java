package com.example.backend.Model;

import javax.persistence.*;

@Entity
@Table(name = "sales")
public class Sales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "saleId")
    private String saleId;

    @Column(name = "userId")
    private String userId;

    @Column(name = "totalAmount")
    private int totalAmount;

    @Column(name = "soldDate")
    private String soldDate;

    @Column(name = "qtyTot")
    private int qtyTot;


    public Sales(String saleId, String userId, int totalAmount, String soldDate, int qtyTot) {
        this.saleId = saleId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.soldDate = soldDate;
        this.qtyTot = qtyTot;
    }

    public Sales() {

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getSoldDate() {
        return soldDate;
    }

    public void setSoldDate(String soldDate) {
        this.soldDate = soldDate;
    }

    public int getQtyTot() {
        return qtyTot;
    }

    public void setQtyTot(int qtyTot) {
        this.qtyTot = qtyTot;
    }
}
