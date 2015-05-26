var xml_http;
var json_data;
var search_value;
var file_name;

function ProcessResponse(str) {
    file_name = str;
    if (window.XMLHttpRequest)
    // code for IE7+, Firefox, Chrome, Opera, Safari
        xml_http = new XMLHttpRequest();
    else if (window.ActiveXObject)
    // code for IE6, IE5
        xml_http = new ActiveXObject("Microsoft.XMLHTTP");
    if (xml_http != null) {
        if (str == 0) {
            document.getElementById("table_data").innerHTML = "";
            $(".hide").hide();
            return;
        }
        xml_http.onreadystatechange = GetJson(str);
        xml_http.open("GET", str, true);
        xml_http.send(null);
    } else alert("Your browser does not support Ajax!");
}

function GetJson(xml_file) {
    $.get("check_schema.php?id=" + xml_file, function (is_valid) {
        if (is_valid == "invalid") alert("XML is not valid!");

        $.get("get_json.php?id=" + xml_file, function (data) {
            var json = JSON.parse(data);
            // used for search functionality 
            search_value = json;
            SetUpTableNamesDD();
        });
    });
}

function TableDraw(json_data) {
    if (json_data.rows > 0) {
        var table_view = '<table class="table_layout"><thead><tr><th>Row</th>';
        for (var i = 0; i < json_data.columns; i++)
            table_view += "<th>" + json_data.headings[i] + "</th>";
        table_view += "</tr></thead><tbody>";

        for (var row = 0; row < json_data.rows; row++) {
            table_view += "<tr><td>" + (row + 1) + "</td>";
            for (var column = 0; column < json_data.columns; column++)
                table_view += "<td>" + json_data.data[row][column] + "</td>";
            table_view += "</tr>";
        }
        table_view += "</tbody></table>"
        document.getElementById("table_data").innerHTML = table_view;

        $(".hide").show();
    } else $("#table_data").html(JSONstring.make(json_data));
}

function SetUpTableNamesDD() {
    if (search_value.rows > 0) {
        var html = '<select id="row_names">';
        html += '<option value="none">Select a row</option>';
        for (var i = 0; i < search_value.headings.length; i++)
            html += '<option value="' + i + '">' + search_value.headings[i] + '</option>';
        html += "</select>";
        $("#table_row_dd").html(html);
    }
    TableDraw(search_value);
}

function SearchTable(search_item, file) {
    var table_view = '<table class="table_layout"><thead><tr>';
    for (var i = 0; i < search_value.columns; i++)
        table_view += "<th>" + search_value.headings[i] + "</th>";
    table_view += "</tr></thead><tbody>";

    for (var row = 0; row < search_value.rows; row++) {
        table_view += "<tr>";
        for (var column = 0; column < search_value.columns; column++)
            if (search_value.data[row][file] == search_item)
                table_view += "<td>" + search_value.data[row][column] + "</td>";
        table_view += "</tr>";
    }
    table_view += "</tbody></table>"
    document.getElementById("table_data").innerHTML = table_view;
}

function Insert(a, b, c, d, e, f) {
    $.get("insert.php?id=" + file_name + "&a=" + a + "&b=" + b + "&c=" + c + "&d=" + d + "&e=" + e + "&f=" + f,
        function () {});
}

$(document).ready(function () {
    $.get("drop_down.php", function (drop_down) {
        $('#drop').html(drop_down);
    });
});