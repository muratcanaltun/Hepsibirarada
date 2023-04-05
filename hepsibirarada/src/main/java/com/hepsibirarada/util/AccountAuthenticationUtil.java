package com.hepsibirarada.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class AccountAuthenticationUtil {
    public String encryptPassword(String plaintext) {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            byte[] array = md.digest(plaintext.getBytes());
            StringBuffer stringBuffer = new StringBuffer();

            for (int i = 0; i < array.length; ++i) {
                stringBuffer.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1,3));
            }

            return stringBuffer.toString();

        } catch (java.security.NoSuchAlgorithmException e) {
        }
        return null;
    }
}
