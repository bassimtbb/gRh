package com.saiph.application.GestionRH.services;

import com.saiph.application.GestionRH.Domain.dto.DepartementDto;
import com.saiph.application.GestionRH.Domain.dto.NotificationDto;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.Departement;
import com.saiph.application.GestionRH.Domain.entities.DepartementName;
import com.saiph.application.GestionRH.Domain.entities.Notification;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.Enum.RoleType;
import com.saiph.application.GestionRH.repository.DepartementRepository;
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

        public NotificationDto SetStatut(Long notificationID) {
        NotificationDto notificationDto = this.findById( notificationID);
        Notification notification = this.convertToEntity(notificationDto);
        notification.setStatut(true);
        notificationRepository.save(notification);
        return notificationDto;
    }
    public List<Notification> getNotificationByStatut(Boolean statut) {
        return notificationRepository.findByStatut(statut);
    }

    @Override
    protected CrudRepository getRepository() {
        return notificationRepository;
    }
}
