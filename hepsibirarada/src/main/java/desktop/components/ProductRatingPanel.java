package desktop.components;

import desktop.model.RatingDataHolder;

import javax.swing.*;
import java.awt.*;

public class ProductRatingPanel extends JPanel {
    private RatingDataHolder rating;
    private JLabel username;
    private JLabel ratingsLabel;
    private JLabel comment;

    public ProductRatingPanel(RatingDataHolder rating) {
        super();
        this.setLayout(new GridLayout(0, 1));
        this.rating = rating;
        this.setBackground(new Color(255, 255, 255));
        this.setMaximumSize(new Dimension(300, 300));

        username = new JLabel(rating.commenterUsername + " says:");
        ratingsLabel = new JLabel(String.valueOf(rating.rating) + "/5.0");
        comment = new JLabel(rating.comment);

        this.add(username);
        this.add(ratingsLabel);
        this.add(comment);
    }
}
