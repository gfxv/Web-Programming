package dev.gfxv;

import dev.gfxv.entities.Point;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Properties;

public class Database {

    private final String path = "jdbc:postgresql://127.0.0.1:5432/studs";
    private Connection connection;

    public Database() {
        Properties info = new Properties();
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        try {
            // Port forwarding
            // ssh -L 5432:localhost:5432 -p 2222 sXXXXXX@helios.se.ifmo.ru
            info.load(loader.getResourceAsStream("db.cfg"));
            this.connection = DriverManager.getConnection(
                    path,
                    info.getProperty("user"),
                    info.getProperty("password")
            );
        } catch (IOException e) {
            System.out.println("[!] Error occurred while reading `db.cfg`");
            System.out.println(e.getMessage());
        } catch (SQLException e) {
            System.out.println("[!] Error occurred while connecting to database");
            System.out.println(e.getMessage());
        }

    }

    public void addNewPoint(Point point) throws SQLException {
        PreparedStatement statement = connection.prepareStatement("""
                insert into Points (id, session_id, x, y, r, result)
                values (default, ?, ?, ?, ?, ?);
                """);

        statement.setString(1, point.getSessionId());
        statement.setInt(2, point.getX());
        statement.setDouble(3, point.getY());
        statement.setDouble(4, point.getR());
        statement.setBoolean(5, point.getResult());

        statement.execute();
        statement.close();
    }

    public ArrayList<Point> getPointsBySID(String sessionId) throws SQLException {

        PreparedStatement statement = connection.prepareStatement("""
                select x, y, r, result from Points where session_id = ?;
                """);

        statement.setString(1, sessionId);
        ResultSet rs = statement.executeQuery();

        ArrayList<Point> points = new ArrayList<>();

        while(rs.next()) {
            int x = rs.getInt(1);
            double y = rs.getDouble(2);
            double r = rs.getDouble(3);
            boolean hit = rs.getBoolean(4);

            Point point = new Point(x, y, r);
            point.setResult(hit);

            points.add(point);
        }

        return points;
    }

}
