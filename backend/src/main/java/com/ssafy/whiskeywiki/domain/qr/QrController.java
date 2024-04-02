package com.ssafy.whiskeywiki.domain.qr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.rmi.server.ExportException;

@Slf4j
@RestController
public class QrController {

    @GetMapping("/qr/{chatroomId}")
    public ResponseEntity<byte[]> createQr(@PathVariable int chatroomId) throws WriterException, IOException {

        int width = 100;
        int height = 100;
        String url = "www.naver.com";

        try {
            // url -> qr code
            BitMatrix encode = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height);

            // output stream
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(encode, "PNG", byteArrayOutputStream);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(byteArrayOutputStream.toByteArray());
        } catch (Exception e) {
            log.warn("create qr error(= {})", e);
        }

        return null;
    }
}
