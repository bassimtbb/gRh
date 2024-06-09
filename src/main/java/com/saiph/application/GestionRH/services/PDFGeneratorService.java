package com.saiph.application.GestionRH.services;

import com.lowagie.text.DocumentException;
import com.saiph.application.GestionRH.Domain.dto.DemandesDto.*;
import com.saiph.application.GestionRH.Domain.dto.UserDto;
import com.saiph.application.GestionRH.Domain.entities.User;
import com.saiph.application.GestionRH.Enum.PDFTemplateName;
import com.saiph.application.GestionRH.services.DemandesCrudService.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.OutputStream;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class PDFGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(PDFGeneratorService.class);

    private final SpringTemplateEngine templateEngine;
    private final AcompteCrudService acompteService;
    private final CongeCrudService congeService;
    private final AutorisationTeletravailCrudService autorisationTeletravailService;
    private final AutorisationSortieCrudService autorisationSortieService;
    private final AutorisationTravailSupCrudService autorisationTravailSupService;
    private final PretCrudService pretService;
    private final ChangementHoraireCrudService changementHoraireService;
    private final DemandeCrudService demandeService;

    // Method to convert time in milliseconds to HH:MM format
    private String convertTimeToHHMM(Long timeMS) {
        long seconds = timeMS / 1000;
        long hours = seconds / 3600;
        long minutes = (seconds % 3600) / 60;
        return String.format("%02d:%02d", hours, minutes);
    }

    public String PdfValidationD(HttpServletResponse response, PDFTemplateName pdfTemplate, Long demandeId) throws IOException {

        response.setContentType("application/pdf");
        String templateName = pdfTemplate.getName();
        Map<String, Object> properties = new HashMap<>();
        Context context = new Context();
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        logger.info("Generating PDF for TypeDemande: {}", pdfTemplate);
        logger.info("demandeId: {}", demandeId);

        // Initialize context and properties
        User user = demandeService.findById(demandeId).getUtilisateur();
        properties.put("nomPrenom", user.fullName());
        properties.put("entiteJuridique", user.getEJuridic());
        properties.put("matricule", user.getId());

        // Fetch specific data based on pdfTemplate
           try {
            switch (pdfTemplate) {
                case PRET:
                    PretDto pret = pretService.findById(demandeId);
                    properties.put("montant", pret.getMontant());
                    properties.put("motif", pret.getMotif());
                    properties.put("credit", pret.getCredit());
                    properties.put("remboursement", pret.getRemboursement());
                    break;
                case CONGE:
                    CongeDto conge = congeService.findById(demandeId);
                    properties.put("duree", conge.getDuree());
                    properties.put("debut", conge.getDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter));
                    properties.put("motif", conge.getMotif());
                    break;
                case CHANGEMENT_HORAIRE:
                    ChangementHoraireDto changementHoraire = changementHoraireService.findById(demandeId);
                    properties.put("ancienH", changementHoraire.getAncienH());
                    properties.put("fin", changementHoraire.getFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter));
                    properties.put("motif", changementHoraire.getMotif());
                    properties.put("debut", changementHoraire.getDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter));
                    properties.put("nouvelH", changementHoraire.getNouvelH());
                    break;
                case AUTORISATION_TRAVAIL_SUP:
                    AutorisationTravailSupDto autorisationTravailSup = autorisationTravailSupService.findById(demandeId);
                    properties.put("date", autorisationTravailSup.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter));
                    properties.put("motif", autorisationTravailSup.getMotif());
                    properties.put("hacces", autorisationTravailSup.getHacces());
                    properties.put("hsortie", autorisationTravailSup.getHsortie());
                    break;
                case AUTORISATION_TELETRAVAIL:
                    AutorisationTeletravailDto autorisationTeletravail = autorisationTeletravailService.findById(demandeId);
                    properties.put("debut", autorisationTeletravail.getDebut().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter));
                    properties.put("fin", autorisationTeletravail.getFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter));
                    properties.put("contact", autorisationTeletravail.getContact());
                    properties.put("telephone", autorisationTeletravail.getTelephone());
                    properties.put("lieu", autorisationTeletravail.getLieu());
                    properties.put("tache", autorisationTeletravail.getTache());
                    break;
                case AUTORISATION_SORTIE:
                    AutorisationSortieDto autorisationSortie = autorisationSortieService.findById(demandeId);
                    String formattedDate = autorisationSortie.getDateS().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter);
                    String formattedHsortie = convertTimeToHHMM(autorisationSortie.getHsortie().getTime());
                    String formattedHretour = convertTimeToHHMM(autorisationSortie.getHretour().getTime());
                    properties.put("dateS", formattedDate);
                    properties.put("hsortie", formattedHsortie);
                    properties.put("hretour", formattedHretour);
                    properties.put("duree", autorisationSortie.getDuree());
                    properties.put("motif", autorisationSortie.getMotif());
                    properties.put("isTemporaire", autorisationSortie.getIsTemporaire());
                    break;
                case ACOMPTE:
                    AcompteDto acompte = acompteService.findById(demandeId);
                    properties.put("montant", acompte.getMontant());
                    properties.put("typeA", acompte.getTypeA());
                    break;
                default:
                    logger.error("Invalid TypeDemande: {}", pdfTemplate);
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid TypeDemande: " + pdfTemplate);
                    return"";
            }
        } catch (Exception e) {
            logger.error("Error processing PDF generation", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing PDF generation");
            return"";
        }

        context.setVariables(properties);

        // Generate HTML from template
        String html = templateEngine.process(templateName, context);
        logger.info("Generated HTML: {}", html);
return html;
        // Generate PDF from HTML
//        try (OutputStream os = response.getOutputStream()) {
//            ITextRenderer renderer = new ITextRenderer();
//            renderer.setDocumentFromString(html);
//            renderer.layout();
//            renderer.createPDF(os, false);
//            renderer.finishPDF();
//        } catch (DocumentException e) {
//            logger.error("Error generating PDF: ", e);
//            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error generating PDF.");
//        } catch (Exception e) {
//            logger.error("Unexpected error: ", e);
//            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Unexpected error occurred.");
//        }
    }}