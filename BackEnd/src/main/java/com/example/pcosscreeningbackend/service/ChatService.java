package com.example.pcosscreeningbackend.service;

import com.example.pcosscreeningbackend.dto.ChatRequest;
import com.example.pcosscreeningbackend.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${groq.api.key}")
    private String groqApiKey;

    public ChatResponse getChatResponse(ChatRequest request) {

        String apiKey = groqApiKey;

        // API key diagnostics
        System.out.println(
                "Key exists: " + (apiKey != null)
        );

        System.out.println(
                "Key starts with gsk_: "
                        + (apiKey != null && apiKey.startsWith("gsk_"))
        );

        System.out.println(
                "Key length: "
                        + (apiKey == null ? 0 : apiKey.length())
        );


        // Groq API URL
        String url =
                "https://api.groq.com/openai/v1/chat/completions";


        // Headers
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);


        // System message
        Map<String, Object> systemMessage =
                new HashMap<>();

        systemMessage.put(
                "role",
                "system"
        );

        systemMessage.put(
                "content",
                """
                You are a PCOS Screening Assistant for a college research project.

                Your role is to provide general educational information about PCOS,
                explain screening results and machine-learning model outputs in simple
                language, and help users understand the screening process.

                Important rules:
                - This is a screening system, NOT a medical diagnosis.
                - Never claim that the user definitely has or does not have PCOS.
                - Never prescribe medicines or give treatment instructions.
                - Encourage the user to consult a qualified healthcare professional
                  for diagnosis or medical concerns.
                - Explain medical concepts in simple, friendly language.
                - If asked about the machine-learning prediction, explain that it
                  represents model output, not medical certainty.
                - Explain XAI feature contributions as model behavior, not medical
                  causes.
                - Never describe an XAI feature as proof that the user has or does
                  not have PCOS.
                """
        );


        // User message + screening context
        String userContent = request.getMessage();

        if (request.getContext() != null
                && !request.getContext().isBlank()) {

            userContent += """

                    
                    SCREENING CONTEXT:
                    %s
                    """.formatted(
                    request.getContext()
            );
        }


        Map<String, Object> userMessage =
                new HashMap<>();

        userMessage.put(
                "role",
                "user"
        );

        userMessage.put(
                "content",
                userContent
        );


        // Request body
        Map<String, Object> body =
                new HashMap<>();

        body.put(
                "model",
                "openai/gpt-oss-20b"
        );

        body.put(
                "messages",
                List.of(
                        systemMessage,
                        userMessage
                )
        );

        body.put(
                "temperature",
                0.3
        );

        body.put(
                "max_completion_tokens",
                500
        );


        // Send request to Groq
        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(
                        body,
                        headers
                );


        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        url,
                        entity,
                        Map.class
                );


        // Read Groq response
        Map responseBody =
                response.getBody();

        List choices =
                (List) responseBody.get("choices");

        Map firstChoice =
                (Map) choices.get(0);

        Map message =
                (Map) firstChoice.get("message");

        String aiResponse =
                (String) message.get("content");


        return new ChatResponse(aiResponse);
    }
}