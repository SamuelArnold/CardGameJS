//const http = require('http');
//const url = '127.0.0.1';
//var port = 8080;
// Load requirements
var users        = [];
var connections =[];
var history     = [];
var historyImg  = [];
var uberHistory = [];
var http = require('http'),
    io = require('socket.io');

// Create server & socket
var server = http.createServer(function (req, res) {

    // Send HTML headers and message
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Aw, snap! 404</h1>');
});
server.listen(8080);
io = io.listen(server);

/*
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
*/
io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('connected %s sockets connected', connections.length);

    // # Online User
    io.sockets.emit('numOnline', {
        msg: connections.length
    });

    for (var i = 0; i < uberHistory.length; i++) {

        //check data type
        if (uberHistory[i].substring(0, 2) == "aa") {
            socket.emit('new message', {
                msg: uberHistory[i].substring(2)
            });
            console.log("history: " + i);
        };

        if (uberHistory[i].substring(0, 2) == "bb") {
            socket.emit("img", uberHistory[i].substring(2));
            //socket.emit("img",  uberHistory[i].substring(2));
            console.log("history: " + i);
            sleep(1 * 1000);

        };
    }

    socket.emit('new message', {
        msg: 'Admin: Everyone Please Welcome the New User to My Christian Chat Server!'
    });

    // disconnect
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Disconnected: %s sockets', connections.length);
        io.sockets.emit('new message', {
            msg: 'Admin: Good Bye my friend!'
        });
        io.sockets.emit('numOnline', {
            msg: connections.length
        });
    });

    socket.on('createGame', function (data) {
        console.log("New Game Created");
        console.log(data);
     });

    
    // Send Message
    socket.on('send message', function (data) {
        console.log(data);
        //history.push(data);
        uberHistory.push("aa" + data);
        io.sockets.emit('new message', {
            msg: data
        });
        var date = new Date();
        var current_hour = date.getUTCSeconds();
        var sql = "INSERT INTO Chat (name, chatMess, chatDate) VALUES ?";
        var values = [
            ['user', data, "2018-07-07"]
        ];
      /*  con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });*/
    });

    // function to encode file data to base64 encoded string
    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(file);
        // convert binary data to base64 encoded string
        return new Buffer(bitmap).toString('base64');
    }

    // function to create file from base64 encoded string
    function base64_decode(base64str, file) {
        // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
        var bitmap = new Buffer(base64str, 'base64');
        // write buffer to file
        fs.writeFileSync(file, bitmap);
        console.log('******** File created from base64 encoded string ********');
    }

    ////////////////////////
    // Image
    ///////////////////////
    // Make an instance of SocketIOFileUpload and listen on this socket:
    /*
    var uploader = new SocketIOFileUpload();
    uploader.dir = "/srv/uploads";
    uploader.listen(socket);
    // Do something when a file is saved:
    uploader.on("saved", function (event) {
        console.log(event.file);
        if (path.extname(event.file.pathName) == ".jpg" || path.extname(event.file.pathName) == ".jpeg" || path.extname(event.file.pathName) == ".gif" || path.extname(event.file.pathName) == ".png") {
            fs.readFile(event.file.pathName, "base64", function (err, data) {
                if (err) {
                    return console.log(err);
                };
                //historyImg.push(data);
                uberHistory.push("bb" + data);
                io.sockets.emit('img', data);
            });
            //socket.emit('img', base64_encode(event.file,path));
            //io.sockets.emit('new message', {msg:'Admin: File uploaded'} );
            console.log('Event file sent');
        };
    });
  
    // Error handler:
    uploader.on("error", function (event) {
        console.log("Error from uploader", event);
    });   */
});
function CreateNewGame(player1, player2){

}

class myPlayer {
    constructor(name)
    {
        this.name = name;
        this.health = 30;
        this.hand = new Array();
        this.drewcard = false;
        this.attacked = false;
     
    }
}