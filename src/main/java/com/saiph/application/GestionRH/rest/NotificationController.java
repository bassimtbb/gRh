package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Domain.dto.NotificationDto;
import com.saiph.application.GestionRH.Domain.entities.Notification;
import com.saiph.application.GestionRH.exception.ResourceNotFoundException;
import com.saiph.application.GestionRH.services.GenericCrudService;
import com.saiph.application.GestionRH.services.NotificationCrudService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notification")
@RequiredArgsConstructor
@Tag(name = "Notification")
public class NotificationController extends GenericCrudController<Notification, NotificationDto> {

    private final NotificationCrudService notificationCrudService;

    @PostMapping("/statut/{notificationID}")
    public NotificationDto SetStatut(
              @PathVariable("notificationID") Long notificationID
    ) throws ResourceNotFoundException {
        NotificationDto demande = notificationCrudService.SetStatut(notificationID);
        return demande;
    }
    @GetMapping("/statut")
    public ResponseEntity<List<Notification>> getNotificationByStatut(
            @Valid @RequestBody  Boolean statut) {
        List<Notification> notification = notificationCrudService.getNotificationByStatut(statut);
        if (notification == null || notification.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(notification);
    }


    @Override
    protected GenericCrudService<Notification, NotificationDto> getCrudService() {
        return notificationCrudService;
    }
}
