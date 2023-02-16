package com.bookingapp.backend.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class ImageUtils {
    private static final Logger logger = LoggerFactory.getLogger(ImageUtils.class);
    public static byte[] compressImage(byte[] data) {
        logger.info("ImageUtils:compressImage");

        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[5 * 1024];
        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }

        try {
            outputStream.close();
        } catch (Exception exception) {
            logger.error(exception.getMessage(), exception.getCause());
        }

        return outputStream.toByteArray();
    }

    public static byte[] decompressImage(byte[] data) {
        logger.info("ImageUtils:decompressImage");

        Inflater inflater = new Inflater();
        inflater.setInput(data);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4 * 1024];

        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }

            outputStream.close();
        } catch (Exception exception) {
            logger.error(exception.getMessage(), exception.getCause());
        }

        return outputStream.toByteArray();
    }
}
