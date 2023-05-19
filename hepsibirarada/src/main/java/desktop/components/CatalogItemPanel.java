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

public class CatalogItemPanel extends JPanel {
    private CatalogItem catalogItem;
    private JButton clickableImage;
    private JLabel nameLabel;
    private JLabel priceLabel;
    private JButton addToCartButton;

    public CatalogItemPanel(CatalogItem catalogItem) throws IOException {
        super();
        this.setLayout(new GridLayout(0, 1));
        this.catalogItem = catalogItem;
        this.setBackground(new Color(255, 255, 255));
        this.setMaximumSize(new Dimension(300, 300));

        this.nameLabel = new JLabel(catalogItem.getTitle());
        this.priceLabel = new JLabel("₺" + catalogItem.getPrice());
        this.addToCartButton = new JButton("Add to cart.");

        String partSeparator = ",";
        String encodedImg = catalogItem.getImage().split(partSeparator)[1];
        byte[] decodedImg = Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8));

        BufferedImage img = ImageIO.read(new ByteArrayInputStream(decodedImg));
        Image resizedImage = img.getScaledInstance(100, 100, java.awt.Image.SCALE_SMOOTH);

        this.clickableImage = new JButton(new ImageIcon(resizedImage));
        this.clickableImage.setBackground(new Color(109, 118, 247));
        this.addToCartButton.setBackground(new Color(109, 118, 247));

        this.add(clickableImage);
        this.add(nameLabel);
        this.add(priceLabel);
        this.add(addToCartButton);
    }

    public CatalogItem getCatalogItem() {
        return catalogItem;
    }

    public void setCatalogItem(CatalogItem catalogItem) {
        this.catalogItem = catalogItem;
    }

    public JButton getClickableImage() {
        return clickableImage;
    }

    public void setClickableImage(JButton clickableImage) {
        this.clickableImage = clickableImage;
    }

    public JLabel getNameLabel() {
        return nameLabel;
    }

    public void setNameLabel(JLabel nameLabel) {
        this.nameLabel = nameLabel;
    }

    public JLabel getPriceLabel() {
        return priceLabel;
    }

    public void setPriceLabel(JLabel priceLabel) {
        this.priceLabel = priceLabel;
    }

    public JButton getAddToCartButton() {
        return addToCartButton;
    }

    public void setAddToCartButton(JButton addToCartButton) {
        this.addToCartButton = addToCartButton;
    }
}
