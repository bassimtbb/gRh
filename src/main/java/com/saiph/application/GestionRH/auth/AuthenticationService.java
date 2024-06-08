package com.saiph.application.GestionRH.auth;

import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.exception.ResourceAlreadyExistsException;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.repository.UserRepository;
import com.saiph.application.GestionRH.security.JwtService;
import com.saiph.application.GestionRH.services.DepartementCrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final DepartementCrudService departementService;
    private final AuthenticationManager authenticationManager;


    public RegistrationRequest register(RegistrationRequest request) throws ResourceNotFoundException ,ResourceAlreadyExistsException{
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new ResourceAlreadyExistsException("Email already exists");
    }

    // Check if CIN already exists
    if (userRepository.findByCin(request.getCin()).isPresent()) {
        throw new ResourceAlreadyExistsException("CIN already exists");
    }
        var userdetail = User.builder()

                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(true)
                .role(request.getRole())
                .DEmbauche(request.getDEmbauche())
                .email(request.getEmail())
                .cin(request.getCin())
                .img(request.getImg())
                .address(request.getAddress())
                .service(request.getService())
                .sexe(request.getSexe())
                .departement(null)
                .EJuridic(request.getEJuridic())
                .phonenumber(request.getPhonenumber())
                .build();
    // Check if email already exists

        userRepository.save(userdetail);
        if (request.getDepartement()!=null){
        departementService.addEmpl(request.getDepartement().getId() ,userdetail.getId()) ;}
        System.out.println(userdetail.getDepartement()!=null);
        return  request;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.fullName());
        claims.put("Id", user.getId() );
        var jwtToken = jwtService.generateToken(claims, (User) auth.getPrincipal());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

public User resetPassword(Long id, String email, String cin, String phoneNumber) throws ResourceNotFoundException {
    Optional<User> user = userRepository.findById(id);

    if (!user.isPresent()) {
        throw new ResourceNotFoundException("User not found");
    }

    User foundUser = user.get();

    if (userRepository.findByEmail(email).isPresent() && !Objects.equals(foundUser.getEmail(), email)) {
        throw new ResourceAlreadyExistsException("Email already exists");
    }

    if (!Objects.equals(foundUser.getCin(), cin)) {
        throw new ResourceAlreadyExistsException("CIN does not match");
    }

    if (!Objects.equals(foundUser.getPhonenumber(), phoneNumber)) {
        throw new ResourceAlreadyExistsException("Phone number does not match");
    }

    foundUser.setPassword(this.passwordEncoder.encode("password")); // Ensure you define a new password or generate it
    userRepository.save(foundUser);
    return foundUser;
}

public User updateInfoconfidentiel(Long id, String password, String email, String phoneNumber) throws ResourceNotFoundException {
    Optional<User> userOptional = userRepository.findById(id);

    if (!userOptional.isPresent()) {
        throw new ResourceNotFoundException("User not found");
    }

    User user = userOptional.get();

    if (userRepository.findByEmail(email).isPresent() && !Objects.equals(user.getEmail(), email)) {
        throw new ResourceAlreadyExistsException("Email already exists");
    }

    user.setPassword(this.passwordEncoder.encode(password));
    user.setEmail(email);
    user.setPhonenumber(phoneNumber);
    userRepository.save(user);
    return user;
}
public User updateInfopersonnel(Long id, String firstname , String lastname, String cin , String Sexe , Date Dembauche , String adresse) throws ResourceNotFoundException {
    Optional<User> userOptional = userRepository.findById(id);

    if (!userOptional.isPresent()) {
        throw new ResourceNotFoundException("User not found");
    }
    User user = userOptional.get();
    // Check if CIN already exists
    if (userRepository.findByEmail(cin).isPresent() && !Objects.equals(user.getEmail(), cin)) {
        throw new ResourceAlreadyExistsException("CIN already exists");
    }

    user.setFirstname(firstname);
    user.setLastname(lastname);
    user.setCin(cin);
    user.setSexe(Sexe);
    user.setDEmbauche(Dembauche);
    user.setAddress(adresse);
    userRepository.save(user);
    return user;
}

public User lockCompte(Long id) throws ResourceNotFoundException {
    Optional<User> userOptional = userRepository.findById(id);
    if (!userOptional.isPresent()) {
        throw new ResourceNotFoundException("User not found");
    }
    User user = userOptional.get();
    user.setAccountLocked(true);
    userRepository.save(user);
    return user;
}
public User unlockCompte(Long id) throws ResourceNotFoundException {
    Optional<User> userOptional = userRepository.findById(id);
    if (!userOptional.isPresent()) {
        throw new ResourceNotFoundException("User not found");
    }
    User user = userOptional.get();
    user.setAccountLocked(false);
    userRepository.save(user);
    return user;
}
}