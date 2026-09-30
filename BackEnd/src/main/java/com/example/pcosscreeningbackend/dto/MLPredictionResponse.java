package com.example.pcosscreeningbackend.dto;

import java.util.List;

public class MLPredictionResponse {

    private String prediction;
    private double probability;
    private List<Explanation> explanation;

    public String getPrediction() {
        return prediction;
    }

    public void setPrediction(String prediction) {
        this.prediction = prediction;
    }

    public double getProbability() {
        return probability;
    }

    public void setProbability(double probability) {
        this.probability = probability;
    }

    public List<Explanation> getExplanation() {
        return explanation;
    }

    public void setExplanation(List<Explanation> explanation) {
        this.explanation = explanation;
    }


    public static class Explanation {

        private String feature;
        private double contribution;
        private String direction;

        public String getFeature() {
            return feature;
        }

        public void setFeature(String feature) {
            this.feature = feature;
        }

        public double getContribution() {
            return contribution;
        }

        public void setContribution(double contribution) {
            this.contribution = contribution;
        }

        public String getDirection() {
            return direction;
        }

        public void setDirection(String direction) {
            this.direction = direction;
        }
    }
}