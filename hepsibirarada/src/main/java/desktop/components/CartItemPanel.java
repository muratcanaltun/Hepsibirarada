package desktop.components;

import desktop.model.CatalogItem;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class CartItemPanel extends JPanel {
    private CatalogItem catalogItem;
    private JButton clickableImage;
    private JLabel nameLabel;
    private JLabel priceLabel;
    private JButton minusButton;
    private JLabel quantity;
    private JButton plusButton;

    public CartItemPanel(CatalogItem catalogItem, int quantity) throws IOException {
        super();
        this.catalogItem = catalogItem;
        this.quantity = new JLabel(String.valueOf(quantity));

        this.setLayout(new GridLayout(1, 0));
        this.catalogItem = catalogItem;
        this.setBackground(new Color(255, 255, 255));

        this.nameLabel = new JLabel(catalogItem.getTitle());
        this.priceLabel = new JLabel("₺" + catalogItem.getPrice());
        this.plusButton = new JButton("+");
        this.minusButton = new JButton("-");

        String partSeparator = ",";
        String encodedImg = catalogItem.getImage().split(partSeparator)[1];
        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));

        BufferedImage img = ImageIO.read(new ByteArrayInputStream(decodedImg));
        Image resizedImage = img.getScaledInstance(100, 100, java.awt.Image.SCALE_SMOOTH);

        this.clickableImage = new JButton(new ImageIcon(resizedImage));
        this.clickableImage.setBackground(new Color(109, 118, 247));

        this.add(clickableImage);
        this.add(nameLabel);
        this.add(priceLabel);
        this.add(minusButton);
        this.add(this.quantity);
        this.add(plusButton);
    }

    public CatalogItem getCatalogItem() {
        return catalogItem;
    }

    public JButton getClickableImage() {
        return clickableImage;
    }

    public JLabel getNameLabel() {
        return nameLabel;
    }

    public JLabel getPriceLabel() {
        return priceLabel;
    }

    public JButton getMinusButton() {
        return minusButton;
    }

    public JLabel getQuantity() {
        return quantity;
    }

    public JButton getPlusButton() {
        return plusButton;
    }
}
