package authenticator;

import authenticator.util.AccountAuthenticationUtil;
import authenticator.util.RequestProcessingUtil;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map;

public class HepsiAuth {
    private JPanel mainpanel;
    private JPanel loginPanel;
    private JTextField usernameField;
    private JPasswordField passwordField;
    private JRadioButton radioCustomer;
    private JRadioButton radioStore;
    private JRadioButton radioManager;
    private ButtonGroup radioGroup;
    private JLabel usernameLabel;
    private JLabel passwordLabel;
    private JLabel userTypeLabel;
    private JButton loginButton;
    private JPanel authPanel;
    private JButton generateNewCodeButton;
    private JLabel timeLabel;
    private JLabel codeLabel;
    private JPanel currentPanel;

    private RequestProcessingUtil requestProcessingUtil;
    private AccountAuthenticationUtil accountAuthenticationUtil;

    public HepsiAuth() {
        currentPanel = mainpanel;

        requestProcessingUtil = new RequestProcessingUtil();
        accountAuthenticationUtil = new AccountAuthenticationUtil();

        radioGroup = new ButtonGroup();
        radioGroup.add(radioCustomer);
        radioGroup.add(radioStore);
        radioGroup.add(radioManager);

        authPanel.setVisible(false);

        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    if (checkLogin()) {
                        getAuthData();
                        switchPages(authPanel);
                    }
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });
        generateNewCodeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    create2FACode();
                    getAuthData();
                    getAuthCode();
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });
    }

    public boolean checkLogin() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                getSelectedButtonText(radioGroup).toLowerCase() + "s/" + usernameField.getText(), "GET");
        String response = getHTTPResponse(con);

        Map<String, String> parsedResponse = requestProcessingUtil.parseJSON(response);
        String encryptedPassword = accountAuthenticationUtil.encryptPassword(
                new String(passwordField.getPassword()));

        return parsedResponse.get("password").equals(encryptedPassword);
    }

    public void getAuthData() throws IOException {
        getAuthTime();
        getAuthCode();
    }

    public void getAuthTime() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/2FATime/" +
                usernameField.getText(), "GET");
        String response = getHTTPResponse(con);

        timeLabel.setText("Valid until: " + response);
    }

    public void getAuthCode() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/2FACode/" +
                usernameField.getText(), "GET");
        String response = getHTTPResponse(con);

        codeLabel.setText(response);
    }

    public void create2FACode() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/2FA",
                "POST");

        sendHTTPRequestWithBody(con, usernameField.getText());
        String response = getHTTPResponse(con);
    }

    public void sendHTTPRequestWithBody(HttpURLConnection con, String body) throws IOException {
        try(OutputStream os = con.getOutputStream()) {
            byte[] input = body.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }


    }

    public String getHTTPResponse(HttpURLConnection con) throws IOException {
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }

            return response.toString();
        }
    }

    public static HttpURLConnection createBackendConnection(String targetUrl, String requestMethod) throws IOException {
        URL url = new URL(targetUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod(requestMethod);
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);

        return con;
    }

    public String getSelectedButtonText(ButtonGroup buttonGroup) {
        for (Enumeration<AbstractButton> buttons = buttonGroup.getElements(); buttons.hasMoreElements();) {
            AbstractButton button = buttons.nextElement();

            if (button.isSelected()) {
                return button.getText();
            }
        }

        return null;
    }

    public void switchPages(JPanel nextPanel) {
        currentPanel.setVisible(false);
        currentPanel = nextPanel;
        currentPanel.setVisible(true);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Hepsi Authenticator");
        HepsiAuth hepsiAuth = new HepsiAuth();

        frame.setContentPane(hepsiAuth.mainpanel);

        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setMinimumSize(new Dimension(900, 600));
        frame.setVisible(true);
    }
}
