package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.NotificationDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.Notification;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.Enum.TypeNotification;
import com.saiph.application.GestionRH.repository.NotificationRepository;
import com.saiph.application.GestionRH.repository.UserRepository;
import com.saiph.application.GestionRH.security.UserDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationCrudService extends GenericCrudService<Notification, NotificationDto> {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final UserDetailService userService;
    private final DepartementCrudService departementService;

        public NotificationDto SetStatut(Long notificationID) {
        NotificationDto notificationDto = this.findById( notificationID);
        Notification notification = this.convertToEntity(notificationDto);
        notification.setStatut(false);
        User user= notification.getOwner();
        user.getNotifications().add(notification);
        userRepository.save(user);
        notificationRepository.save(notification);
        return notificationDto;
    }
    public List<Notification> getNotificationByStatut(Boolean statut) {
        return notificationRepository.findByStatut(statut);
    }

    public void SendNotif(Long userId , TypeNotification type) {
        String description;
        UserDto userDto = userService.findById(userId);
        Departement departement =userDto.getDepartement();
        User SupH =departement.getManager();
        Notification notification;
        List<UserDto> RRHs = departementService.findById(Long.valueOf(3)).getListEmploye();
        switch (type) {
            case DEMANDE_A_DEPOSER:
                description = "L'employé(e) " + userDto.getFirstname() + " " + userDto.getLastname() + " a déposé(e) une demande.";
                 notification=Notification.builder()
                        .Type(TypeNotification.DEMANDE_A_DEPOSER)
                        .Description(description)
                        .owner(userService.convertToEntity(userDto))
                        .statut(true)
                        .build();
                notificationRepository.save(notification);
                 SupH.getNotifications().add(notification);
                 userRepository.save(SupH);
                break;
            case DEMANDE_REJETEE_RRH:
                description = "Votre demande a été refusée par le responsable RH.";
                 notification=Notification.builder()
                        .Type(TypeNotification.DEMANDE_REJETEE_RRH)
                        .Description(description)
                        .owner(userService.convertToEntity(userDto))
                        .statut(true)
                        .build();
                notificationRepository.save(notification);
                 userDto.getNotifications().add(notification);
                 userRepository.save(userService.convertToEntity(userDto));
                break;
            case DEMANDE_REJETEE_SUPH:
                description = "Votre demande a été refusée par le supérieur hiérarchique .";
                   notification=Notification.builder()
                        .Type(TypeNotification.DEMANDE_REJETEE_SUPH)
                        .Description(description)
                        .owner(userService.convertToEntity(userDto))
                        .statut(true)
                        .build();
                notificationRepository.save(notification);
                 userDto.getNotifications().add(notification);
                 userRepository.save(userService.convertToEntity(userDto));
                break;
            case DEMANDE_VALIDEE_RRH:
                description = "Votre demande a été acceptée par le responsable RH.";
                     notification=Notification.builder()
                        .Type(TypeNotification.DEMANDE_VALIDEE_RRH)
                        .Description(description)
                        .owner(userService.convertToEntity(userDto))
                        .statut(true)
                        .build();
                notificationRepository.save(notification);
                 userDto.getNotifications().add(notification);
                 userRepository.save(userService.convertToEntity(userDto));
                break;
            case DEMANDE_VALIDEE_SUPH:
                description = "Votre demande a été acceptée par le supérieur hiérarchique .";

                notification=Notification.builder()
                        .Type(TypeNotification.DEMANDE_VALIDEE_SUPH)
                        .Description(description)
                        .owner(userService.convertToEntity(userDto))
                        .statut(true)
                        .build();
                notificationRepository.save(notification);
                 userDto.getNotifications().add(notification);
                 userRepository.save(userService.convertToEntity(userDto));

                 description = "L'employé(e) " + userDto.getFirstname() + " " + userDto.getLastname() + " a déposé(e) une demande.";
                 notification=Notification.builder()
                        .Type(TypeNotification.DEMANDE_VALIDEE_SUPH)
                        .Description(description)
                        .owner(userService.convertToEntity(userDto))
                        .statut(true)
                        .build();
                notificationRepository.save(notification);
                for (UserDto rrh : RRHs) {
                    rrh.getNotifications().add(notification);
                    userRepository.save(userService.convertToEntity(rrh));
                }
                break;
            case EVENEMENT_INSCRIRE:
                description = "L'employé(e) " + userDto.getFirstname() + " " + userDto.getLastname() + " a été inscrit à un événement.";
                notification = Notification.builder()
                    .Type(TypeNotification.EVENEMENT_INSCRIRE)
                    .Description(description)
                    .owner(userService.convertToEntity(userDto))
                    .statut(true)
                    .build();
            notificationRepository.save(notification);
                    for (UserDto rrh : RRHs) {
                    rrh.getNotifications().add(notification);
                    userRepository.save(userService.convertToEntity(rrh));
                }
                break;
            case FORMATION_INSCRIRE:
                description = "L'employé(e) " + userDto.getFirstname() + " " + userDto.getLastname() + " a été inscrit à une formation.";
                notification = Notification.builder()
                    .Type(TypeNotification.FORMATION_INSCRIRE)
                    .Description(description)
                    .owner(userService.convertToEntity(userDto))
                    .statut(true)
                    .build();
            notificationRepository.save(notification);
              for (UserDto rrh : RRHs) {
                    rrh.getNotifications().add(notification);
                    userRepository.save(userService.convertToEntity(rrh));}
                break;
            default:
                // Handle unexpected enum values gracefully (e.g., log a warning or return a default message)
                description = "Notification de type inconnu.";
        };
    }

    @Override
    protected CrudRepository getRepository() {
        return notificationRepository;
    }
}
