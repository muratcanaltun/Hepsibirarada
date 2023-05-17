package desktop;

import desktop.components.CatalogItemPanel;
import desktop.model.CatalogItem;
import desktop.model.ProductDataHolder;
import desktop.util.AccountAuthenticationUtil;
import desktop.util.RequestProcessingUtil;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Map;

public class HepsiGUI {
    private boolean loggedIn = false;
    private String loggedUser;
    private ArrayList<String> cart;

    private JTextField searchField;
    private JButton searchButton;
    private JButton loginButton;
    private JButton registerButton;
    private JButton homeButton;
    private JPanel topPanel;

    private JPanel homePage;
    private JPanel GUIPanel;
    private JButton seeProductsButton;

    private JPanel loginPanel;
    private JTextField usernameField;
    private JLabel usernameLabel;
    private JPasswordField passwordPasswordField;
    private JLabel passwordLabel;
    private JLabel userTypeLabel;
    private JRadioButton customerRadio;
    private JRadioButton managerRadio;
    private JRadioButton storeRadio;
    private ButtonGroup loginButtonGroup;
    private JButton loginAcceptButton;

    private JPanel dataPanel;

    private ButtonGroup registerButtonGroup;
    private JTextField usernameRegisterField;
    private JLabel usernameRegisterLabel;
    private JPasswordField passwordRegisterField;
    private JLabel passwordRegisterLabel;
    private JTextField emailRegisterField;
    private JLabel emailRegisterLabel;
    private JTextArea addressRegisterArea;
    private JLabel addressRegisterLabel;
    private JRadioButton customerRegisterButton;
    private JRadioButton storeRegisterButton;
    private JButton registerUserButton;
    private JPanel registerPanel;
    private JTextField addressRegisterTitleField;
    private JLabel addressRegisterTitleLabel;
    private JScrollPane addressRegisterPane;

    private JLabel loginGoToRegister;
    private JLabel registerGoToLogin;
    private JButton logoutButton;
    private JPanel shoppingCartPanel;
    private JButton checkoutButton;
    private JButton cancelButton;
    private JButton myCartButton;
    private JScrollPane cartItemsPane;
    private JPanel authenticationPanel;
    private JFormattedTextField authenticationField;
    private JLabel authenticationLabel;
    private JButton authenticateButton;
    private JLabel greetingLabel;
    private JPanel availableItemsPanel;
    private JScrollPane availableItemsScroll;
    private JPanel itemsPanel;
    private JPanel cartPanel;

    private JPanel currentPanel;
    private RequestProcessingUtil requestProcessingUtil;
    private AccountAuthenticationUtil accountAuthenticationUtil;

    public HepsiGUI() throws IOException {
        requestProcessingUtil = new RequestProcessingUtil();
        accountAuthenticationUtil = new AccountAuthenticationUtil();
        currentPanel = homePage;

        loginPanel.setVisible(false);
        registerPanel.setVisible(false);
        shoppingCartPanel.setVisible(false);
        authenticationPanel.setVisible(false);
        availableItemsPanel.setVisible(false);

        availableItemsScroll.setViewportView(itemsPanel);

        itemsPanel.setLayout(new GridLayout(0, 3));
        cartPanel.setLayout(new GridLayout(0, 1));
        getAvailableProducts(itemsPanel);

        logoutButton.setVisible(false);
        addressRegisterTitleLabel.setVisible(false);
        addressRegisterPane.setVisible(false);
        addressRegisterTitleField.setVisible(false);
        addressRegisterLabel.setVisible(false);
        addressRegisterArea.setVisible(false);

        loginButtonGroup = new ButtonGroup();
        loginButtonGroup.add(customerRadio);
        loginButtonGroup.add(managerRadio);
        loginButtonGroup.add(storeRadio);

        registerButtonGroup = new ButtonGroup();
        registerButtonGroup.add(customerRegisterButton);
        registerButtonGroup.add(storeRegisterButton);

        searchField.addFocusListener(new FocusAdapter() {
            @Override
            public void focusGained(FocusEvent e) {
                searchField.setText("");
            }
        });
        loginButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                switchPages(loginPanel);
            }
        });
        registerButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                switchPages(registerPanel);
            }
        });
        homeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                switchPages(homePage);
            }
        });
        customerRegisterButton.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                addressRegisterTitleLabel.setVisible(true);
                addressRegisterPane.setVisible(true);
                addressRegisterTitleField.setVisible(true);
                addressRegisterLabel.setVisible(true);
                addressRegisterArea.setVisible(true);
            }
        });
        storeRegisterButton.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                addressRegisterTitleLabel.setVisible(false);
                addressRegisterPane.setVisible(false);
                addressRegisterTitleField.setVisible(false);
                addressRegisterLabel.setVisible(false);
                addressRegisterArea.setVisible(false);
            }
        });
        loginGoToRegister.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                switchPages(registerPanel);
            }
        });
        registerGoToLogin.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                switchPages(loginPanel);
            }
        });
        loginAcceptButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    if (checkLogin()) {
                        create2FACode();
                        loggedUser = usernameField.getText();
                        switchPages(authenticationPanel);
                    } else {
                        JOptionPane.showMessageDialog((JFrame) SwingUtilities.getWindowAncestor(GUIPanel),
                                "Login failed, please check your credentials.");
                    }
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        });
        myCartButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                shoppingCartPanel.setVisible(!shoppingCartPanel.isVisible());
            }
        });
        cancelButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                shoppingCartPanel.setVisible(false);
            }
        });
        authenticateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    if (check2FACode()) {
                        loggedIn = true;
                        loginButton.setVisible(false);
                        registerButton.setVisible(false);
                        logoutButton.setVisible(true);
                        greetingLabel.setText("Hello " + loggedUser);
                        switchPages(homePage);
                    }
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            }
        });
        logoutButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                loggedUser = null;
                loggedIn = false;
                loginButton.setVisible(true);
                registerButton.setVisible(true);
                logoutButton.setVisible(false);
                greetingLabel.setText("Hello");
                switchPages(homePage);
            }
        });
        registerUserButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    registerUser();
                    switchPages(homePage);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }

            }
        });
        seeProductsButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                switchPages(availableItemsPanel);
            }
        });
    }

    public void getAvailableProducts(JPanel availableItems) throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/availableProducts"
                , "GET");
        String response = getHTTPResponse(con);

        ArrayList<ProductDataHolder> products = requestProcessingUtil.parseProductArray(response);

        for (ProductDataHolder p : products) {
            CatalogItem catalogItem = new CatalogItem(p.id, p.title, p.price, p.imageLink);
            CatalogItemPanel catalogItemPanel = new CatalogItemPanel(catalogItem);

            catalogItemPanel.getAddToCartButton().addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    //instead of GUI components, use an ArrayList and do the visual operations after doing ArrayList ops
                    //cartPanel.add(new JLabel(catalogItem.getTitle()));
                    //cartPanel.revalidate();
                }
            });

            availableItems.add(catalogItemPanel);
        }
    }
    public void registerUser() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                getSelectedButtonText(registerButtonGroup).toLowerCase() + "s", "POST");

        sendHTTPRequestWithBody(con, createRegisterRequestBody());
        String response = getHTTPResponse(con);
    }

    public String createRegisterRequestBody() {
        if (getSelectedButtonText(registerButtonGroup).equals("Store")) {
            return "{\"username\": \"" + usernameRegisterField.getText() +
                    "\", \"email\": \"" + emailRegisterField.getText() +
                    "\", \"password\": \"" + new String(passwordRegisterField.getPassword()) +
                    "\"}";
        }

        return "{\"username\": \"" + usernameRegisterField.getText() +
                "\", \"email\": \"" + emailRegisterField.getText() +
                "\", \"password\": \"" + new String(passwordRegisterField.getPassword()) +
                "\", \"addressTitle\": \"" + addressRegisterTitleField.getText() +
                "\", \"address\": \"" + addressRegisterArea.getText() +
                "\"}";
    }

    public boolean checkLogin() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                getSelectedButtonText(loginButtonGroup).toLowerCase() + "s/" + usernameField.getText(), "GET");
        String response = getHTTPResponse(con);

        Map<String, String> parsedResponse = requestProcessingUtil.parseJSON(response);
        String encryptedPassword = accountAuthenticationUtil.encryptPassword(
                new String(passwordPasswordField.getPassword()));

        return parsedResponse.get("password").equals(encryptedPassword);
    }

    public void create2FACode() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/2FA",
                "POST");

        sendHTTPRequestWithBody(con, usernameField.getText());
        String response = getHTTPResponse(con);
    }

    public boolean check2FACode() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/2FACheck/" + loggedUser,
                "POST");

        sendHTTPRequestWithBody(con, authenticationField.getText());
        String response = getHTTPResponse(con);

        return Boolean.parseBoolean(response);
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

    public static void main(String[] args) throws IOException {
        JFrame frame = new JFrame("Hepsibirarada");
        HepsiGUI hepsiGUI = new HepsiGUI();

        frame.setContentPane(hepsiGUI.GUIPanel);

        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setMinimumSize(new Dimension(900, 600));
        frame.setVisible(true);
    }
}