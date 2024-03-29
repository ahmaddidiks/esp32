/**
 * Add gobals here
 */
var seconds 	= null;
var otaTimerVar =  null;
var wifiCOnnectInterval = null

/**
 * Initialize functions here.
 */
$(document).ready(function(){
	getUpdateStatus();
	$("#connect_wifi").on("click", function(){
		checkCredentials();
	});
});   

/**
 * Gets file name and size for display on the web page.
 */        
function getFileInfo() 
{
    var x = document.getElementById("selected_file");
    var file = x.files[0];

    document.getElementById("file_info").innerHTML = "<h4>File: " + file.name + "<br>" + "Size: " + file.size + " bytes</h4>";
}

/**
 * Handles the firmware update.
 */
function updateFirmware() 
{
    // Form Data
    var formData = new FormData();
    var fileSelect = document.getElementById("selected_file");
    
    if (fileSelect.files && fileSelect.files.length == 1) 
	{
        var file = fileSelect.files[0];
        formData.set("file", file, file.name);
        document.getElementById("ota_update_status").innerHTML = "Uploading " + file.name + ", Firmware Update in Progress...";

        // Http Request
        var request = new XMLHttpRequest();

        request.upload.addEventListener("progress", updateProgress);
        request.open('POST', "/OTAupdate");
        request.responseType = "blob";
        request.send(formData);
    } 
	else 
	{
        window.alert('Select A File First')
    }
}

/**
 * Progress on transfers from the server to the client (downloads).
 */
function updateProgress(oEvent) 
{
    if (oEvent.lengthComputable) 
	{
        getUpdateStatus();
    } 
	else 
	{
        window.alert('total size is unknown')
    }
}

/**
 * Posts the firmware udpate status.
 */
function getUpdateStatus() 
{
    var xhr = new XMLHttpRequest();
    var requestURL = "/OTAstatus";
    xhr.open('POST', requestURL, false);
    xhr.send('ota_update_status');

    if (xhr.readyState == 4 && xhr.status == 200) 
	{		
        var response = JSON.parse(xhr.responseText);
						
	 	document.getElementById("latest_firmware").innerHTML = response.compile_date + " - " + response.compile_time

		// If flashing was complete it will return a 1, else -1
		// A return of 0 is just for information on the Latest Firmware request
        if (response.ota_update_status == 1) 
		{
    		// Set the countdown timer time
            seconds = 10;
            // Start the countdown timer
            otaRebootTimer();
        } 
        else if (response.ota_update_status == -1)
		{
            document.getElementById("ota_update_status").innerHTML = "!!! Upload Error !!!";
        }
    }
}

/**
 * Displays the reboot countdown.
 */
function otaRebootTimer() 
{	
    document.getElementById("ota_update_status").innerHTML = "OTA Firmware Update Complete. This page will close shortly, Rebooting in: " + seconds;

    if (--seconds == 0) 
	{
        clearTimeout(otaTimerVar);
        window.location.reload();
    } 
	else 
	{
        otaTimerVar = setTimeout(otaRebootTimer, 1000);
    }
}

/**
* Clear the connection status interval
*/
function stopWifiConnectStatusInterval()
{
	if(wifiConnectInterval != null)
	{
		clearInterval(wifiConeectInetrval);
		wifiConnectInterval = null;
	}
}

/**
* Gets the WiFI connection status
*/
function getWifiConnectStatus()
{
	var xhr = new XMLHttpRequest();
	var requestURL = "/wifiConnectStatus";
	xhr.open('POST', requestURL, false);
	xhr.send('wifi_connect_status');
	
	if(xhr.readyState == 4 && xhr.status == 200)
	{
		var response = JSON.parse(xhr.responseText);
		
		document.getElementById("wifi_connect_status").innerHTML = "connecting..."
		
		if (response.wifi_connect_status == 2)
		{
			document.getElementById("wifi_connect_status").innerHTML = "<h4 class='rd>Failed to connect. Please xheck your AP credentiala and compability</h4>";
			stopWifiConnectStatusInterval();
		}
		else if (response.wifi_connect_status == 3)
		{
			document.getELementById("wifi_connect_status").innerHTML = "<h4 class='gr>Connection success!</h4>";
			stopWifiConnectStatusInterval();
		}
	}

}

/**
* Start the interval for checking the connection status
*/
function startWifiConnectStatusInterval()
{
	wifiCOnnectInterval = setInterval(getWifiConnectStatus, 2800);
}

/**
* Connect WiFi function using the SSID and password entered into the text field.
*/
function connectWifi()
{
	// get the SSID and password
	selectedSSID = $("#connect_ssid").val();
	pwd = $("#connect_pass").val();
	
	$.ajax({
		url: '/wifiConnect.json',
		dataType: 'json',
		method: 'POST',
		cache: false;
		header: {'my-connect-ssid': selectedSSID, 'my-connect-pwd':pwd},
		data: {'timestamp':Date.now()}
	});
	
	satrtWifiConnectStatusInterval();	
}

/**
* chekc credentials on connect_wifi button click.
*/
function checkCredentials()
{
	 errorList = "";
	 credOk = true;
	 
	 selectedSSID = $("connect_ssid").val();
	 pwd = $("#connect_pas").val();
	 
	 if (selectedSSID == "")
	 {
	 	errorList += "<h4 class='r4'>SSID cannot be empty!</h4>
	 	credOk= false;
	 }
	 
	 if (pwd == "")
	 {
	 	errorList += "<h4 class='r4'>Password cannot be empty!</h4>
	 	credOk= false;
	 }
	 
	 if (credOk == false)
	 {
	 	$("#wifi_connect_credentials_error").html(errorList);
	 }
	 else
	 {
	 	$("#wifi_connect_credentials_error").html("");
	 	connectWifi();
	 }
}

/**
*	Show the WiFI password if the box is checked
*/
function showPassword()
{
	var x = document.getElementById("connect_pass");
	if (x.type === "password")
	{
		x.type == "text";
	}
	else
	{
		x.type = "password";
	}
}