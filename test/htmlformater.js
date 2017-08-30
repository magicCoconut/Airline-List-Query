function viewXML(what) {
    var URL = what.URL.value;

    function loadXML(url) {
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        xmlDoc = xmlhttp.responseXML;
        return xmlDoc;
    }
    xmlDoc = loadXML(URL);
    if (window.ActiveXObject) //if IE, simply execute script (due to async prop).
    {
        if (xmlDoc.parseError.errorCode != 0) {
            var myErr = xmlDoc.parseError;
            generateError(xmlDoc);
            hWin = window.open("", "Error", "height=300,width=340");
            hWin.document.write(html_text);
        } else {
            generateHTML(xmlDoc);
            hWin = window.open("", "Assignment4", "height=800,width=600");
            hWin.document.write(html_text);
        }
    } else //else if FF, execute script once XML object has loaded
    {
        xmlDoc.onload = generateHTML(xmlDoc);
        hWin = window.open("", "Assignment4", "height=800,width=600");
        hWin.document.write(html_text);
    }
    hWin.document.close();
}

function generateHTML(xmlDoc) {
    ELEMENT_NODE = 1; // MS parser doesn't define Node.ELEMENT_NODE
    root = xmlDoc.DocumentElement;
    html_text = "<html><head><title>XML Parse Result</title></head><body>";
    html_text += "<table border='2'>";
    caption = xmlDoc.getElementsByTagName("title").item(0).firstChild.nodeValue;
    html_text += "<caption align='left'><h1>" + caption + "</h1></caption>";
    planes = xmlDoc.getElementsByTagName("aircraft");
    planeNodeList = planes.item(0).childNodes;
    html_text += "<tbody>";
    html_text += "<tr>";
    x = 0;
    y = 0;
    // output the headers
    for (i = 0; i < planeNodeList.length; i++) {
        if (planeNodeList.item(i).nodeType == ELEMENT_NODE) {
            header = planeNodeList.item(i).nodeName;
            if (header == "Airbus") {
                header = "Family";
                x = 120;
                y = 55;
            }
            if (header == "Boeing") {
                header = "Family";
                x = 100;
                y = 67;
            }
            if (header == "seats")
                header = "Seats";
            if (header == "Wingspan") header = "Wing Span";
            if (header == "height") header = "Height";
            html_text += "<th>" + header + "</th>";
        }
    }
    html_text += "</tr>";
    // output out the values
    for (i = 0; i < planes.length; i++) //do for all planes
    {
        planeNodeList = planes.item(i).childNodes; //get properties of a plane
        html_text += "<tr>"; //start a new row of the output table
        for (j = 0; j < planeNodeList.length; j++) {
            if (planeNodeList.item(j).nodeType == ELEMENT_NODE) {
                if (planeNodeList.item(j).nodeName == "Image") { //handle images separately
                    html_text += "<td><img src = '"+planeNodeList.item(j).firstChild.nodeValue+"' width = '"+x+"' height = '"+y+"' > < /td>"; }
                    else {
                        html_text += "<td>" + planeNodeList.item(j).firstChild.nodeValue + "</td>";
                    }
                }
            }
            html_text += "</tr>";
        }
        html_text += "</tbody>";
        html_text += "</table>";
        html_text += "</body></html>";
    }   
}
