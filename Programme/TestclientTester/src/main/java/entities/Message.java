package entities;

import java.awt.image.BufferedImage;

public class Message {
    private int distance;
    private String img;

    public Message(int distance, String img){
        this.distance = distance;
        this.img = img;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
