import java.io.Serializable;
import lombok.*;

@Getter
@Setter
public class Point implements Serializable {
    private int x;
    private double y;
    private double r;
    private boolean result;
    private String sessionId;

    public Point(int x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean getResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public void cal() {
        if (validateX() && validateY() && validateR()) {
            checkHit();
        }
    }

    private boolean validateX() {
        return x >= -5 && x <= 5;
    }

    private boolean validateY() {
        return y >= -5 && y <= 5;
    }

    private boolean validateR() {
        return r >= 2 && r <= 5;
    }

    private void checkHit() {
        result = false;
        // First quarter
        if (x > 0 && y > 0 && Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)) result = true;
        // Second quarter
        if (x < 0 && y > 0 && Math.abs(x) + y <= r/2) result = true;
        // Fourth quarter
        if (x > 0 && y < 0 && x < r && y > -r/2) result = true;

    }
}
