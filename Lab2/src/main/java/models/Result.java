package models;

import java.io.Serializable;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Result implements Serializable {

    private int x;
    private double y;
    private double r;
    private String currentTime;
    private String executionTime;
    private boolean hit;

    public Result(int x, double y, double r, String executionTime, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
        this.executionTime = executionTime;
        this.hit = hit;
    }

    public int getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public String getHit() {
        return hit ? "Попадение" : "Промах";
    }

}
