import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.util.Arrays;

@WebServlet(name = "ControllerServlet", value = "/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        if (request.getParameter("x") != null &&
                request.getParameter("y") != null &&
                request.getParameter("r") != null) {

            try {
                int x = Integer.parseInt(request.getParameter("x"));
                double y = Double.parseDouble(request.getParameter("y"));
                double r = Double.parseDouble(request.getParameter("r"));
                processData(x, y, r);
                request.getRequestDispatcher("/check-area").forward(request, response);
            } catch (NumberFormatException e) {
                request.setAttribute("error", "invalid parameters");
                request.getRequestDispatcher("/index.jsp").forward(request, response);
            }
        }
    }

    private void processData(int x, double y, double r) {
        if (!Arrays.asList(-5, -4, -3, -2, -1, 0, 1, 2, 3).contains(x)) throw new NumberFormatException();
        if (y < -3 || y > 5) throw new NumberFormatException();
        if (r < 1 || r > 4) throw new NumberFormatException();
    }
}
