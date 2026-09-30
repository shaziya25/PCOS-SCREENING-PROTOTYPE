package com.example.pcosscreeningbackend.controller;

import com.example.pcosscreeningbackend.dto.MLPredictionResponse;
import com.example.pcosscreeningbackend.dto.ScreeningRequest;
import com.example.pcosscreeningbackend.service.ScreeningService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/screening")
@CrossOrigin(origins = "http://localhost:5173")
public class ScreeningController {

    private final ScreeningService screeningService;

    public ScreeningController(ScreeningService screeningService) {
        this.screeningService = screeningService;
    }

    @PostMapping
    public MLPredictionResponse receiveScreeningData(
            @Valid @RequestBody ScreeningRequest request) {

        return screeningService.processScreening(request);
    }
}