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

    @Column(name = "finalAmount")
    private int finalAmount;

    @Column(name = "discount_rate")
    private int discount_rate;

    @Column(name = "payment_type")
    private String payment_type;

    @Column(name = "status")
    private int status;

    @Column(name = "depositAmount")
    private double depositAmount;

    @Column(name = "mounthly_payment")
    private double mounthly_payment;

    @Column(name = "depositRate")
    private double depositRate;

    @Column(name = "remainingMounths")
    private int remainingMounths;


    public Sales(String saleId, String userId, int totalAmount, String soldDate, int qtyTot) {
        this.saleId = saleId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.soldDate = soldDate;
        this.qtyTot = qtyTot;
    }

    public Sales() {

    }

    public String getPayment_type() {
        return payment_type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void setPayment_type(String payment_type) {
        this.payment_type = payment_type;
    }

    public int getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(int finalAmount) {
        this.finalAmount = finalAmount;
    }

    public int getDiscount_rate() {
        return discount_rate;
    }

    public void setDiscount_rate(int discount_rate) {
        this.discount_rate = discount_rate;
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

    public double getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(double depositAmount) {
        this.depositAmount = depositAmount;
    }

    public double getMounthly_payment() {
        return mounthly_payment;
    }

    public void setMounthly_payment(double monthly) {
        this.mounthly_payment = monthly;
    }

    public double getDepositRate() {
        return depositRate;
    }

    public void setDepositRate(double depositRate) {
        this.depositRate = depositRate;
    }

    public int getRemainingMounths() {
        return remainingMounths;
    }

    public void setRemainingMounths(int remainingMounths) {
        this.remainingMounths = remainingMounths;
    }

    public void setQtyTot(int qtyTot) {
        this.qtyTot = qtyTot;
    }
}
