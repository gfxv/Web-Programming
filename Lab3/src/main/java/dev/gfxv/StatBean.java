package dev.gfxv;

import dev.gfxv.entities.Point;
import dev.gfxv.entities.Statistics;
import dev.gfxv.mbeans.StatBeanMXBean;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


@Named
@SessionScoped
public class StatBean implements Serializable, StatBeanMXBean {

    @Inject
    private BeanOfCum beanOfCum;


    @Override
    public Statistics getResults() {
        String sessionId = FacesContext
                .getCurrentInstance()
                .getExternalContext()
                .getSessionId(true);

        ArrayList<Point> points = new ArrayList<>();

        try {
            Database database = new Database();
            points = database.getPointsBySID(sessionId);
        } catch (SQLException e) {
            System.out.println("[!] Error occurred while getting points from database.");
            System.out.println(e.getMessage());
        }

        long total = points.size();

        long hits = points
                .stream()
                .filter(Point::getResult)
                .count();

        long misses = points
                .stream()
                .filter(point -> !point.getResult())
                .count();

        return new Statistics(total, hits, misses);
    }

    public double getArea() {
        double total = 0;

        double r = beanOfCum.getR();

        // I quarter (circle)
        total += Math.PI * Math.pow(r, 2) / 4;

        // II quarter (triangle)
        total += 0.5 * (r / 2) * (r / 2);

        // IV quarter (rectangle)
        total += r * r / 2;

        return total;
    }

}
