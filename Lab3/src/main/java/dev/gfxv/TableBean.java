package dev.gfxv;

import dev.gfxv.entities.Point;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;


@Named
@SessionScoped
public class TableBean implements Serializable {


    public ArrayList<Point> getPoints() {
        String sessionId = FacesContext.getCurrentInstance().getExternalContext().getSessionId(true);

        ArrayList<Point> points = new ArrayList<>();
        try {
            Database database = new Database();
            points = database.getPointsBySID(sessionId);
        } catch (SQLException e) {
            System.out.println("[!] Error occurred while getting points from database");
            System.out.println(e.getMessage());
        }

        return points;
    }

}
