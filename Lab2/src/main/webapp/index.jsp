<%@ page import="models.Result" %>
<%@ page import="models.ResultList" %>
<%@ page import="java.util.Enumeration" %>
<%@ page import="java.util.Iterator" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta content="text/html" charset="UTF-8">
    <meta http-equiv="Content-Type" name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Lab №2</title>
    <link rel="stylesheet" href="styles/style.css">
</head>

<body>

<div id="header">
    <div id="labInfo">
        Лабораторная работа №2, Вариант 1720
    </div>
    <div id="studentInfo">
        Выполнил: Рудкевич Илья Александрович, P3206
    </div>
</div>

<div id="headerPlaceholder"></div>

<div id="main">
    <!--
    x: Button {-5, -4, ... , 3}
    y: Text (-3, -2, ... , 5)
    r: Text (1, ... , 4)
 -->
    <div id="inputWrapper">
        <div id="inputContainer" class="mainContainer">
            <div id="xContainer">
                Выберите X
                <div id="xRadiobuttons">
                    <div class="xInputLine">
                        <span><input type="radio" value="-5" name="xInput">-5</span>
                        <span><input type="radio" value="-4" name="xInput">-4</span>
                        <span><input type="radio" value="-3" name="xInput">-3</span>
                    </div>
                    <div class="xInputLine">
                        <span><input type="radio" value="-2" name="xInput">-2</span>
                        <span><input type="radio" value="-1" name="xInput">-1</span>
                        <span><input type="radio" value="0" name="xInput">0</span>
                    </div>
                    <div class="xInputLine">
                        <span><input type="radio" value="1" name="xInput">1</span>
                        <span><input type="radio" value="2" name="xInput">2</span>
                        <span><input type="radio" value="3" name="xInput">3</span>
                    </div>
                </div>
            </div>

            <div class="textInputContainer">
                <label class="textInputLabel" for="yInput">Введите Y</label>
                <br>
                <input type="text" placeholder="Введите число от -3 до 5" id="yInput" class="textInput">
            </div>

            <div class="textInputContainer">
                <label class="textInputLabel" for="rInput">Введите R</label>
                <br>
                <input type="text" placeholder="Введите число от 1 до 4" id="rInput" class="textInput">
            </div>

            <div id="buttonWrap">
                <button type="button" id="checkButton">Проверить</button>
            </div>
        </div>
        <div id="plotContainer" class="mainContainer">
            <div id="plot">
                <svg id="svgPlot" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                    <!-- Drawing shapes -->
                    <!-- I quarter -->
                    <polygon class="shape" points="150,150 150,30 270,150"></polygon>
                    <!-- III quarter -->
                    <rect class="shape" x="30" y="150" width="120" height="120"></rect>
                    <!-- IV quarter -->
                    <circle class="shape" cx="150" cy="150" r="120" stroke="black"></circle>

                    <rect x="150" y="30" width="120" height="120" fill="#f5f6fa"></rect>
                    <polygon points="30,30 150,30 30,150" fill="#f5f6fa"></polygon>

                    <!-- Drawing coordinate axis -->
                    <line class="axis" x1="0" y1="150" x2="300" y2="150"></line>
                    <line class="axis" x1="150" y1="300" x2="150" y2="0"></line>

                    <path d="M150 0 L146 10 L154 10 Z"></path>
                    <path d="M300 150 L290 146 290 154 Z"></path>

                    <text x="290" y="165">x</text>
                    <text x="134" y="10">y</text>

                    <line class="axis" x1="210" y1="146" x2="210" y2="154"></line>
                    <text x="200" y="170">R/2</text>
                    <line class="axis" x1="270" y1="146" x2="270" y2="154"></line>
                    <text x="265" y="170">R</text>

                    <line class="axis" x1="146" y1="90" x2="154" y2="90"></line>
                    <text x="120" y="95">R/2</text>
                    <line class="axis" x1="146" y1="30" x2="154" y2="30"></line>
                    <text x="130" y="35">R</text>

                    <line class="axis" x1="90" y1="146" x2="90" y2="154"></line>
                    <text x="75" y="170">-R/2</text>
                    <line class="axis" x1="30" y1="146" x2="30" y2="154"></line>
                    <text x="20" y="170">-R</text>

                    <line class="axis" x1="146" y1="210" x2="154" y2="210"></line>
                    <text x="115" y="215">-R/2</text>
                    <line class="axis" x1="146" y1="270" x2="154" y2="270"></line>
                    <text x="125" y="275">-R</text>

                </svg>

                <div id="point"></div>

            </div>
        </div>
    </div>

    <div id="outputContainer">
        <%
            ResultList resultList;
            if (session.getAttribute("results") == null) {
                resultList = new ResultList();
            } else {
                resultList = (ResultList) session.getAttribute("results");
            }
        %>

        <table id="outputTable" cellspacing="0" cellpadding="0">
            <tr>
                <th class="tableHeader">X</th>
                <th class="tableHeader">Y</th>
                <th class="tableHeader">R</th>
                <th class="tableHeader">Результат</th>
                <th class="tableHeader">Текущее время</th>
                <th class="tableHeader">Время работы скрипта</th>
            </tr>

            <% for (Result result : resultList) { %>
            <tr>
                <td><%= result.getX() %></td>
                <td><%= result.getY() %></td>
                <td><%= result.getR() %></td>
                <td><%= result.getHit() %></td>
                <td><%= result.getCurrentTime() %></td>
                <td><%= result.getExecutionTime() %></td>
            </tr>
            <% } %>
        </table>

    </div>

    <div id="modal">
        <h3>AHTUNG AHTNUG!</h3>
        <p id="displayMessage"></p>
        <button id="modalButton">Sorry, I'm stupid</button>
    </div>

</div>

<script src="scripts/utils.js"></script>
<script src="scripts/validation.js"></script>
<script src="scripts/main.js"></script>
</body>

</html>