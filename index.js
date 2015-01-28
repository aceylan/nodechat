var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){ //istek geldiğinde index.htmlyi açacak. 
  res.sendfile('index.html');
});

io.on('connection', function(socket){ //tüm socket olaylarında çalışır. bir kullanıcının bağlanması, clientten sunucuya istek yollanması gibi. 
  console.log('Kullanıcı bağlandı'); //
  socket.on('disconnect', function(){ //disconnect olayında çalışan fonksiyon
    console.log('kullanıcı ayrıldı');
  });

  socket.on('sohbetmesaj', function(msg){  //index.htmlden soket üzerinden sohbetmesaj olayı geldiğinde çalışacak.  
    console.log('Mesaj: ' + msg); //konsolda mesajı yazdır. 
    io.emit('sohbetmesaj', msg); //sunucudan diğer clientlere sohbetmesaj ve mesajı gönder
  });
});



http.listen(2000, function(){  //2000 portundan http dinleme isteği oluşturuluyor. 
  console.log('2000 portu dinleniyor. ');
});
