package com.saiph.application.GestionRH.auth;

import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public @Valid ResponseEntity<RegistrationRequest> register(
            @RequestBody @Valid RegistrationRequest request
    ) throws ResourceNotFoundException {
        return ResponseEntity.ok(service.register(request));
    }
@PutMapping("/{id}/reset-password")
    public ResponseEntity<User> resetPassword(
            @RequestParam String email,
            @RequestParam String cin,
            @RequestParam String phoneNumber) throws ResourceNotFoundException {
        User user = service.resetPassword( email, cin, phoneNumber);
        return ResponseEntity.ok(user);
    }

@PutMapping("/{id}/update-info-personnel")
public ResponseEntity<User> updateInfopersonnel(
        @PathVariable Long id,
        @RequestParam String firstname,
        @RequestParam String lastname,
        @RequestParam String cin,
        @RequestParam String sexe,
        @RequestParam String dembauche, // Change type to String
        @RequestParam String adresse) throws ResourceNotFoundException {
    // Parse the date string to a Date object
    Date parsedDate = new Date();
    try {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        parsedDate = sdf.parse(dembauche);
    } catch (ParseException e) {
        // Handle parsing exception
        // Return appropriate error response or throw an exception
    }

    User userDto = service.updateInfopersonnel(id, firstname, lastname, cin, sexe, parsedDate, adresse);
    return ResponseEntity.ok(userDto);
}


    @PutMapping("/{id}/lock-account")
    public ResponseEntity<User> lockCompte(@PathVariable Long id) throws ResourceNotFoundException {
        User user = service.lockCompte(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}/unlock-account")
    public ResponseEntity<User> unlockCompte(@PathVariable Long id) throws ResourceNotFoundException {
        User user = service.unlockCompte(id);
        return ResponseEntity.ok(user);
    }
    @PutMapping("/{id}/update-info")
    public ResponseEntity<User> updateInfoconfidentiel(
            @PathVariable Long id,
            @RequestParam String password,
            @RequestParam String email,
            @RequestParam String phoneNumber) throws ResourceNotFoundException {
        User user = service.updateInfoconfidentiel(id, password, email, phoneNumber);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestParam String request) {
        try {
            return ResponseEntity.ok(service.refreshToken(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }


}