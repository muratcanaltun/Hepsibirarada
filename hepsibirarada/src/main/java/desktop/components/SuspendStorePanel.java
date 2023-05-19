package desktop.components;

import desktop.model.StoreDataHolder;

import javax.swing.*;
import java.awt.*;

public class SuspendStorePanel extends JPanel {
    private StoreDataHolder store;
    private JLabel username;
    private JLabel suspend;
    private JLabel unsuspend;
    private JLabel status;

    public SuspendStorePanel(StoreDataHolder store) {
        super();
        this.setLayout(new GridLayout(1, 0));
        this.setBackground(new Color(255, 255, 255));
        this.setMaximumSize(new Dimension(300, 300));

        this.store = store;
        username = new JLabel(store.username);
        status = new JLabel("Is Suspended Status: " + store.suspended);
        suspend = new JLabel("Suspend");
        unsuspend = new JLabel("Unsuspend");

        this.add(username);
        this.add(status);
        this.add(suspend);
        this.add(unsuspend);
    }

    public JLabel getSuspend() {
        return suspend;
    }

    public JLabel getUnsuspend() {
        return unsuspend;
    }

    public JLabel getStatus() {
        return status;
    }
}
