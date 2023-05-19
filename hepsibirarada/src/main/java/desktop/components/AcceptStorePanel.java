package desktop.components;

import desktop.model.StoreDataHolder;

import javax.swing.*;
import java.awt.*;

public class AcceptStorePanel extends JPanel {
    private StoreDataHolder store;
    private JLabel username;
    private JLabel accept;
    private JLabel reject;
    private JLabel status;

    public AcceptStorePanel(StoreDataHolder store) {
        super();
        this.setLayout(new GridLayout(1, 0));
        this.setBackground(new Color(255, 255, 255));
        this.setMaximumSize(new Dimension(300, 300));

        this.store = store;
        username = new JLabel(store.username);
        status = new JLabel("Is Accepted Status: " + store.suspended);
        accept = new JLabel("Accept");
        reject = new JLabel("Reject");

        this.add(username);
        this.add(status);
        this.add(accept);
        this.add(reject);
    }

    public JLabel getAccept() {
        return accept;
    }

    public JLabel getReject() {
        return reject;
    }

    public JLabel getStatus() {
        return status;
    }
}
