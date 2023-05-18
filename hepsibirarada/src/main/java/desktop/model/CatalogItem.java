package desktop.model;

public class CatalogItem {
    private String id;
    private String title;
    private double price;
    private String image;

    public CatalogItem(String id, String title, double price, String image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public double getPrice() {
        return price;
    }

    public String getImage() {
        return image;
    }
}
