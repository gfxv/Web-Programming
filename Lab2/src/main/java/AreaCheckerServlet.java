import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;
import models.Result;
import models.ResultList;

import java.io.IOException;

@WebServlet(name = "AreaCheckerServlet", value = "/check-area")
public class AreaCheckerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        ResultList results;

        if (session.getAttribute("results") == null) results = new ResultList();
        else results = (ResultList) session.getAttribute("results");

        int x = Integer.parseInt(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        results.add(checkArea(x, y, r));

        session.setAttribute("results", results);

        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    private Result checkArea(int x, double y, double r) {
        long start = System.nanoTime();
        boolean hit = false;

        if (x < 0 && y > 0 && (Math.abs(x) + y <= r)) hit = true;
        if (x < 0 && y < 0 && x < r && y < r) hit = true;
        if (x > 0 && y < 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2))) hit = true;

        String execTime = String.valueOf(System.nanoTime() - start);
        return new Result(x, y, r, execTime, hit);
    }
}
