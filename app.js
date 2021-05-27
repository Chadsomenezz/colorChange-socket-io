const config = require("./config/config");

class Main extends config{
    constructor() {
        super()
        this.set_config();
        this.views();
        this.socket();
        this.currentColor = 'blue';

    }
    set_config(){
        this.app.set("views",this.path.join(__dirname,"views"))
        this.app.set("view engine","ejs");
        this.app.use(this.express.urlencoded({extended:true}));
        this.app.use(this.express.static(this.path.join(__dirname,"public")))
    }
    views(){
        this.app.get("/",(req,res)=>{
            res.render('index');
        })
    }
    socket(){
        this.io.on("connection",(socket)=>{
            socket.emit('currentColor',{color:this.currentColor});

            socket.on("colorChange",(data)=>{
                this.currentColor = data.color;
                this.io.emit("returnColor",{color:this.currentColor})
            })
        })
    }


}

new Main();