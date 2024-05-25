package com.saiph.application.GestionRH.rest;

import com.saiph.application.GestionRH.Enum.PDFTemplateName;
import com.saiph.application.GestionRH.services.PDFGeneratorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequiredArgsConstructor
@Tag(name = "Pdf")
@RequestMapping("/pdf")
public class PDFExportController {

    private final PDFGeneratorService pdfGeneratorService;

    @PostMapping("/generate/{demandeId}")
    public void generatePdf(@PathVariable("demandeId") Long demandeId,
                            @RequestParam("typeDemande") String typeDemande,
                            HttpServletResponse response) throws IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);

        try {
            PDFTemplateName templateName = PDFTemplateName.valueOf(typeDemande);
            pdfGeneratorService.PdfValidationD(response, templateName, demandeId);
        } catch (IllegalArgumentException e) {
            response.sendError(HttpStatus.BAD_REQUEST.value(), "Invalid typeDemande value.");
        } catch (Exception e) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error generating PDF.");
        }
    }
}
