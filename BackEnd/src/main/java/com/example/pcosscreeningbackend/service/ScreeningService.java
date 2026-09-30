package com.example.pcosscreeningbackend.service;

import com.example.pcosscreeningbackend.dto.MLPredictionResponse;
import com.example.pcosscreeningbackend.dto.ScreeningRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class ScreeningService {

    private final RestTemplate restTemplate = new RestTemplate();

    public MLPredictionResponse processScreening(ScreeningRequest request) {

        System.out.println("Sending screening data to ML API...");

        Map<String, Object> data = new HashMap<>();

        // Numeric features
        data.put("Age_Years", request.getAge_Years());
        data.put("BMI", request.getBMI());
        data.put("Menstrual_Duration_Days",
                request.getMenstrual_Duration_Days());

        // Convert Yes/No → 1/0
        data.put("Cycle_Regularity",
                yesNoToInt(request.getCycle_Regularity()));

        data.put("Weight_Gain",
                yesNoToInt(request.getWeight_Gain()));

        data.put("Hair_Growth",
                yesNoToInt(request.getHair_Growth()));

        data.put("Skin_Darkening",
                yesNoToInt(request.getSkin_Darkening()));

        data.put("Hair_Loss",
                yesNoToInt(request.getHair_Loss()));

        data.put("Pimples",
                yesNoToInt(request.getPimples()));

        data.put("Fast_Food",
                yesNoToInt(request.getFast_Food()));

        data.put("Regular_Exercise",
                yesNoToInt(request.getRegular_Exercise()));


        // HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(data, headers);


        // Python ML API
        String mlApiUrl = "http://127.0.0.1:5000/predict";


        // Send request to Flask
        ResponseEntity<MLPredictionResponse> response =
                restTemplate.postForEntity(
                        mlApiUrl,
                        entity,
                        MLPredictionResponse.class
                );


        return response.getBody();
    }


    // Converts Yes/No into 1/0
    private int yesNoToInt(String value) {

        if (value == null) {
            return 0;
        }

        return value.equalsIgnoreCase("Yes") ? 1 : 0;
    }
}