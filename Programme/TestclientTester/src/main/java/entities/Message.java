package entities;

import java.awt.image.BufferedImage;

public class Message {
    private int distance;
    private BufferedImage img;

    public Message(int distance, BufferedImage img){
        this.distance = distance;
        this.img = img;
    }


    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public BufferedImage getImg() {
        return img;
    }

    public void setImg(BufferedImage img) {
        this.img = img;
    }
}
