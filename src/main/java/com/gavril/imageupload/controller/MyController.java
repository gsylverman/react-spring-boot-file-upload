package com.gavril.imageupload.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/upload")
public class MyController {

    @PostMapping(
            path = "/api",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadImage(@RequestParam("file") MultipartFile file) {
        Path filepath = Paths.get("src/main/resources/images/", file.getOriginalFilename());

        try (OutputStream os = Files.newOutputStream(filepath)) {
            os.write(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping(path = "/api/multiple")
    public String uploadFiles(@RequestParam("files") List<MultipartFile> files) {
        files.stream().forEach(file -> {
            String name = file.getOriginalFilename();
            Path filepath = FileSystems.getDefault().getPath("src/main/resources/images/", file.getOriginalFilename());
            try (OutputStream outputStream = Files.newOutputStream(filepath)) {
                outputStream.write(file.getBytes());
                System.out.println(name + " saved to disk");
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        return "Uploaded: " + files.size() + " files";
    }
}
