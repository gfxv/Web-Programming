package dev.gfxv;

import dev.gfxv.entities.Point;
import dev.gfxv.mbeans.BeanOfCumMXBean;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

import jakarta.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.sql.SQLException;

import lombok.*;

@Getter
@Setter
@Named
@SessionScoped
public class BeanOfCum  implements Serializable, BeanOfCumMXBean {
    private int x;
    private double y;
    private double r;

    @Override
    public void checkPoint() {

        Point testPoint = new Point(x, y, r);
        testPoint.cal(); // cal = calculate

        String sessionId = FacesContext.getCurrentInstance().getExternalContext().getSessionId(true);
        testPoint.setSessionId(sessionId);

        try {
            Database database = new Database();
            database.addNewPoint(testPoint);
        } catch (SQLException e) {
            System.out.println("[!] Error occurred while adding new point to database.");
            System.out.println(e.getMessage());
        }
    }


}
