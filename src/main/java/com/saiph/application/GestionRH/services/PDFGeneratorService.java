package com.example.pdfgenerator.service;

import com.lowagie.text.DocumentException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Service
public class PDFGeneratorService {
    public void export(HttpServletResponse response) throws IOException, DocumentException {
        // Prepare the response
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=example.pdf");

        // Load your HTML template
        String html = getHtmlTemplate();

        // Convert HTML to PDF
        try (OutputStream os = response.getOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(html);
            renderer.layout();
            renderer.createPDF(os, false);
            renderer.finishPDF();
        }
    }

    private String getHtmlTemplate() {
        // Example HTML template
        return "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Helvetica; }" +
                ".title { font-size: 18pt; text-align: center; font-weight: bold; }" +
                ".content { font-size: 12pt; text-align: left; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='title'>This is a title.</div>" +
                "<div class='content'>This is a paragraph.</div>" +
                "</body>" +
                "</html>";
    }
}
