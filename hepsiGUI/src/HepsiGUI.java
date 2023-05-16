import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class HepsiGUI {
    private boolean loggedIn = false;

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

    private JPanel currentPanel;

    public HepsiGUI() {
        currentPanel = homePage;
        loginPanel.setVisible(false);
        registerPanel.setVisible(false);

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
    }

    public void switchPages(JPanel nextPanel) {
        currentPanel.setVisible(false);
        currentPanel = nextPanel;
        currentPanel.setVisible(true);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Hepsibirarada");
        HepsiGUI hepsiGUI = new HepsiGUI();

        frame.setContentPane(hepsiGUI.GUIPanel);

        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setMinimumSize(new Dimension(900, 600));
        frame.setVisible(true);
    }
}
