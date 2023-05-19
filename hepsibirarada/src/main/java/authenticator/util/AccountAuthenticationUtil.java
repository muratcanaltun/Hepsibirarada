package authenticator.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class AccountAuthenticationUtil {
    public String encryptPassword(String plaintext) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] array = md.digest(plaintext.getBytes());
            StringBuffer stringBuffer = new StringBuffer();

            for (int i = 0; i < array.length; ++i) {
                stringBuffer.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1,3));
            }

            return stringBuffer.toString();

        } catch (NoSuchAlgorithmException e) {
        }
        return null;
    }
}
