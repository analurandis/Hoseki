
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener("deviceready", onDeviceReady, false);

    },


    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        console.log(device.cordova);
        document.addEventListener("backbutton", onBackKeyDown, false);
       // document.getElementById('fecharApp').addEventListener('click', function () {
         //   navigator.app.exitApp();
        //});

        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
       
       

        console.log('Received Event: ' + id);
    }
};

app.initialize();