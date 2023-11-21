import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

import jakarta.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;

import lombok.*;

@Getter
@Setter
@Named
@SessionScoped
public class BeanOfCum implements Serializable {
    private int x;
    private double y;
    private double r;

    Database database = new Database();

    public void checkPoint() {

        Point testPoint = new Point(x, y, r);
        testPoint.cal(); // cal = calculate

        String sessionId = FacesContext.getCurrentInstance().getExternalContext().getSessionId(true);
        testPoint.setSessionId(sessionId);

        try {
            database.addNewPoint(testPoint);
        } catch (SQLException e) {
            System.out.println("[!] Error occurred while adding new point to database.");
            System.out.println(e.getMessage());
        }
    }

    public ArrayList<Point> getPoints() {
        String sessionId = FacesContext.getCurrentInstance().getExternalContext().getSessionId(true);

        ArrayList<Point> points = new ArrayList<>();
        try {
            points = database.getPointsBySID(sessionId);
        } catch (SQLException e) {
            System.out.println("[!] Error occurred while getting points from database");
            System.out.println(e.getMessage());
        }

        return points;
    }

}
