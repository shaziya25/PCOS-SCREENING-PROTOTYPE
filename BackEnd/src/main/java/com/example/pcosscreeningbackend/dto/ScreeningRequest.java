package com.example.pcosscreeningbackend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ScreeningRequest {

    @NotNull
    @Positive
    private Double Age_Years;

    @NotNull
    @DecimalMin(value = "0.1")
    private Double BMI;

    @NotBlank
    private String Cycle_Regularity;

    @NotNull
    @Positive
    private Integer Menstrual_Duration_Days;

    @NotBlank
    private String Weight_Gain;

    @NotBlank
    private String Hair_Growth;

    @NotBlank
    private String Skin_Darkening;

    @NotBlank
    private String Hair_Loss;

    @NotBlank
    private String Pimples;

    @NotBlank
    private String Fast_Food;

    @NotBlank
    private String Regular_Exercise;


    public Double getAge_Years() {
        return Age_Years;
    }

    public void setAge_Years(Double age_Years) {
        Age_Years = age_Years;
    }

    public Double getBMI() {
        return BMI;
    }

    public void setBMI(Double BMI) {
        this.BMI = BMI;
    }

    public String getCycle_Regularity() {
        return Cycle_Regularity;
    }

    public void setCycle_Regularity(String cycle_Regularity) {
        Cycle_Regularity = cycle_Regularity;
    }

    public Integer getMenstrual_Duration_Days() {
        return Menstrual_Duration_Days;
    }

    public void setMenstrual_Duration_Days(Integer menstrual_Duration_Days) {
        Menstrual_Duration_Days = menstrual_Duration_Days;
    }

    public String getWeight_Gain() {
        return Weight_Gain;
    }

    public void setWeight_Gain(String weight_Gain) {
        Weight_Gain = weight_Gain;
    }

    public String getHair_Growth() {
        return Hair_Growth;
    }

    public void setHair_Growth(String hair_Growth) {
        Hair_Growth = hair_Growth;
    }

    public String getSkin_Darkening() {
        return Skin_Darkening;
    }

    public void setSkin_Darkening(String skin_Darkening) {
        Skin_Darkening = skin_Darkening;
    }

    public String getHair_Loss() {
        return Hair_Loss;
    }

    public void setHair_Loss(String hair_Loss) {
        Hair_Loss = hair_Loss;
    }

    public String getPimples() {
        return Pimples;
    }

    public void setPimples(String pimples) {
        Pimples = pimples;
    }

    public String getFast_Food() {
        return Fast_Food;
    }

    public void setFast_Food(String fast_Food) {
        Fast_Food = fast_Food;
    }

    public String getRegular_Exercise() {
        return Regular_Exercise;
    }

    public void setRegular_Exercise(String regular_Exercise) {
        Regular_Exercise = regular_Exercise;
    }
}