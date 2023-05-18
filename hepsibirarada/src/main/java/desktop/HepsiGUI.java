package desktop;

import desktop.components.CartItemPanel;
import desktop.components.CatalogItemPanel;
import desktop.model.CatalogItem;
import desktop.model.ProductDataHolder;
import desktop.util.AccountAuthenticationUtil;
import desktop.util.RequestProcessingUtil;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class HepsiGUI {
    private boolean loggedIn = false;
    private String loggedUser;
    private String userType;
    private HashMap<String, Integer> cart;

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
    private JButton addProductButton;
    private JPanel addProductPanel;
    private JTextField titleField;
    private JLabel titleLabel;
    private JLabel priceLabel;
    private JSpinner priceSpinner;
    private JLabel categoryLabel;
    private JComboBox categoryBox;
    private JLabel stocksLabel;
    private JSpinner stockSpinner;
    private JLabel imageLabel;
    private JButton browseImageButton;
    private JLabel imagePreviewLabel;
    private JButton addButton;
    private JButton editButton;
    private JButton removeButton;
    private JLabel descriptionLabel;
    private JScrollPane descriptionPane;
    private JTextArea descriptionArea;
    private JButton editAccountButton;
    private JPanel editAccountPanel;
    private JTextField editUsernameField;
    private JPasswordField editPasswordField;
    private JButton deleteAccountButtonConfirm;
    private JButton editAccountButtonConfirm;
    private JLabel editUsernameLabel;
    private JLabel editPasswordLabel;
    private JPasswordField confirmPasswordField;
    private JLabel confirmLabel;
    private JPasswordField confirmEditPasswordField;
    private JLabel confirmEditPasswordLabel;
    private JPanel productPanel;
    private JLabel productCategoryLabel;
    private JLabel productInageLabel;
    private JLabel productPriceLabel;
    private JPanel productImagePanel;
    private JLabel productDescriptionLabel;
    private JLabel productTitleLabel;
    private JButton addToCartButton;
    private JLabel commentsLabel;
    private JScrollPane commentScrollPane;
    private JPanel commentsPanel;
    private JPanel suspendStoresPanel;
    private JPanel acceptStoresPanel;
    private JScrollPane suspendScrollPane;
    private JPanel suspendPanel;
    private JScrollPane acceptScrollPane;
    private JPanel acceptPanel;
    private JButton productEditButton;
    private String[] categories;
    private char productMode;
    private String encodedImage;
    private String chosenProductID;
    private String loggedUserEmail;

    private JPanel currentPanel;
    private RequestProcessingUtil requestProcessingUtil;
    private AccountAuthenticationUtil accountAuthenticationUtil;

    public HepsiGUI() throws IOException {
        requestProcessingUtil = new RequestProcessingUtil();
        accountAuthenticationUtil = new AccountAuthenticationUtil();
        currentPanel = homePage;
        productMode = 'a';

        categories = new String[]{"Electronics", "Home Furnishing", "Clothing", "Food & Drink", "Office", "Other"};

        for (String s : categories) {
            categoryBox.addItem(s);
        }

        loginPanel.setVisible(false);
        registerPanel.setVisible(false);
        shoppingCartPanel.setVisible(false);
        authenticationPanel.setVisible(false);
        availableItemsPanel.setVisible(false);
        addProductPanel.setVisible(false);

        addButton.setVisible(false);
        removeButton.setVisible(false);
        editButton.setVisible(false);

        availableItemsScroll.setViewportView(itemsPanel);

        itemsPanel.setLayout(new GridLayout(0, 3));
        cartPanel.setLayout(new GridLayout(0, 1));
        getAvailableProducts(itemsPanel);

        imagePreviewLabel.setVisible(false);

        logoutButton.setVisible(false);
        editAccountButton.setVisible(false);
        addProductButton.setVisible(false);
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

        cart = new HashMap<>();

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
                        userType = getSelectedButtonText(loginButtonGroup);
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
                        editAccountButton.setVisible(true);
                        greetingLabel.setText("Hello " + loggedUser);

                        if (userType.equals("Store")) {
                            addProductButton.setVisible(true);
                        }

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
        addProductButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                productMode = 'a';
                switchPages(addProductPanel);
            }
        });
        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    addProduct();
                    switchPages(homePage);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });
        editButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    editProduct();
                    switchPages(homePage);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });
        removeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    deleteProduct();
                    switchPages(homePage);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });
        browseImageButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JFileChooser jFileChooser = new JFileChooser();
                if (jFileChooser.showOpenDialog((JFrame) SwingUtilities.getWindowAncestor(GUIPanel))
                        == JFileChooser.APPROVE_OPTION) {

                    File file = jFileChooser.getSelectedFile();

                    try {
                        BufferedImage img = ImageIO.read(file);

                        ByteArrayOutputStream out = new ByteArrayOutputStream();
                        ImageIO.write(img, "PNG", out);
                        byte[] bytes = out.toByteArray();

                        byte[] base64bytes = Base64.getEncoder().encode(bytes);
                        String src = "data:image/png;base64,";

                        for (int i = 0; i < base64bytes.length; i++) {
                            src += base64bytes[i];
                        }

                        imagePreviewLabel.setIcon(new ImageIcon(
                                img.getScaledInstance(100, 100, java.awt.Image.SCALE_SMOOTH)));

                        encodedImage = src;
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }
            }
        });
        deleteAccountButtonConfirm.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    deleteAccount();
                    loggedUser = null;
                    loggedIn = false;
                    loginButton.setVisible(true);
                    registerButton.setVisible(true);
                    logoutButton.setVisible(false);
                    addProductButton.setVisible(false);
                    editAccountButton.setVisible(false);

                    greetingLabel.setText("Hello");
                    switchPages(homePage);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        });
        editAccountButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                editUsernameField.setText(loggedUser);
                switchPages(editAccountPanel);
            }
        });
        editAccountButtonConfirm.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    editAccount();
                    switchPages(homePage);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

            }
        });
        productEditButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    productMode = 'e';
                    getFieldsReadyToEdit();
                    switchPages(addProductPanel);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

            }
        });
        searchButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    itemsPanel.removeAll();
                    getQueryProducts(itemsPanel, searchField.getText());
                    switchPages(availableItemsPanel);
                } catch (IOException ex) {
                    ex.printStackTrace();
                }

            }
        });
    }

    public void getQueryProducts(JPanel availableItems, String query) throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/productQuery/" + query
                , "GET");
        String response = getHTTPResponse(con);

        ArrayList<ProductDataHolder> products = requestProcessingUtil.parseProductArray(response);

        for (ProductDataHolder p : products) {
            CatalogItem catalogItem = new CatalogItem(p.id, p.title, p.price, p.imageLink);
            CatalogItemPanel catalogItemPanel = new CatalogItemPanel(catalogItem);

            catalogItemPanel.getAddToCartButton().addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    try {
                        addItemToCart(catalogItem);
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }
            });

            availableItems.add(catalogItemPanel);
        }
    }

    public void getFieldsReadyToEdit() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/products/" + chosenProductID,
                "GET");

        String response = getHTTPResponse(con);
        ProductDataHolder product = requestProcessingUtil.parseSingleProduct(response);

        titleField.setText(product.title);
        priceSpinner.setValue(product.price);
        stockSpinner.setValue(product.availableStocks);
        descriptionArea.setText(product.description);
    }

    public void editAccount() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                userType.toLowerCase() + "s/" + loggedUser, "PUT");

        String body = createEditAccountBody();

        if (body.equals("Error")) {
            JOptionPane.showMessageDialog((JFrame) SwingUtilities.getWindowAncestor(GUIPanel),
                    "Edit account failed, please make sure the password and confirm password fields are the same");
            return;
        }

        sendHTTPRequestWithBody(con, createRegisterRequestBody());
        String response = getHTTPResponse(con);
    }

    public String createEditAccountBody() {
        if (new String(editPasswordField.getPassword()).equals(new String(confirmEditPasswordField.getPassword()))) {
            return "{\"username\": \"" + editUsernameField.getText() +
                    "\", \"email\": \"" + emailRegisterField.getText() +
                    "\", \"password\": \"" + new String(editPasswordField.getPassword()) +
                    "\"}";
        } else {
            return "Error";
        }
    }

    public void deleteAccount() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                userType.toLowerCase() + "s/" + loggedUser, "DELETE");
        String response = getHTTPResponse(con);
    }

    public void addProduct() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/products", "POST");

        sendHTTPRequestWithBody(con, createAddProductBody());
        String response = getHTTPResponse(con);
    }

    public void deleteProduct() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/products/" + chosenProductID,
                "DELETE");
        String response = getHTTPResponse(con);
    }

    public void editProduct() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/products/" + chosenProductID,
                "PUT");

        sendHTTPRequestWithBody(con, createAddProductBody());
        String response = getHTTPResponse(con);
    }

    public String createAddProductBody() {
        return "{\"title\": \"" + titleField.getText() +
                "\", \"price\": \"" + priceSpinner.getValue() +
                "\", \"description\": \"" + descriptionArea.getText() +
                "\", \"category\": \"" + categoryBox.getSelectedItem() +
                "\", \"availableStocks\": \"" + stockSpinner.getValue() +
                "\", \"imageLink\": \"" + encodedImage +
                "\"}";
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
                    try {
                        addItemToCart(catalogItem);
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }
            });

            availableItems.add(catalogItemPanel);
        }
    }

    public void addItemToCart(CatalogItem catalogItem) throws IOException {
        String productID = catalogItem.getId();

        if (!cart.containsKey(productID)) {
            cart.put(catalogItem.getId(), 1);

            cartPanel.add(new CartItemPanel(catalogItem, 1));
        } else {
            cart.replace(productID, cart.get(productID) + 1);

            for (Component component : cartPanel.getComponents()) {
                if (component.getClass().equals(CartItemPanel.class)) {
                    if (((CartItemPanel) component).getCatalogItem().getId().equals(productID)) {
                        ((CartItemPanel) component).getQuantity().setText(String.valueOf(cart.get(productID)));
                        break;
                    }
                }
            }
        }

        cartPanel.revalidate();
    }

    public void registerUser() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                getSelectedButtonText(registerButtonGroup).toLowerCase() + "s", "POST");

        String body = createRegisterRequestBody();

        if (body.equals("Error")) {
            JOptionPane.showMessageDialog((JFrame) SwingUtilities.getWindowAncestor(GUIPanel),
                    "Register failed, please make sure the password and confirm password fields are the same");
            return;
        }

        sendHTTPRequestWithBody(con, createRegisterRequestBody());
        String response = getHTTPResponse(con);
    }

    public String createRegisterRequestBody() {
        if (new String(passwordRegisterField.getPassword()).equals(new String(confirmPasswordField.getPassword()))) {
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
        } else {
            return "Error";
        }
    }

    public boolean checkLogin() throws IOException {
        HttpURLConnection con = createBackendConnection("http://localhost:8080/" +
                getSelectedButtonText(loginButtonGroup).toLowerCase() + "s/" + usernameField.getText(), "GET");
        String response = getHTTPResponse(con);

        Map<String, String> parsedResponse = requestProcessingUtil.parseJSON(response);
        String encryptedPassword = accountAuthenticationUtil.encryptPassword(
                new String(passwordPasswordField.getPassword()));

        loggedUserEmail = parsedResponse.get("email");

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

        switch (productMode) {
            case 'a':
                addButton.setVisible(true);
                editButton.setVisible(false);
                removeButton.setVisible(false);
                break;
            case 'e':
                addButton.setVisible(false);
                editButton.setVisible(true);
                removeButton.setVisible(true);
        }

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